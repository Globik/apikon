const express = require('express')
const router = express.Router()

router.get('/getGiftTests', checkAuth, checkRole(['admin']), async(req, res) => {
	let db = req.db;
	//console.log("/api/getGiftTests");
	try{
	let a = await db.query('select * from processTest');
	console.log("a ", a);
   res.json({ content: res.compile('vSendsGift', { giftcount: a })});
   }catch(err){
	   console.log("here", err);
		res.status(400).send({ message: err.name });
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
