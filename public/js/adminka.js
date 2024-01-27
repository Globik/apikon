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
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/admin");

  sock.onopen = function () {
    console.log("websocket opened");
  };
  sock.onerror = function (e) {
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
    note({ content: "Соединение с сервером закрыто!", type: "info", time: 5 });
  };
}

get_socket();

function on_msg(msg) {
	//console.log("data type: ", msg.type);
	if(msg.type == 'dynamic'){
        handleDynamic(msg);
	}
}
const someSpinner = gid("someSpinner");
function getUsers(el){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "none";
	someSpinner.className = "show";
	vax('get','/api/getUsers', {}, on_get_users, on_error, el, false);
	
	
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
	contentBox.innerHTML = "";
	dynamicSection.style.display = "none";
	someSpinner.className = "show";
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

function on_set_stun(l, el){
	el.className = "";
	note({ content: l.message, type: "info", time: 5 });
}

function on_set_stun_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}

function handleDynamic(obj){
//	console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;
		let b = Number(obj.connects);
		
		connects.textContent = b / 2;
	
		
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
		
		connects.textContent = b / 2;
		
	}else if(obj.sub == "connects"){
		let b = Number(obj.connects);
		
		connects.textContent = b / 2;
	}else if(obj.sub == "srcdata"){
		let el = document.querySelector(`[data-pid="${obj.id}"]`);
		if(el) el.src = obj.src;
	}else{
		
	}
	
}
