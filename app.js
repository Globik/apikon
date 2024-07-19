const https=require( "https");
var fs =require( "fs");
const url = require('url');

const express = require('express');
const { oni, oni1 } = require('./libs/web_push.js');
var WebSocket = require('ws');

const crypto = require('crypto');
const passport = require("passport");
const session = require('express-session');
const mariadb = require('mariadb');

const render = require('./libs/render.js');
const admin = require('./router/admin.js');
const pay = require('./router/pay.js');

const { handleMediasoup, ev } = require("./libs/mediasoup_help.js")

const axios = require('axios').default;

//const TelegramBot = require('node-telegram-bot-api');
const tg_api = '7129138329:AAGl9GvZlsK3RsL9Vb3PQGoXOdeoc97lpJ4';
const grid = '-1002095475544';
//var f = new FormData()
//let sdi = 'data:image/jpeg;base64,/u87uhuggygy';
//console.log('sdi: ', sdi.split(',')[1])
//const grid = 
//const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const bodyParser =require('body-parser');

//var cors = require('cors')


const onLine = new Map();

var {config} = require('dotenv');

config();

//const bot = new TelegramBot(tg_api, {});

async function ibot(){
	try{
		//await bot.sendMessage(gr_id, 'Hello Alik!!!');
		 axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`, {
    chat_id: grid,
    text: 'hello alik',
    parse_mode: 'html',
    disable_notification: true
  });
	}catch(e){
		console.log(e);
		}
}
//ibot();
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
var istestheart;

var yoomoney_client_id;
var yoomoney_secret;
var yoomoney_token;
var y_notif;
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
			istestheart = a[0].istestHeart;
			console.log("istest heart ",  istestheart, (istestheart==1?true:false));
			yoomoney_client_id = a[0].yoomoney_client_id;
			yoomoney_secret = a[0].yoomoney_secret;
			console.log("yoomoney_client_id: ", yoomoney_client_id);
			yoomoney_token = a[0].yoomoney_token;
			console.log('token : ', yoomoney_token);
			y_notif = a[0].y_notif;
			console.log('y_notif', y_notif);
			//var quant_n=5;
			//var userid='5';
			//await pool.query('update users set theart=theart+(?),heart=1 where id=(?)', [ quant_n, userid ]);
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
	req.app.locals.istestheart = istestheart;
	
	req.yoomoney_client_id = yoomoney_client_id;
	req.yoomoney_secret = yoomoney_secret;
	req.yoomoney_token = yoomoney_token;
	
	req.y_notif = y_notif;
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
			}else if(req.path == "/admin/saveYoomoney"){
				if(req.body.client_id && req.body.client_secret){
					yoomoney_client_id = req.body.client_id;
					yoomoney_secret = req.body.client_secret;
					req.yoomoney_client_id = yoomoney_client_id;
					req.yoomoney_secret = yoomoney_secret;
				}}else if(req.path == "/admin/saveNotif"){
					console.log("*** REALLY",req.body.y_notif );
				y_notif = req.body.y_notif;
					req.y_notif = y_notif;
				}else{}
				
			}else{}
		}
		next();
	})

app.use((req, res, next)=>{
	req.db = pool;
	next();
})
app.use('/admin', admin);
app.use('/pay', pay);
var imgData = {};
app.get("/about", async(req, res)=>{
	console.log("*** USER *** ", req.user);
	console.log('req.app.locals ', req.app.locals.testshopid, ' ', req.app.locals.testshopsecret);
	res.rendel('main', { imgData: imgData });
})
app.get("/", async(req, res)=>{
	oni((req.user?req.user.name:'anonym'), " on about");
	res.rendel('about', {});
})

app.post('/api/auth', (req, res, next)=>{
	passport.authenticate("local", (err, user, info)=>{
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
app.get('/cb1', async(req, res)=>{
	let db = req.db;
	if(req.query&&req.query.code){
		try{
			let d = {
				code: req.query.code,
				client_id: req.yoomoney_client_id,
				grant_type: 'authorization_code',
				redirect_uri:'https://rouletka.ru/cb1',
				client_secret: req.yoomoney_secret
			}
			let r = await axios.post('https://yoomoney.ru/oauth/token', d,{headers: {
    'content-type': 'application/x-www-form-urlencoded' 
    }
    });
    console.log("data : ", r.data);
    if(r.data.access_token){
		let a = r.data.access_token;
		console.log("YES access_token: ", a);
		yoomoney_token = a;
		req.yoomoney_token = a;
		await db.query('update sets set yoomoney_token=(?)', [ a ] );
		res.rendel('atoken', { message: "Получили токен " + a });
	}else{
		console.log("no access_token");
		res.rendel('atoken', { message: "Неудача:  " + r.data.error  });
	}
		}catch(err){
			console.log(err);
			res.rendel('atoken', { message: err });
		}
		
	}else{
	res.rendel('atoken', { message: req.query.error});
}
})
/*
notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '174.23',
  datetime: '2024-05-17T10:36:10Z',
  codepro: 'false',
  sender: '41001000040',
  sha1_hash: '03cfe527cab959f587a77085a851c3ac8b11dd19',
  test_notification: 'true',
  operation_label: '',
  operation_id: 'test-notification',
  currency: '643',
  label: ''
  * 
  * 
  * 
  * 
  * ============\
  *  notification_type: 'card-incoming',
  zip: '',
  bill_id: '',
  amount: '1.94',
  firstname: '',
  codepro: 'false',
  withdraw_amount: '2.00',
  city: '',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  building: '',
  lastname: '',
  datetime: '2024-05-17T11:42:54Z',
  suite: '',
  sender: '',
  phone: '',
  sha1_hash: '26a45637e6dc053291d20744be20a56922999972',
  street: '',
  flat: '',
  fathersname: '',
  operation_label: '2dd95647-0011-5000-9000-1ce77551b7bd',
  operation_id: '769261374481140080',
  currency: '643',
  email: ''
}
li:  26a45637e6dc053291d20744be20a56922999972
sha: 26a45637e6dc053291d20744be20a56922999972
HASH IS GUET
SqlError: (conn=301, no: 1064, SQLState: 42000) You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '`' at line 1
sql: update users set theart=theart+(?),heart=1 where id=(?)` - parameters:[5,'3076']
    at module.exports.createError (/root/apikon/node_modules/mariadb/lib/misc/errors.js:64:10)
 notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T10:23:03Z',
  sender: '4100118676103827',
  sha1_hash: '72d6ef5bbbdb1368abd1fdc2cf1ca91cd0980696',
  operation_label: '2dea6740-0011-5000-a000-140dd82f7fa7',
  operation_id: '770379783211600084',
  currency: '643'
====
*  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T10:52:55Z',
  sender: '4100118676103827',
  sha1_hash: '1a0dde6e99b17fa7ff8e6e5c41880483109a9e6a',
  operation_label: '2dea6e3f-0011-5000-8000-1ef098a52e08',
  operation_id: '770381575877630108',
  currency: '643'

*/

var wi1 = {
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  datetime: '2024-05-30T11:17:51Z',
  sender: '4100118676103827',
  sha1_hash: 'aef11d6c5e21ea96974d5138c4a9465740f0dfb7',
  operation_label: '2dea741b-0011-5000-a000-1cffa12cd341',
  operation_id: '770383071555008108',
  currency: '643'
}
var wi2={
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076\&c=5',
  datetime: '2024-05-30T11:33:29Z',
  sender: '4100118676103827',
  sha1_hash: '4b6a3a017adf45f5fa6834d653c2e2efc8832606',
  operation_label: '2dea77c5-0011-5000-a000-125001ba8330',
  operation_id: '770384009832968088',
  currency: '643'
}
var wi3={
  notification_type: 'p2p-incoming',
  bill_id: '',
  amount: '1.98',
  codepro: 'false',
  withdraw_amount: '2.00',
  unaccepted: 'false',
  label: 'id=3076*c=5',
  datetime: '2024-05-30T12:06:15Z',
  sender: '4100118676103827',
  sha1_hash: '7c38f10c3bad1667bb5c68a5b7074a1b37394c31',
  operation_label: '2dea7f73-0011-5000-a000-1e665691c32e',
  operation_id: '770385975307952108',
  currency: '643'
}
var wi={
	 
  notification_type: 'card-incoming',
  zip: '',
  bill_id: '',
  amount: '1.94',
  firstname: '',
  codepro: 'false',
  withdraw_amount: '2.00',
  city: '',
  unaccepted: 'false',
  label: 'id=3076&c=5',
  building: '',
  lastname: '',
  datetime: '2024-06-09T04:55:20Z',
  suite: '',
  sender: '',
  phone: '',
  sha1_hash: 'f160116ba94bdbf1be1f52627d337643e98d289e',
  street: '',
  flat: '',
  fathersname: '',
  operation_label: '2df74931-0011-5000-9000-1c62a771e8ea',
  operation_id: '771224120343575116',
  currency: '643',
  email: ''

}

//${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&${notification_secret}&${label}`
//const s2='card-incoming&769261374481140080&1.94&643&2024-05-17T11:42:54Z&&false&xY6P7xpSQbKBYFT0jmXtym+t&id=3076&c=5'
//const fucker = 'ZmV0Y7SBS8z1b0CIEWhKb9Qk';//ZmV0Y7SBS8z1b0CIEWhKb9Qk
const fucker = 'ZmV0Y7SBz1b0CIEWhKb9Qk';//LXLMTe9hgGIJcBTFfClIEMR4'
const s2 = `${wi.notification_type}&${wi.operation_id}&${wi.amount}&${wi.currency}&${wi.datetime}&${wi.sender}&${wi.codepro}&${fucker}&${wi.label}`;
console.log('si2 ', s2)
let sha1_ha = wi.sha1_hash;
let sh = crypto.createHash('sha1')
let li = sh.update(s2).digest('hex')
console.log('li: ',li)
console.log('sha:', sha1_ha)
if(li==sha1_ha){
	console.log("OK");
}else{
	console.log('not ok');
}
var iii2 = 0;
const dummy2 = new Map();

app.post('/testyoomoney1', async(req, res)=>{
	console.log("*** CALLBACK! *** ", req.body);
let { notification_type,
		operation_id,
		amount,
		currency,
		datetime,
		sender,
		codepro,
		sha1_hash, label,
		widthdraw_amount,
		unaccepted
		 } = req.body;
		 const buka1 = 1;
	//	const notification_secret = 'LXLMTe9hgGIJcBTFfClIEMR4';
		const notification_secret = req.y_notif;//xY6P7xpSQbKBYFT0jmXtym+t  xY6P7xpSQbKBYFT0jmXtym+t
		console.log('notofication secret', notification_secret);
let str = `${notification_type}&${operation_id}&${amount}&${currency}&${datetime}&${sender}&${codepro}&${notification_secret}&${label}`
	const paramStr = new URLSearchParams(label);
	
	dummy2.set(iii2, req.body);
	
	iii2++;
	let db = req.db;
let sh = crypto.createHash('sha1')
let li = sh.update(str).digest('hex')
console.log('li: ',li)
console.log('sha:', sha1_hash)
if(li == sha1_hash){
console.log('HASH IS GUET')
let userid = paramStr.get('id');
let quant = paramStr.get('c');
let quant_n = Number(quant);
if(unaccepted == 'false'){
try{
	console.log("updating users in db");
	await db.query('update users set theart=theart+(?),heart=1 where id=(?)', [ quant_n, userid ]);
}catch(err){
	console.log(err);
	return res.status(200).send({ message: "not ok" });
}
}else{
	return res.status(200).send({ message: "not ok" });
}
}else{
	console.log("HASH IS NOT GUET");
	return res.status(200).send({ message: "not ok" });
}
	res.status(200).send({ message: "OK" });
})

app.post('/api/takeCb2', async(req, res)=>{
	let a = (dummy2.size==0?"Nothing": [...dummy2]);
	res.json({ message: a });
})

const dummy3 = new Map();
var iii3 = 0;
app.post('/cb/tgwebhook', async(req, res)=>{
	console.log("*** CALLBACK from TELEGA! *** ", req.body);
	dummy3.set(iii3, req.body);
	iii3++;
	res.status(200).send({ message: "OK" });
	})

app.post('/api/takeCb3', async(req, res)=>{
	let a = (dummy3.size==0?"Nothing": [...dummy3]);
	res.json({ message: a });
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
	let a;let b;
	try{
		a = await db.query('select COUNT(*) from users');
	console.log("a: ", a[0]['COUNT(*)'].toString());
	b = await db.query('select COUNT(*) from processTest');
	}catch(err){
		console.log(err);
	}
	res.rendel('dashboard', { usercount: (a?a[0]['COUNT(*)'].toString():0), giftcount: (b?b[0]['COUNT(*)'].toString():0) });
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
	res.redirect('/about');
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
		return res.redirect('/about');
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
const wsServer = new WebSocket.Server({server: servi});


let waitingQueue = []
let matchedIds = new Map()
var connected = 0;//new Map();
function log (text) {
  const time = new Date()
  console.log('[' + time.toLocaleString() + '] ' + text)
}

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
//console.log(!isEven(1))
var ed=[[0,{}],[1,{}],[2,{}]]
var eda={a:[[0,{}]]};
console.log(JSON.stringify(eda))
var ign=new Map(ed);
var ed2=ign.has(3)
console.log('suka ', ed2, " ", ign.size)
//var bb=[...ign].some((l)=>l==2)
//console.log("bb ", bb)

async function searchPeer (socket, msg, source) {
	

		console.log("search peer 1",  waitingQueue.length, waitingQueue);
		console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
  while (waitingQueue.length) {
	  
    let index = Math.floor(Math.random() * waitingQueue.length)
    let peerId = waitingQueue[index]
    if(socket.id == peerId) return;
    
    // console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
    let amap = new Map(source.ignores);
    
   
    
    
    let peerSocket = getPeerSocket(peerId)
     if(peerSocket){
		 console.log("**** PEER SOCKET ***");
		 
		 if(amap.has(peerSocket.userId)){
			 console.log("*** HAS!!! ***");
			 amap.clear();
			 break;
		 }
	 }
  console.log("waiting 2", waitingQueue);
    waitingQueue.splice(index, 1)
//console.log("search peer 2")
    if (peerSocket) {
		//console.log("search peer 3")
		console.log('matchedIds1=>', [...matchedIds]);
      matchedIds.set(socket.id, peerId)
      matchedIds.set(peerId, socket.id)
     // console.log("IP: ", socket.vip);
      msg.vip = peerSocket.vip;
      console.log('matchedIds2=>', [...matchedIds]);
      	msg.partnerId = peerSocket.userId;
      socket.send(JSON.stringify(msg))
      console.log(`#${socket.id} matches #${peerId}`)
     if(!onLine.has(socket.id)) {
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'busy' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, nick: socket.nick, status: 'busy', camcount: onLine.size});
	 broadcast_admin({ type: "dynamic", sub: "add", id: socket.id, partnerid: peerId, src: source.src, nick: socket.nick, status: 'busy', camcount: onLine.size});
	 if(isEven(matchedIds.size))broadcasti({ type: "connected2", size:matchedIds.size/2 });
	 
	 
	 
	
	 
	 
	 
	 
 }
      return;
    }
  }

  waitingQueue.push(socket.id);
  
 if(!onLine.has(socket.id)) {
	 console.log("*** ONLINE *** ", onLine.has(socket.id));
	 onLine.set(socket.id, { id: socket.id, src: source.src, nick: socket.nick, status: 'free' });
	 broadcast({ type: "dynamic", sub: "add", id: socket.id, nick: socket.nick, status: 'free', camcount: onLine.size });
	 broadcast_admin({ type: "dynamic", sub: "add", id: socket.id, src: source.src, nick: socket.nick, status: 'free', camcount: onLine.size });
	if(isEven(matchedIds.size))broadcasti({ type: "connected2", size: matchedIds.size/2 });
 }
//  console.log(`#${socket.id} ${socket.nick} adds self into waiting queue`)
// console.log("waiting ", waitingQueue);
 //console.log("*** MSG>IGNORES ***",  msg, " ", source.ignores);
     let b11 = source.src.split(',')[1];
    // console.log('b11 ', b11);
		let kk = 0;
		let buf = Buffer.from(b11, "base64");
		let grid = '887539364'
		try{
			
	var f = new FormData();
	f.append('chat_id', grid);
	f.append('parse_mode', 'html');
	f.append('caption', '<b>'+socket.nick+'</b>'+' запустил трансляцию. \nПосмотреть на <a href="https://rouletka.ru/about">https://rouletka.ru</a>\n\n JOIN THE GROUP <a href="https://t.me/roulette7776">Roulette</a>');
	f.append('disable_notification', false);
	f.append('photo', new Blob([buf]));
	f.append('reply_markup', `{"inline_keyboard":[
	[{"text":"Make it gold","callback_data":"src=base64string&nick=${socket.nick}"}]
	]}`);
	
	

	let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/sendPhoto`, f); 
	//console.log('rr data ', rr.data);
	//console.log('photo ', JSON.stringify(rr.data.result.photo));
	//photo  [{"file_id":"AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADcwADNQQ","file_unique_id":"AQADm-QxGz-y0Eh4","file_size":554,"width":90,"height":67},
	//{"file_id":"AgACAgIAAxkDAAIDxGaZaPP98n4DhSIdhxsY8vnJkFlaAAKb5DEbP7LQSHWCfC1l2CawAQADAgADbQADNQQ","file_unique_id":"AQADm-QxGz-y0Ehy","file_size":6510,"width":320,"height":240}]
var f2 = new FormData();
f2.append('chat_id', grid);
	f2.append('title','Подписка на ' + socket.nick);
	f2.append('description', '<a href="HH.ru">test</a> Подписаться на уведомления о том, когда '+socket.nick+' будет онлайн в чат-рулетке. Уведомление придет к вам в телегу');
	f2.append('payload', 'payload');
	f2.append('currency', 'XTR');
	f2.append('prices', '[{"label":"my product","amount":1}]');
	f2.append('parse_mode', 'html');
	//f2.append('photo_url', "AQADm-QxGz-y0Eh4");
	//await axios.post(`https://api.telegram.org/bot${tg_api}/sendInvoice`, f2); 
	/*
	await axios.post(`https://api.telegram.org/bot${tg_api}/sendMessage`,{
		chat_id: grid,
		text:'Hello, buy me',
		reply_markup:{
			one_time_keyboard:false,
			inline_keyboard:[[{one_time_keyboard:false,text:'loser',callback_data:'sticker'}]]
			}
	});*/
		}catch(e){
			console.log(e);
		}
	 
	 
  oni("Сейчас ", socket.nick + " online: " + wsServer.clients.size);
}


async function setH(){
	try{
	var f = new FormData();
	f.append('url', 'https://rouletka.ru/cb/tgwebhook');
	f.append('secret_token', 'alik');
	f.append('allowed_updates',["callback_query"]);
	
	
//deleteWebhook
	let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/setWebhook`, f); 
	console.log('rr.data: ', rr.data)
}catch(e){console.log(e)}
}
//setH()
async function hookinfo(){
	try{
		let rr = await axios.post(`https://api.telegram.org/bot${tg_api}/getWebhookInfo`, {}); 
	console.log('rr.data: ', rr.data)
	}catch(e){console.log(e);}
}
//hookinfo();
function machConnected(socket){
	if (matchedIds.has(socket.id)) {
   /* let peerId = matchedIds.get(socket.id)
    if(!connected.has(socket.id)){
		connected.set(socket.id, peerId);
		broadcast({ type: "connected2", size: connected.size });
	}
	*/ 
	//connected++;
	if(isEven(matchedIds.size))broadcasti({ type: "connected2", size: matchedIds.size/2 });
  //  let peerSocket = getPeerSocket(peerId)
}
}

function  machdisconnect(socket){
	console.log('""""" disconnection ****');
	connected--;
	 console.log('isEven(connected) ', connected, isEven(connected));
	if(isEven(matchedIds.size/*connected*/)) broadcasti({ type: "connected2", size: matchedIds.size/2/*connected/2 */});
	
}

function hangUp (socketId, msg, bool, abrupt) {
	
	
	
	if(bool){
	if(onLine.has(socketId)){
		onLine.delete(socketId);
		broadcasti({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
		//broadcast_admin({ type: "dynamic", sub: "remove", id: socketId, camcount: onLine.size });
		 if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size/2 });
	}
}
  if (matchedIds.has(socketId)) {
    let peerId = matchedIds.get(socketId)
    let peerSocket = getPeerSocket(peerId)
//connected--;

    matchedIds.delete(socketId)
    matchedIds.delete(peerId)
    console.log('isEven(connected) ',isEven(connected));
   if(isEven(matchedIds.size)) broadcasti({ type: "connected2", size: matchedIds.size/2 });
    
   
    
    
    
  //  broadcast({ type: "dynamic", sub: "connects", connects: matchedIds.size });
    if (peerSocket) {
		connected--;
	
      peerSocket.send(JSON.stringify(msg))
      console.log(`#${socketId} hangs up #${peerId}`)
    }
    if(abrupt && abrupt == "abrupt"){
		peerSocket.terminate();
	}
  } else {
    let myIndex = waitingQueue.indexOf(socketId)
    if (myIndex !== -1) {
      waitingQueue.splice(myIndex, 1)
      console.log(`#${socketId} removes self from waiting queue`)
    }
  }
}

var ww='2024-05-10T12:01:28.271Z';
var ee=new Date(ww)
console.log(ee.toDateString())
console.log( new Date().toISOString().split('.')[0]+"Z" );
async function sendToPeer (socket, msg) {
  if (!matchedIds.has(socket.id)) {
    return
  }

  let peerId = matchedIds.get(socket.id)
  let peerSocket = getPeerSocket(peerId)

  if (peerSocket) {
	 if(msg.type=="gift"){
		 console.log('msg*** : ', msg);
		 console.log("userId, nick, userId , nick ", socket.userId, ' ', socket.nick, ' ', peerSocket.userId, ' ', peerSocket.nick);
		 if(peerSocket.isLogged == "no"){
			 wsend(socket, { type: "error", err: "Собеседник не залогинен!"});
			 return;
		 }
		 peerSocket.send(JSON.stringify(msg))
		 try{
			 let a = (msg.istestheart?'theart':'heart');
			 await pool.query(`update users set ${a}=${a}-(?) where id=(?)`, [ msg.quant, msg.from_id ]);
			 await pool.query(`update users set ${a}=${a}+(?) where id=(?)`, [ msg.quant,/* msg.to_id */ peerSocket.userId ] );
// rId, nick, userId , nick  3076   suka1   2276   alik8

await pool.query(`insert into processTest(from_id,from_nick,wieviel) values((?),(?),(?)) ON DUPLICATE KEY UPDATE wieviel=wieviel+(?)`, [ msg.from_id, msg.from_name, msg.quant, msg.quant ]);
			// peerSocket.send(JSON.stringify(msg))
		 }catch(err){
			 console.log("SEND HEARTS ERROR ", err);
			 wsend(socket, { type: " error", err: err });
		 }
		 
	 }else{
    peerSocket.send(JSON.stringify({ type: msg.type, vip: msg.vip, partnerId: socket.userId, data: msg.data }))
   }
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
	//  console.log("ws.isAlive", ws.isAlive);
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
   // console.log("ping");
    ws.ping(noop);
  });
},
 //1000 * 600
 1000 * 60
 //10
 );

function heartbeat() {
	//console.log("pong here", this.isAlive);
  this.isAlive = true;
  //this.send(JSON.stringify({type:"pick"}));
}
function doWas(obj){
	console.log(" **** DO WAS!!!! ***");
	// { img_data: data.img_data, userId: ws.userId, nick: ws.nick, value: 0, publishedId: ws.id  }
	imgData.img_data = obj.img_data;
	imgData.userId = obj.userId;
	imgData.nick = obj.nick;
	imgData.value = obj.value;
	imgData.publishedId = obj.publishedId;
}
 ev.on('producer_published', doWas);
 ev.on("producer_unpublished", function doWas2(){
	 console.log("producer unpublished event");
	 clearProducer();
 });
 function clearProducer(){
	 //console.log("*** clear producer ", imgData);
	 delete imgData.img_data;
	 delete imgData.userId;
	 delete imgData.nick;
	 delete imgData.value;
	 delete imgData.publishedId;
	  console.log("*** clear producer ", imgData);
	 imgData = {}
	  console.log("*** clear producer ", imgData);
 }
 ev.on("onconsume", function doWas3(obj){
	 imgData.value = obj.value;
 });
wsServer.on('connection', async function (socket, req) {
socket.isAlive = true;
  socket.on("pong", heartbeat);
	socket.burl = req.url;
	socket.isLogged = "no";
  const ip = req.socket.remoteAddress;
  setIp(socket, ip);
  socket.id = obid();
  
 
  
   broadcasti({ type: 'online', online: wsServer.clients.size })
   console.log('isEven(connected) ', connected,isEven(connected));
  if(isEven(matchedIds.size /*connected)*/)) broadcasti({ type: "connected2", size:matchedIds.size/2/* connected/2 */});


  
  if(onLine.size !=0)wsend(socket, { type: "dynamic", sub: "total", cams: [...onLine] });
  
  
  
 
  
  
  
  
  
  
  
  
  
  let msg;
  socket.on('message', (message) => {
	  //var msg;
	  try{
     msg = JSON.parse(message)
}catch(e){return;}
if(msg.request == "mediasoup"){
	/*handleMediasoup.*/handleMediasoup(socket, msg, WebSocket, wsServer, pool).mediasoup_t();
	return;
}
    switch (msg.type) {
      case 'new-ice-candidate':
      case 'video-offer':
      case 'video-answer':
      case 'message':
      case "write":
      case "unwrite":
      case "gift":
     // msg.vip = socket.vip
        sendToPeer(socket, msg)
        break
      //  case "mediasoup" :
         //       handleMediasoup.handleMediasoup(socket, msg, webSocket, wsServer, pool).mediasoup_t();
     //  break
        case "helloServer":
        socket.userId = msg.userId;
        socket.nick = msg.nick;
        socket.isLogged = msg.logged;
        wsend(socket, { type: "helloServer", socketId: socket.id });
        break
        case "messagepublished":
        console.log('publish ', msg);
        broadcast_publish(socket, msg)
        break
      case 'hang-up':
        hangUp(socket.id, { type: 'hang-up', partnerId: socket.userId, ignore: msg.ignore },(msg.sub&&msg.sub=="here"?true:false), (msg.sub&&msg.sub=="abrupt"?"abrupt":"noabrupt"))
        break
      case 'search-peer':
       socket.nick = msg.nick;
        searchPeer(socket, { type: 'peer-matched' }, { src: msg.src, ignores: msg.ignores })
        break
        case 'srcdata':
        broadcast_admin({ type: "dynamic", sub: "srcdata", src: msg.src, id: socket.id });
        break
      case 'pock':
     // console.log('pock');
    //   clearTimeout(this.pingTimeout);
	//this.pingTimeout = setTimeout(function(){
	//	socket.terminate();
	//}, 3000+1000);
        break
        case 'disconnection':
        machdisconnect(socket);
        break
        case 'connected':
        machConnected(socket);
        break
        case 'clearproducer':
       clearProducer();
        break
        case 'krestik':
        deleteConnection(msg.id);
        break
      default:
        break
    }
  })
socket.on('error', function(e){
	//console.log("ERROR ***: ", e);
})
  socket.on('close', (code, reason) => {
	  clearTimeout(this.pingTimeout);
    console.log(`#${socket.id} disconnected: [${code}]${reason}`)
    broadcasti({ type: 'online', online: wsServer.clients.size })
    
    hangUp(socket.id, { type: 'hang-up', partnerId: socket.userId, ignore: false }, true, "noabrupt")
    /* handleMediasoup.*/handleMediasoup(socket, msg, WebSocket, wsServer, pool).cleanUpPeer(socket.pubId);
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

async function broadcast_publish(ws, obj){
		for (let el of wsServer.clients) {
			if(el.pubId && el.pubId == obj.publishedId){
				console.log("GENAU!", el.pubId);
			wsend(el, obj);
		}
		}
		 if(obj.sub =="gift"){
		 console.log('msg gift*** : ', obj);
		 let peerSocket = getSocket(obj.publishedId);
		 if(peerSocket){
		// console.log("userId, nick, userId , nick ", socket.userId, ' ', socket.nick, ' ', peerSocket.userId, ' ', peerSocket.nick);
		 if(peerSocket.isLogged == "no"){
			 console.log('peerSocket NO logged!!!!');
			 wsend(ws, { type: "error", err: "Собеседник не залогинен!"});
			 return;
		 }
		// peerSocket.send(JSON.stringify(msg))
		console.log("peerSocket gift!!!!");
		wsend(peerSocket, { type: "gift2", quant: obj.quant });
		 try{
			 let a = (obj.istestheart?'theart':'heart');
			 await pool.query(`update users set ${a}=${a}-(?) where id=(?)`, [ obj.quant, obj.from_id ]);
			 await pool.query(`update users set ${a}=${a}+(?) where id=(?)`, [ obj.quant,/* msg.to_id */ peerSocket.userId ] );


await pool.query(`insert into processTest(from_id,from_nick,wieviel) values((?),(?),(?)) ON DUPLICATE KEY UPDATE wieviel=wieviel+(?)`, [ obj.from_id, obj.from_name, obj.quant, obj.quant ]);
		
		 }catch(err){
			 console.log("SEND HEARTS ERROR ", err);
			// wsend(socket, { type: " error", err: err });
		 }
		 
	 }else{
		 console.log('peerSocket not found!');
	 }
	 }
}

function getSocket(id){
	for (let el of wsServer.clients) {
		console.log("el.id == id ", el.id, ' = ', id);
		if(el.id == id){
			return el;
		}
	}
	return undefined;
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


function getPairsCount(){
	var kk=0;
	for (let el of wsServer.clients) {
    if (el.target) {
		console.log("el.target **** ", el.target);
		kk++;
	}}
	return kk;
}
function deleteConnection(id){
	for (let el of wsServer.clients) {
		if(el.id == id){
			el.terminate();
			return;
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
