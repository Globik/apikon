const https=require( "https");
var fs =require( "fs");
const express = require('express');
const { oni, oni1 } = require('./libs/web_push.js');
var WebSocket=require('ws');

const crypto =require('crypto');
const passport = require("passport");
const session = require('express-session');
const mariadb =require('mariadb');

const render=require('./libs/render.js');



const bodyParser =require('body-parser');




const onLine = new Map();

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

let stun = null;
async function getstun(){
	let a;
try{
		a = await pool.query('select stun from sets');
	//	console.log("stun: ", a[0].stun);
		//console.log('stun2 ', JSON.parse(a[0].stun).stun2);
		//stun = JSON.parse(a[0].stun);
		if(a.length > 0)stun = a[0].stun;
	}catch(err){
		console.log(err);
	}
}
getstun();
app.use(passport.initialize());
app.use(passport.session());
app.use(async(req, res, next)=>{
	req.app.locals.user = req.user;
	let s;
	
	req.app.locals.stun = stun;
	//console.log('req.app.locals.stun ', req.app.locals.stun);
	
	console.log("method ", req.method, " path ",  req.path);
	
	if(req.method == "POST"){
		if(req.isAuthenticated()){
			if(req.path == "/api/setstun"){
				try{
				stun = JSON.stringify(req.body, null, 2);
				req.app.locals.stun = stun;
			}catch(err){
				console.log(err);
				stun = null;
			}
			}
		}
	}
	
	next();
})

app.use((req, res, next)=>{
	req.db = pool;
	next();
})

app.get("/", async(req, res)=>{
	//console.log("*** USER *** ", req.user);
	res.rendel('main', {});
})
app.get("/about", async(req, res)=>{
	oni((req.user?req.user.name:'anonym'), " on about");
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
			//console.log("USERNAME: ", info.username);
		oni(info.username, " registered");
		res.json({ user: user });
		});
	})(req, res, next);
})
app.get("/dashboard", secured, isAdmin(['admin']), async(req, res)=>{
	let db = req.db;
	let a;
	try{
		a = await db.query('select COUNT(*) from users');
	console.log("a: ", a[0]['COUNT(*)'].toString());
	}catch(err){
		console.log(err);
	}
	res.rendel('dashboard', {usercount: (a?a[0]['COUNT(*)'].toString():0) });
})
app.get("/api/getUsers", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		//SELECT fields FROM table ORDER BY id DESC LIMIT 1;
		let a = await db.query('select name,brole, createdAt from users order by id desc limit 1000');
		res.json({ content: res.compile('vUsers', { users: a })});
	}catch(err){
		res.status(400).send({ message: err.name });
	}
})

app.get("/api/stun", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		//SELECT fields FROM table ORDER BY id DESC LIMIT 1;
		let a = null;
		//let a = await db.query('select name,brole, createdAt from users order by id desc limit 1000');
		res.json({ content: res.compile('stun', {})});
	}catch(err){
		res.status(400).send({ message: err.name });
	}
})
app.post('/api/setstun', checkAuth, checkRole(['admin']), async(req, res)=>{
	//console.log("req.body: ", req.body);
	
	let db = req.db;
	try{
		let a = JSON.stringify(req.body, null, 2);
		let b = await pool.query('select stun from sets');
		if(b.length > 0){
		await db.query('update sets set stun=(?)', [ a ]);
	}else{
		await db.query('insert into sets(stun) values(?)', [ a ]);
	}
		res.json({ message: "OK, saved!" });
	}catch(err){
		console.log("Error ", err);
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

function searchPeer (socket, msg, source) {
	console.log("search peer 1",  waitingQueue.length, waitingQueue);
  while (waitingQueue.length) {
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    let peerSocket = getPeerSocket(peerId)
 if(socket.id == peerId) return;
    waitingQueue.splice(index, 1)
console.log("search peer 2")
    if (peerSocket) {
		console.log("search peer 3")
      matchedIds.set(socket.id, peerId)
      matchedIds.set(peerId, socket.id)
      console.log("IP: ", socket.vip);
      msg.vip = socket.vip;
      socket.send(JSON.stringify(msg))
      log(`#${socket.id} matches #${peerId}`)
     if(!onLine.has(socket.id)) {
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'busy' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, src: source.src, nick: socket.nick, status: 'busy', camcount: onLine.size, connects: matchedIds.size });
 }
      return;
    }
  }

  waitingQueue.push(socket.id);
  
 if(!onLine.has(socket.id)) {
	 console.log("*** ONLINE *** ", onLine.has(socket.id));
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'free' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, src: source.src, nick: socket.nick, status: 'free', camcount: onLine.size, connects: matchedIds.size });
 }
  log(`#${socket.id} ${socket.nick} adds self into waiting queue`)
 // oni("Сейчас ", socket.nick + " online: " + connections.length);
  oni1("Сейчас ", socket.nick + " online: " + connections.length);
}

function hangUp (socketId, msg, bool) {
	if(!bool){
	if(onLine.has(socketId)){
		onLine.delete(socketId);
		broadcast({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
	}
}
  if (matchedIds.has(socketId)) {
    let peerId = matchedIds.get(socketId)
    let peerSocket = getPeerSocket(peerId)

    matchedIds.delete(socketId)
    matchedIds.delete(peerId)
    /*
    if(onLine.has(socketId)){
		onLine.delete(socketId);
		broadcast({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
	}
    
    */
    
    broadcast({ type: "dynamic", sub: "connects", connects: matchedIds.size });
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
    peerSocket.send(JSON.stringify({ type: msg.type, vip: msg.vip, data: msg.data }))
    log(`#${socketId} sends ${msg.type} to #${peerId}`)
  }
}

wsServer.on('connection', async function (socket, req) {
  const ip = req.socket.remoteAddress;
  setIp(socket, ip);
  socket.id = crypto.randomBytes(idLen / 2).toString('hex').slice(0, idLen)
  connections.push(socket)
  for (let connection of connections) {
   
	connection.send(JSON.stringify({ type: 'online', online: (connections.length) }))
  }

  console.log(`#${socket.id}  connected`)
  
  if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine], connects: matchedIds.size });

  socket.on('message', (message) => {
    let msg = JSON.parse(message)

    switch (msg.type) {
      case 'new-ice-candidate':
      case 'video-offer':
      case 'video-answer':
      case 'message':
      case "write":
      case "unwrite":
     // msg.vip = socket.vip
        sendToPeer(socket.id, msg)
        break
      case 'hang-up':
        hangUp(socket.id, { type: 'hang-up' },(msg.sub&&msg.sub=="here"?true:false))
        break
      case 'search-peer':
       socket.nick = msg.nick;
        searchPeer(socket, { type: 'peer-matched' }, { src: msg.src })
        break
        case 'srcdata':
        broadcast({ type: "dynamic", sub: "srcdata", src: msg.src, id: socket.id });
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
function wsend(ws, obj) {
  try {
   let a = JSON.stringify(obj);
    if (ws.readyState === WebSocket.OPEN) ws.send(a);
  } catch (e) {}
}
function broadcast(obj){
	for (let el of wsServer.clients) {
		wsend(el, obj);
	}
}

function setIp(ws, ip){
	const re = /([0-9]{1,3}[\.]){3}[0-9]{1,3}/;
	if(process.env.DEVELOPMENT == "yes"){
	let r3 = "78.81.155.17";	
	ws.vip = r3;
	wsend(ws, { type: "vip", vip: ws.vip })
	}else{
let a = ip.match(re);
let r = a[0];
console.log("IP: ", r)
ws.vip = r;
wsend(ws, { type: "vip", vip: ws.vip })
}
}
