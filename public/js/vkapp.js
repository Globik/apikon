// https://dev.vk.com/ru/admin/app-settings/52272918/platform 1000 x 730 | 576 278 bolshoi snippet 1120 × 630 px 3 screenshot Размер: 600 × 1200 px

if(vkBridge){
vkBridge.subscribe((e)=>{console.log('vk ', e);})

vkBridge.supportsAsync('VKWebAppResizeWindow').then(res=>{
	if(res){
		console.log('res ', res);
		//vkBridge.send('VKWebAppResizeWindow',{'width': 800, 'height': 1000 });
	}
})



}

 const myAgeForm = document.forms.verifyageform;
 if(myAgeForm){
 myAgeForm.addEventListener('submit', confirm_age, false);
 var agi = localStorage.getItem("myAge");
if(agi) myAgeForm.bday.value = agi;
}
//const leavbtn = gid('leavbtn');
//const continbtn = gid('continbtn');
//leavbtn.addEventListener('click', leavingPage, false);
//continbtn.addEventListener('click', confirm_age, false);
function confirm_age(ev){
	ev.preventDefault();
	
	try{
	//alert(ev.target.bday.value);
	if(isover18(new Date(ev.target.bday.value))){
		alert('VKID '+VKID.value);
	//	localStorage.setItem("myAge", ev.target.bday.value);
	vax('post','/api/setviewdvk', { vkid: VKID.value }, onsetviewd, onsetviewd_error, null, false);;
		showRules();
	}else{
		gid('outputing').style.visibility = 'visible';
	}
}catch(e){
	//alert(e);
	console.log(e);
}
VK_USER = false;
}
/*
function leavingPage(ev){
	window.location.href = "https://vk.com";
}
*/
 function onsetviewd(){}
 function onsetviewd_error(){};
function showRules(){
	window.onhashchange = null;
	var cat = localStorage.getItem("myCat");
 if(!cat && cat !=="Tom"){
 console.log("**** NO CAT ***");
    location.href="#regeln";
    const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){e.preventDefault();}
}
window.onhashchange = function(ev){
	console.log('hashchanged');
	window.location.href='#regeln';
}

}else{
	window.location.href="#."
}
}
function isover18(dateofbirth){
	const date18yrsago = new Date();
	date18yrsago.setFullYear(date18yrsago.getFullYear() - 18);
	return dateofbirth <= date18yrsago;
}
