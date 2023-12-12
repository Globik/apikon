//import translate from '@vitalets/google-translate-api';
import https from "https";
import fs from "fs";
import express from 'express';
import WebSocket , { WebSocketServer } from 'ws';
import Users from './models/Users.js';
import crypto from 'crypto';
import cors from 'cors';

import { generate } from 'rand-token';

//import { createClient } from 'redis';
import bodyParser from 'body-parser';


import bcrypt from "bcrypt";
//import cors from 'cors';


import { config } from 'dotenv';

config();


(() => Promise.all([
	Users.sync({ force: false })
]))();

const app = express();
const suka = "./dist";
const suka2 = "./Frontend/dist"
app.use(express.static(suka2));

if(process.env.DEVELOPMENT=='yes')app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/auth', async(req, res) => {
    const { name, password } =  req.body;
console.log("name, password: ", name, password);
    if (!name || !password) {
        return res.json({ error: true, message: 'Введите имя или пароль!' });
    }

    if (!(name.length >= 2 && password.length >= 6)) {
        return res.json({ error: true, message: 'Пароль должен содержать минимум 6 символов, а Имя минимум 2!' });
    }

    const user = await Users.findOne({
        where: { name: name }
    }).then(async(user) => {
        if (user?.validPassword(password)) {
            return user;
        } else {
            return false;
        }
    });

    if (!user) {
        return res.json({ error: true, message: 'Имя или пароль неверный!' });
    }

    user.password = undefined;

    res.json({ user: user })
});

app.get('/api/user', async(req, res) => {
    const { headers } =  req;
console.log('headers: ', headers)
    if (headers.authorization) {
        const user = await Users.findOne({
            where: { token: req.headers.authorization.replace('Bearer ', '') }
        });
    
        if (!user) {
            return res.json({ error: true, message: 'Ошибка авторизации! Попробуйте зайти по новой.' });
        }
        user.password = undefined;
    
        res.json({ user: user })
    } else {
        return res.json({ error: true, message: 'Ошибка авторизации! Попробуйте зайти по новой.' });
    }
});

app.post('/api/register', async(req, res) => {
    const { name, password } =  req.body;
console.log("name, password: ", name, password);
    if (!name || !password) {
        return res.json({ error: true, message: 'Введите имя или пароль!' });
    }

    if (!(name.length >= 2 && password.length >= 6)) {
        return res.json({ error: true, message: 'Пароль должен содержать минимум 6 символов, а Имя минимум 2!' });
    }

    try {
        const user = await Users.create({
            name: name,
            token: generate(50),
            password: bcrypt.hashSync(password, 10)
        });

        user.password = undefined;

        res.json({ user: user })
    } catch(e) {
        console.log("**here error ***", e.message, e.code);
        
        const { errors } = e;
        const promises = [];

        for(let i in errors) {
            const error = errors[i];
            promises.push(/*translate(*/error.message/*, {to: 'ru'})*/)
        }

        Promise.all(promises).then((values) => {
            res.json({
                error: true,
                message: "Такой ник уже существует!"//values.map((item) => item.text)
            });
        }).catch((error) => {
            res.json({
                error: true,
                message: 'Произошла ошибка сервера, попробуйте чуть позже!'
            });
        });
    }
});


const dkey = "/etc/letsencrypt/live/rouletka.ru/privkey.pem";
const dcert = "/etc/letsencrypt/live/rouletka.ru/fullchain.pem";
const port = process.env.DEVELOPMENT=='yes'?3000:443;
var servi;
if(process.env.DEVELOPMENT == "yes"){
servi=app.listen(port, () => {
 console.log(`Started on localhost:${port}`);
})
}else{
servi = https
  .createServer({
     key: fs.readFileSync(dkey),
     cert: fs.readFileSync(dcert),
    },
    app)
  .listen(port, ()=>{
    console.log('Started on https://rouletka.ru:' + port);
  });
}
const wsServer= new WebSocketServer({server: servi});

const idLen = 8
let connections = []
let waitingQueue = []
let matchedIds = new Map()

function log (text) {
  const time = new Date()
  console.log('[' + time.toLocaleString() + '] ' + text)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPeerSocket (peerId) {
  for (let client of wsServer.clients) {
    if (client.id === peerId && client.readyState === WebSocket.OPEN) {
      return client
    }
  }

  return null
}

function searchPeer (socket, msg) {
  while (waitingQueue.length) {
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    let peerSocket = getPeerSocket(peerId)

    waitingQueue.splice(index, 1)

    if (peerSocket) {
      matchedIds.set(socket.id, peerId)
      matchedIds.set(peerId, socket.id)
      socket.send(JSON.stringify(msg))
      log(`#${socket.id} matches #${peerId}`)
      return
    }
  }

  waitingQueue.push(socket.id)
  log(`#${socket.id} adds self into waiting queue`)
}

function hangUp (socketId, msg) {
  if (matchedIds.has(socketId)) {
    let peerId = matchedIds.get(socketId)
    let peerSocket = getPeerSocket(peerId)

    matchedIds.delete(socketId)
    matchedIds.delete(peerId)

    if (peerSocket) {
      peerSocket.send(JSON.stringify(msg))
      log(`#${socketId} hangs up #${peerId}`)
    }
  } else {
    let myIndex = waitingQueue.indexOf(socketId)
    if (myIndex !== -1) {
      waitingQueue.splice(myIndex, 1)
      log(`#${socketId} removes self from waiting queue`)
    }
  }
}

function sendToPeer (socketId, msg) {
  if (!matchedIds.has(socketId)) {
    return
  }

  let peerId = matchedIds.get(socketId)
  let peerSocket = getPeerSocket(peerId)

  if (peerSocket) {
    peerSocket.send(JSON.stringify({ type: msg.type, data: msg.data }))
    log(`#${socketId} sends ${msg.type} to #${peerId}`)
  }
}

wsServer.on('connection', async function (socket, req) {
  let user;
  const token = req.url.replace(/\/websocket\/(\?token\=|)/i, '');
console.log('token: ', token);
  if (token.length == 0) {
  //  return socket.close();
  } else {
    user = await Users.findOne({
        where: { token: token }
    });

    if (user == null) {
    //  return socket.close();
    }
  }

  socket.id = crypto.randomBytes(idLen / 2).toString('hex').slice(0, idLen)
  connections.push(socket)
  for (let connection of connections) {
    // connection.send(JSON.stringify({ type: 'online', online: (connections.length + getRandomInt(450, 480)) }))
	connection.send(JSON.stringify({ type: 'online', online: (connections.length) }))
  }

  console.log(`#${socket.id} [${user}] connected`)

  socket.on('message', (message) => {
    let msg = JSON.parse(message)

    switch (msg.type) {
      case 'new-ice-candidate':
      case 'video-offer':
      case 'video-answer':
      case 'message':
        sendToPeer(socket.id, msg)
        break
      case 'hang-up':
        hangUp(socket.id, { type: 'hang-up' })
        break
      case 'search-peer':
        searchPeer(socket, { type: 'peer-matched' })
        break
      case 'ping':
        socket.send(JSON.stringify({ type: 'pong' }))
        break
      default:
        break
    }
  })
socket.on('error', function(e){
	console.log("ERROR ***: ", e);
})
  socket.on('close', (code, reason) => {
    console.log(`#${socket.id} [${user}] disconnected: [${code}]${reason}`)
    connections.splice(connections.indexOf(socket), 1)
    for (let connection of connections) {
      // connection.send(JSON.stringify({ type: 'online', online: (connections.length + getRandomInt(450, 480)) }))
	  connection.send(JSON.stringify({ type: 'online', online: (connections.length) }))
    }
    hangUp(socket.id, { type: 'hang-up' })
  })
})

export default {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  }
}
