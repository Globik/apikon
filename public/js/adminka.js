var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var sock = null;
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}

function get_socket(){
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/administrator");

  sock.onopen = function () {
    console.log("websocket opened");
   // note({ content: "opened", type: "info", time: 5 });
  };
  sock.onerror = function (e) {
	  console.error(e);
    note({ content: "Websocket error: " + e, type: "error", time: 5 });
  };
  sock.onmessage = function (evt) {
	  
    let a;
    try {
      a = JSON.parse(evt.data);
      on_msg(a);
    } catch (e) {
      note({ content: e, type: "error", time: 5 });
    }
  };
  sock.onclose = function () {
    sock = null;
    console.log('websocket closed');
    note({ content: "Соединение с сервером закрыто!", type: "info", time: 5 });
  };
}
function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}
get_socket();

function on_msg(msg) {
	//console.log("data type: ", msg.type);
	if(msg.type == 'dynamic'){
        handleDynamic(msg);
	}else if(msg.type == "connected2"){
		connects.textContent = msg.size;
	}else if(msg.type == "pick"){
	wsend({type:'pock'});
	}
}
const someSpinner = gid("someSpinner");
function getUsers(el){
	//contentBox.innerHTML = "";
	//dynamicSection.style.display = "none";
	//someSpinner.className = "show";
	clearWindows();
	vax('get','/api/getUsers', {}, on_get_users, on_error, el, false);
	
	
}
function clearWindows(){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "none";
	someSpinner.className = "show";
}
function on_get_users(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function on_error(l, v){
	someSpinner.className = "hide";
	note({ content: l.message, type: "error", time: 5 });
}

function getStun(el){
	clearWindows();
	vax('get','/api/stun', {}, on_get_stun, on_error, el, false);
}

function on_get_stun(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}

function whosOnline(el){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "block";
}

function getSettings(el){
	clearWindows();
	vax('get','/api/getSettings', {}, on_get_settings, on_error, el, false);
}

function on_get_settings(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
	let f = document.forms.testPayment;
	f.addEventListener("submit", onSubmitTestPayment, false);
}

function onSubmitTestPayment(ev){
	ev.preventDefault();
	let d = {};
	d.testshopid = ev.target.testshopid.value;
	d.testshopsecret = ev.target.testshopsecret.value;
	//alert(JSON.stringify(d)+ev.target.method+ev.target.action);
	vax(ev.target.method, ev.target.action, d, on_set_test_payment, on_set_test_payment_error, ev.target, false);
	ev.target.disabled = true;
	ev.target.className = "puls";
}
function on_set_test_payment(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: "info", time: 5 });
}
function on_set_test_payment_error(l, el){
	el.className = "";
	el.disabled = false;
	note({ content: l.message, type: "error", time: 5 });
}
 function setStun(el){
	 
	 let a = preStun.textContent;
	// alert(a);
	 if(!a){
		 note({ content: "A, чо пусто?", type: "error", time: 5 });
		 return;
	 }
	 let b;
	try{
		 b = JSON.parse(a);
	}catch(err){
		alert(err);
		note({ content: err, type: "error", time: 5});
		return;
	}
	vax('post','/api/setstun', b, on_set_stun, on_set_stun_error, el, false);
	el.className = "puls";
 
 }
function getTest(el){
	clearWindows();
	vax('get','/api/getTest', {}, on_get_test, on_error, el, false);
}
function on_get_test(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
	let s =document.forms.ordertodo;
	s.addEventListener('submit', pay, false);
}
const api_url = "https://api.yookassa.ru/v3/payments";
var sukasuka="10";
function pay(el){
	el.preventDefault();
	let dcount = sukasuka
	let damount = el.target.count.value;
	alert(dcount+" "+damount);
	return;
	let d = {};
	d.dcount = dcount;
	d.damount = damount;
	vax('post','/api/getPayUrl', d, on_get_payurl, on_payurl_error, el, false);
	el.className = "puls";
}

function dodo(el){
	//alert(el.getAttribute('data-count'));
	sukasuka = el.getAttribute('data-count');
}
function on_get_payurl(l, el){
	el.className = "";
	console.log(l.message);
	note({ content: l.message, type: "info", time: 5 });
}
function on_payurl_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
function takeCb(el){
	el.className="puls";
	vax('post','/pay/api/takeCb', {}, on_takecb, on_error, el, false);
}
function on_takecb(l, el){
	el.className = "";
	out.innerHTML=JSON.stringify(l.message);
}
function on_set_stun(l, el){
	el.className = "";
	note({ content: l.message, type: "info", time: 5 });
}

function on_set_stun_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
const channel = new BroadcastChannel('message');
	

function post_start(){
	//alert(1);
	//window.postMessage('message', "*");
	//const channel = new BroadcastChannel('message');
	channel.postMessage({"type":"start"});
}

function post_next(){
	//const channel = new BroadcastChannel('message');
	channel.postMessage({"type":"next"});
}

function handleDynamic(obj){
//	console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;
		let b = Number(obj.connects);
		
		//connects.textContent = obj.connects;
	
		
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<caption>${el[1].nick}</caption><div class="dynamicImgHalter"><img data-pid="${el[1].id}" src="${el[1].src}"/></div>`;
		dynamicContainer.appendChild(d);
		
})
	}else if(obj.sub == "remove"){
		camsCount.textContent = obj.camcount;
		let el = document.querySelector(`[data-id="${obj.id}"]`);
		if(el)el.remove();
	}else if(obj.sub == "add"){
		
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", obj.id);
		d.innerHTML=`<caption>${obj.nick}</caption><div class="dynamicImgHalter"><img data-pid="${obj.id}" src="${obj.src}"/></div>`;
		dynamicContainer.appendChild(d);
		camsCount.textContent = obj.camcount;
		 
		let b = Number(obj.connects);
		
		//connects.textContent = b / 2;
		
	}else if(obj.sub == "connects"){
		let b = Number(obj.connects);
		
	//	connects.textContent = b / 2;
	}else if(obj.sub == "srcdata"){
		let el = document.querySelector(`[data-pid="${obj.id}"]`);
		if(el) el.src = obj.src;
	}else{
		
	}
	
}

function getTestGifts(el){
	clearWindows();
	vax('get','/admin/getGiftTests', {}, on_get_test_gift, on_error, el, false);
}

function on_get_test_gift(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function getPayments(el){
	clearWindows();
	vax('get','/admin/getPayments', {}, on_get_payments, on_error, el, false);
}

function on_get_payments(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}











