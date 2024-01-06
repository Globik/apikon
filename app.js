const https=require( "https");
var fs =require( "fs");
const express = require('express');

var WebSocket=require('ws');

const crypto =require('crypto');
const passport = require("passport");
const session = require('express-session');
const mariadb =require('mariadb');

const render=require('./libs/render.js');



const bodyParser =require('body-parser');






var {config} =require('dotenv');

config();

const pool = mariadb.createPool({ 
  //  host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    connectionLimit: 5 ,
   // trace: true,
    database:'roulet'
});
const app = express();
const suka = "./public";

app.use(express.static(suka));


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
		secure:false,
		maxAge: 24 * 60 * 60 * 1000
	},
	maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
	req.app.locals.user = req.user;
	next();
})

app.use((req, res, next)=>{
	req.db = pool;
	next();
})

app.get("/", async(req, res)=>{
	res.rendel('main', {});
})
app.get("/about", async(req, res)=>{
	res.rendel('about', {});
})

app.post('/api/auth',(req, res, next)=>{
	passport.authenticate("local",(err, user, info)=>{
		//console.log("err, user, info: ", err, user, info);
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

app.post('/api/register', (req, res, next)=>{
	passport.authenticate("local-signup", (err, user, info)=>{
	//	console.log("err, user, info: ", err, user, info);
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
		
		res.json({ user: user });
		});
	})(req, res, next);
})
app.get("/dashboard", secured, isAdmin(['admin']), async(req, res)=>{
	res.rendel('dashboard', {});
})
app.get("/api/getUsers", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		let a = await db.query('select name,brole, createdAt from users');
		res.json({ content: res.compile('vUsers', { users: a })});
	}catch(err){
		res.status(400).send({ message: err.name });
	}
})
function checkAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.status(401).send({ message: 'Залогиньтесь.'});
}
function secured(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}
function checkRole(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.status(401).send({ message: 'Недостаточно прав!' });
	}
}
function isAdmin(roles){
	return function(req, res, next){
		if(roles.includes(req.user.brole)){
			return next();
		}
		return res.redirect('/');
	}
}

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
  
  socket.id = crypto.randomBytes(idLen / 2).toString('hex').slice(0, idLen)
  connections.push(socket)
  for (let connection of connections) {
   
	connection.send(JSON.stringify({ type: 'online', online: (connections.length) }))
  }

  console.log(`#${socket.id}  connected`)

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
    console.log(`#${socket.id} disconnected: [${code}]${reason}`)
    connections.splice(connections.indexOf(socket), 1)
    for (let connection of connections) {
      
	  connection.send(JSON.stringify({ type: 'online', online: (connections.length) }))
    }
    hangUp(socket.id, { type: 'hang-up' })
  })
})
