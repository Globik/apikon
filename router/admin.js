const express = require('express')
const router = express.Router()
const axios = require('axios').default;

router.get('/getGiftTests', checkAuth, checkRole(['admin']), async(req, res) => {
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

router.get('/yoomoneytest', checkAuth, checkRole(['admin']), async(req, res)=>{
	res.rendel('yoomoneytest', {});
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
