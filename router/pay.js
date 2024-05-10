const express = require('express')
const axios = require('axios').default;
const router = express.Router()
const api_url = "https://api.yookassa.ru/v3/payments";
const { v4: uuidv4 } = require('uuid');
//const uu = uuidv4();


router.post('/api/getPayUrl',/* checkAuth, checkRole(['admin'])*/ async(req, res)=>{
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
			 "return_url":"https://rouletka.ru" 
			 },
			"description": "Сердечек покупка в количестве "+dcount+" штук",
			"metadata":{"alikey":"number one"}
		};
//let headers = { "Authorization": "Basic " + onesignal_app_key };
	console.log('req.app.locals ', req.app.locals.testshopid, ' ', req.app.locals.testshopsecret);
	if(!req.app.locals.testshopid || !req.app.locals.testshopsecret){
		return res.status(400).send({ message: "No test shop id or test secret" });
	}
	let uu = uuidv4();
let headers = {'Idempotence-Key': uu };
try{
let r = await axios.post(api_url, data, {auth: {username: req.app.locals.testshopid, password: req.app.locals.testshopsecret } , headers: headers });
console.log("r: ", r.data);
res.json({ message: r.data.confirmation.confirmation_url });
// res.redirect(r.data.confirmation.confirmation_url)
}catch(e){
console.log("err: ", e);
res.status(200).send({ message: e.toString() });
}	
})

/*
 * 2200000000000004
  {
  id: '2dcf0ce8-000f-5000-a000-1ac95d0d4664',
  status: 'pending',
  amount: { value: '100.00', currency: 'RUB' },
  description: 'Сердечек покупка в количестве 10 штук',
  recipient: { account_id: '383452', gateway_id: '2239359' },
  created_at: '2024-05-09T16:26:17.000Z',
  confirmation: {
    type: 'redirect',
    confirmation_url: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2dcf0ce8-000f-5000-a000-1ac95d0d4664'
  },
  test: true,
  paid: false,
  refundable: false,
  metadata: { alikey: 'number one' }
}
 
 * 
 */ 
var iii = 0;
const dummy = new Map();
//dummy.set(4,{name:"alik"})

router.post("/cb/testyookassa", async(req, res)=>{
	let a = req.body;
	dummy.set(iii, a);
	console.log('body: ', a);
	iii++;
	res.status(200).send({ message: "OK" });
})
//console.log('dummy: ', dummy)
router.post('/api/takeCb',/* checkAuth, checkRole(['admin']),*/ async(req, res)=>{
	
	let a = (dummy.size==0?"Nothing": [...dummy]);
	res.json({ message: a });
})
module.exports = router

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
