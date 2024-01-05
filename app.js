const https=require( "https");
var fs =require( "fs");
const express = require('express');
//import WebSocket , { WebSocketServer } from 'ws';
var WebSocket=require('ws');
//import Users from './models/Users.js';
//var Users=require("./models/Users.js")
const crypto =require('crypto');
const passport = require("passport");
const session = require('express-session');
const mariadb =require('mariadb');
const  cors =require('cors');
const render=require('./libs/render.js');

const { generate } =require('rand-token');


const bodyParser =require('body-parser');


const bcrypt =require( "bcrypt");
//import cors from 'cors';


var {config} =require('dotenv');

config();


(() => Promise.all([
	//Users.sync({ force: false })
]))();
console.log('user:', process.env.DB_USER); 
const pool = mariadb.createPool({ 
  //  host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 ,
    trace: true,
    database:'roulet'
});
const app = express();
const suka = "./dist";
const suka2 = "./Frontend/dist"
app.use(express.static(suka2));

if(process.env.DEVELOPMENT=='yes')app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(render({root:'views', development: true}));
require('./auth/auth.js')(pool, passport);

app.use(session({
	secret:'blabla',
	resave:false,
	saveUninitialized: true,
	cookie:{
		secure:false
	}
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
	req.app.locals.user = req.user;
	next();
})
app.get("/", async(req, res)=>{
	console.log('render main.js', req.user);
	res.rendel('main', {});
})
app.get("/about", async(req, res)=>{
	res.rendel('about', {});
})
/*
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
*/

app.post('/api/auth',(req, res, next)=>{
	passport.authenticate("local",(err, user, info)=>{
		console.log("err, user, info: ", err, user, info);
		if(err){
			return next(err);
		}
		if(!user){
			res.json(info);
			return;
		}
		req.logIn(user, (err)=>{
			if(err){
				return next(err);
			}
		//	res.redirect("/");
		res.json({ user: user });
		});
	})(req, res, next);
})
app.post('/logout', (req, res)=>{
	req.logOut((err)=>{
		if(err){
			res.json({message:err, status:300});
			return;
		}
	});
	res.json({message: "ok", status:200 });
})
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
app.post('/api/register', (req, res, next)=>{
	passport.authenticate("local-signup",(err, user, info)=>{
		console.log("err, user, info: ", err, user, info);
		if(err){
			return next(err);
		}
		if(!user){
			res.json(info);
			return;
		}
		req.logIn(user, (err)=>{
			if(err){
				return next(err);
			}
		//	res.redirect("/");
		res.json({ user: user });
		});
	})(req, res, next);
})
/*
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
*/

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
const wsServer= new WebSocket.Server({server: servi});
//const wss = new WebSocket.Server({ server: servak })
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
	console.log("search peer 1",  waitingQueue.length, waitingQueue);
  while (waitingQueue.length) {
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    let peerSocket = getPeerSocket(peerId)

    waitingQueue.splice(index, 1)
console.log("search peer 2")
    if (peerSocket) {
		console.log("search peer 3")
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
   // user = await Users.findOne({
    //    where: { token: token }
   // });

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
      case "write":
      case "unwrite":
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
/*
export default {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  }
}
*/
