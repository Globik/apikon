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
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const bodyParser =require('body-parser');

//var cors = require('cors')


const onLine = new Map();

var {config} = require('dotenv');

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

//app.use(cors());
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

var stun = null;
var testshopid;
var testshopsecret;

async function getstun(){
	let a;
try{
		a = await pool.query('select * from sets');
	//	console.log("stun: ", a[0].stun);
		//console.log('stun2 ', JSON.parse(a[0].stun).stun2);
		//stun = JSON.parse(a[0].stun);
		if(a.length > 0){
			stun = a[0].stun;
			testshopid = a[0].testshopid;
			//testshopid='suka'
			testshopsecret = a[0].testshopsecret;
			//console.log("here ",testshopid, testshopsecret);
		}
	}catch(err){
		console.log(err);
	}
}
getstun();
app.use(passport.initialize());
app.use(passport.session());
app.use(async(req, res, next)=>{
	req.app.locals.user = req.user;
	
	
	req.app.locals.stun = stun;
	req.app.locals.testshopid = testshopid;
	req.app.locals.testshopsecret = testshopsecret;
	//console.log('req.app.locals.stun ', req.app.locals.stun);
	
	console.log("method ", req.method, " path ",  req.path);
	//console.log("HERE 2 ",stun,testshopid,testshopsecret, req.app.locals.testshopid, req.app.locals.testshopsecret);
	//console.log(testshopsecret);
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
			}else if(req.path == "/api/setTestPayment"){
		
				//console.log("here ",req.body);
				if(req.body.testshopid && req.body.testshopsecret){
					testshopid = req.body.testshopid;
					testshopsecret = req.body.testshopsecret;
					req.app.locals.testshopid = testshopid;
					req.app.locals.testshopsecret = testshopsecret;
				}
			}else{}
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
app.post('/api/setDonation', async(req, res)=>{
	console.log("signal: ", req.body);
	oni(req.body.nick, " it looks like gone donation");
	res.json({ message: "ok"});
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
	res.rendel('dashboard', { usercount: (a?a[0]['COUNT(*)'].toString():0) });
})
app.get("/api/getUsers", checkAuth, checkRole(['admin']), async(req, res)=>{
	let db = req.db;
	try{
		//SELECT fields FROM table ORDER BY id DESC LIMIT 1;
		let a = await db.query('select name,brole, createdAt from users order by id desc limit 100');
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


app.get("/api/getSettings", checkAuth, checkRole(['admin']), async(req, res)=>{
		res.json({ content: res.compile('settings', {})});
})

app.post("/api/setTestPayment" , checkAuth, checkRole(['admin']), async(req, res)=>{
	//console.log("req.body: ", req.body);
	let { testshopid, testshopsecret } = req.body;
	
	if(!testshopid || !testshopsecret){
		return res.status(400).send({ message: "No data" });
	}
	let db = req.db;
	try{
let a = await db.query(`update sets set testshopid=(?),testshopsecret=(?)`, [ testshopid, testshopsecret ]);
		console.log('a: ', a);
		res.json({ message: "OK! Saved!" });
	}catch(er){
		console.log("er: ", er);
		res.status(400).send({ message: er.name });
	}
})
app.get('/api/getTest', checkAuth, checkRole(['admin']), async(req, res)=>{
	res.json({ content: res.compile('ytest', {})});
})

const api_url = "https://api.yookassa.ru/v3/payments";
const uu = uuidv4();

app.post('/api/getPayUrl', checkAuth, checkRole(['admin']), async(req, res)=>{
	let { damount, dcount } = req.body;
	if(!damount || !dcount){
		return res.status(400).send({ message: "No data" });
	}

let data = {
		"amount": {
			"value": damount,
			"currency": "RUB"
		}, 
		"confirmation":
		 {
			 "type": "redirect",
			 "return_url":"https://rouletka.ru/dashboard" 
			 },
			"description": "Сердечек покупка в количестве "+dcount+" штук",
			"metadata":{"alikey":"number one"}
		};
//let headers = { "Authorization": "Basic " + onesignal_app_key };
let headers = {'Idempotence-Key': uu };
try{
let r = await axios.post(api_url, data, {auth: {username: testshopid, password: testshopsecret } , headers: headers });
console.log("r: ", r.data);
res.json({ message: r.data });
}catch(e){
console.log("err: ", e.toString());
res.status(400).send({ message: e.toString() });
}	
})
var iii = 0;
const dummy = new Map();
//dummy.set(4,{name:"alik"})

app.post("/cb/testyookassa", async(req, res)=>{
	let a = req.body;
	dummy.set(iii, a);
	console.log('body: ', a);
	iii++;
	res.status(200).send({ message: "OK" });
})
//console.log('dummy: ', dummy)
app.post('/api/takeCb', checkAuth, checkRole(['admin']), async(req, res)=>{
	
	let a = (dummy.size==0?"Nothing": [...dummy]);
	res.json({ message: a });
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

//const idLen = 8
//let connections = []
let waitingQueue = []
let matchedIds = new Map()
var connected = 0;//new Map();
function log (text) {
  const time = new Date()
  console.log('[' + time.toLocaleString() + '] ' + text)
}
/*
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/
function getPeerSocket (peerId) {
  for (let client of wsServer.clients) {
    if (client.id === peerId && client.readyState === WebSocket.OPEN) {
      return client
    }
  }

  return null
}

function isEven(n) {
   return n % 2 == 0;
}
console.log(!isEven(1))
function searchPeer (socket, msg, source) {
		console.log("search peer 1",  waitingQueue.length, waitingQueue);
  while (waitingQueue.length) {
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    if(socket.id == peerId) return;
    let peerSocket = getPeerSocket(peerId)
  console.log("waiting 2", waitingQueue);
    waitingQueue.splice(index, 1)
//console.log("search peer 2")
    if (peerSocket) {
		//console.log("search peer 3")
      matchedIds.set(socket.id, peerId)
      matchedIds.set(peerId, socket.id)
     // console.log("IP: ", socket.vip);
      msg.vip = socket.vip;
      console.log('matchedIds=>', [...matchedIds]);
      socket.send(JSON.stringify(msg))
      console.log(`#${socket.id} matches #${peerId}`)
     if(!onLine.has(socket.id)) {
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'busy' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, nick: socket.nick, status: 'busy', camcount: onLine.size});
	 broadcast_admin({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, src: source.src, nick: socket.nick, status: 'busy', camcount: onLine.size});
	 if(isEven(connected))broadcasti({ type: "connected2", size: connected/2 });
 }
      return;
    }
  }

  waitingQueue.push(socket.id);
  
 if(!onLine.has(socket.id)) {
	 console.log("*** ONLINE *** ", onLine.has(socket.id));
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'free' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, nick: socket.nick, status: 'free', camcount: onLine.size, connects: connected });
	 broadcast_admin({ type: "dynamic", sub: "add", id: socket.id, src: source.src, nick: socket.nick, status: 'free', camcount: onLine.size, connects: connected });
	 if(isEven(connected))broadcasti({ type: "connected2", size: connected/2 });
 }
  console.log(`#${socket.id} ${socket.nick} adds self into waiting queue`)
 console.log("waiting ", waitingQueue);
  oni("Сейчас ", socket.nick + " online: " + wsServer.clients.size);
}
function machConnected(socket){
	if (matchedIds.has(socket.id)) {
   /* let peerId = matchedIds.get(socket.id)
    if(!connected.has(socket.id)){
		connected.set(socket.id, peerId);
		broadcast({ type: "connected2", size: connected.size });
	}
	*/ 
	connected++;
	if(isEven(connected))broadcasti({ type: "connected2", size: connected /2 });
  //  let peerSocket = getPeerSocket(peerId)
}
}

function  machdisconnect(socket){
	console.log('""""" disconnection ****');
	connected--;
	 console.log('isEven(connected) ', connected, isEven(connected));
	if(isEven(connected)) broadcasti({ type: "connected2", size: connected/2 });
	
}

function hangUp (socketId, msg, bool) {
	
	
	
	if(!bool){
	if(onLine.has(socketId)){
		onLine.delete(socketId);
		broadcasti({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
		//broadcast_admin({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
	}
}
  if (matchedIds.has(socketId)) {
    let peerId = matchedIds.get(socketId)
    let peerSocket = getPeerSocket(peerId)
connected--;

    matchedIds.delete(socketId)
    matchedIds.delete(peerId)
    console.log('!isEven(connected) ', connected,!isEven(connected));
   if(!isEven(connected)) broadcasti({ type: "connected2", size: connected });
    
   
    
    
    
  //  broadcast({ type: "dynamic", sub: "connects", connects: matchedIds.size });
    if (peerSocket) {
      peerSocket.send(JSON.stringify(msg))
      console.log(`#${socketId} hangs up #${peerId}`)
    }
  } else {
    let myIndex = waitingQueue.indexOf(socketId)
    if (myIndex !== -1) {
      waitingQueue.splice(myIndex, 1)
      console.log(`#${socketId} removes self from waiting queue`)
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
   // log(`#${socketId} sends ${msg.type} to #${peerId}`)
  }
}

let obid = function () {
  let tst = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    tst +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};


function noop() {}

const interval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 1000*60*15);

function heartbeat() {
  this.isAlive = true;
}

wsServer.on('connection', async function (socket, req) {
	
	socket.burl = req.url;
  const ip = req.socket.remoteAddress;
  setIp(socket, ip);
  socket.id = obid();
 
  
   broadcasti({ type: 'online', online: wsServer.clients.size })
   console.log('isEven(connected) ', connected,isEven(connected));
  if(isEven(connected)) broadcasti({ type: "connected2", size: connected/2 });


  
  if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine], connects: connected });
	socket.isAlive = true;
  socket.on("pong", heartbeat);
  socket.on('message', (message) => {
	  let msg;
	  try{
     msg = JSON.parse(message)
}catch(e){return;}
    switch (msg.type) {
      case 'new-ice-candidate':
      case 'video-offer':
      case 'video-answer':
      case 'message':
      case "write":
      case "unwrite":
      case "retry":
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
        broadcast_admin({ type: "dynamic", sub: "srcdata", src: msg.src, id: socket.id });
        break
      case 'ping':
        socket.send(JSON.stringify({ type: 'pong' }))
        break
        case 'disconnection':
        machdisconnect(socket);
        break
        case 'connected':
        machConnected(socket);
        break
      default:
        break
    }
  })
socket.on('error', function(e){
	//console.log("ERROR ***: ", e);
})
  socket.on('close', (code, reason) => {
    console.log(`#${socket.id} disconnected: [${code}]${reason}`)
    broadcasti({ type: 'online', online: wsServer.clients.size })
    
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
		if(el.burl=="/gesamt")wsend(el, obj);
	}
}
function broadcasti(obj){
	for (let el of wsServer.clients) {
		wsend(el, obj);
	}
}
function broadcast_admin(obj){
	for (let el of wsServer.clients) {
		if(el.burl == "/administrator"){
		wsend(el, obj);
	}
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
