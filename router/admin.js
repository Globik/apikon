const express = require('express')
const router = express.Router()
const axios = require('axios').default;

router.get('/getGiftTests', checkAuth, isAdmin(['admin']), async(req, res) => {
	let db = req.db;
	try{
	let a = await db.query('select * from processTest');
	console.log("a ", a);
   res.json({ content: res.compile('vSendsGift', { giftcount: a })});
   }catch(err){
	   console.log("here", err);
		res.status(400).send({ message: err.name });
	}
})

router.get('/getPayments', checkAuth, checkRole(['admin']), async(req, res)=>{
	try{
		let r=await axios.get('https://api.yookassa.ru/v3/payments', {auth: {username: req.app.locals.testshopid, password: req.app.locals.testshopsecret },
  params: {
    status: "succeeded" 
  }});
 // console.log(r.data);
  let a = r.data;
  res.json({ content: res.compile('vPayments', { count: a })});
	}catch(err){
		console.log(err);
		res.json({ content: err });
	}
})

router.get('/yoomoneytest', secured, isAdmin(['admin']), async(req, res)=>{
	let d = { yoomoney_client_id: req.yoomoney_client_id, yoomoney_secret: req.yoomoney_secret }
	console.log(d);
	res.rendel('yoomoneytest', d);
})

router.post("/saveYoomoney", checkAuth, checkRole('admin'), async(req, res)=>{
	let { client_id, client_secret } = req.body;
	if(!client_id || !client_secret){
		return res.status(200).send({ error: true, message: "No data" });
	}
	let db = req.db;
	try{
		await db.query('update sets set yoomoney_client_id=(?),yoomoney_secret=(?)', [ client_id, client_secret ]);
		res.json({ client_id, client_secret, message: "OK, saved!" });
	}catch(err){
		res.status(200).send({ error: true, message: err });
	}
	
})

router.post('/getYoomoney', checkAuth, checkRole(['admin']), async (req, res)=>{
	let client_id = req.yoomoney_client_id;
	if(!client_id){
		return res.status(200).send({ error: true, message: "No client_id" });
	}
	let d = {
		client_id: client_id,
		response_type: "code",
		redirect_uri: 'https://rouletka.ru/cb1',
		scope: 'account-info operation-history operation-details incoming-transfers payment-p2p payment-shop money-source("wallet","card")'
	}
	try{
		let r=await axios.post('https://yoomoney.ru/oauth/authorize', d,
  {headers: {
    'content-type': 'application/x-www-form-urlencoded' 
    }
    }
    );
 console.log("***");
 console.log(r.status, " ", r.code);
 console.log(r.request.res.responseUrl);
  //let a = r.data;
  if(r.status == 200){
	 res.json({ message: r.request.res.responseUrl });
  }
  //res.json({ message: "OK, redirect to yoomoney"});
}catch(err){
	console.log(err);
	res.json({ error: true, message: err.toString() });
}
})
router.post('/getYoomoneyinfo',  checkAuth, checkRole(['admin']), async (req, res)=>{
	try{
		let r = await axios.post('https://yoomoney.ru/api/account-info', {}, 
		{headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    }
		);
		console.log("DATA : ", r.data);
		res.json({ list: r.data });
	}catch(err){
		console.log(err);
		res.json({ error: true, message: err });
	}
})

router.post('/getYoomoneyHistory', checkAuth, checkRole(['admin']), async (req, res)=>{
	try{
		let r = await axios.post('https://yoomoney.ru/api/operation-history', {}, 
		{headers: {
    'content-type': 'application/x-www-form-urlencoded' ,
     "Authorization": "Bearer " + req.yoomoney_token 
    }
    }
		);
		console.log("DATA : ", r.data);
		res.json({ list: r.data });
	}catch(err){
		console.log(err);
		res.json({ error: true, message: err });
	}
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
