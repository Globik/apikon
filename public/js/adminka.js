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
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

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
	console.log("data type: ", msg.type);
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
	goStun();
}

function whosOnline(el){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "block";
}


function goStun(){
	//let f =document.forms.stun;
	suka.addEventListener('submit', doStun, false);
}
 function doStun(ev){
	 try{
	 ev.preventDefault();
	// alert(1);
	let data = {}
	data.stun1 = ev.target.stun1.value;
	data.stun2 = ev.target.stun2.value;
	data.turn1 = ev.target.turn1.value;
	data.turn2 = ev.target.turn2.value;
	data.turn3 = ev.target.turn3.value;
	data.turn4 = ev.target.turn4.value;
	data.username1 = ev.target.username1.value;
	data.credential1 = ev.target.credential1.value;
	data.turn5 = ev.target.turn5.value;
	data.username2 = ev.target.username2.value;
	data.credential2 = ev.target.credential2.value;
	alert(JSON.stringify(data));
 }catch{
	 alert(2);
 }
 }


function handleDynamic(obj){
	console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;
		let b = Number(obj.connects);
		
		connects.textContent = b / 2;
	
		
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<caption>${el[1].nick}</caption><div class="dynamicImgHalter"><img src="${el[1].src}"/></div>`;
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
		d.innerHTML=`<caption>${obj.nick}</caption><div class="dynamicImgHalter"><img src="${obj.src}"/></div>`;
		dynamicContainer.appendChild(d);
		camsCount.textContent = obj.camcount;
		 
		let b = Number(obj.connects);
		
		connects.textContent = b / 2;
		
	}else if(obj.sub == "connects"){
		let b = Number(obj.connects);
		
		connects.textContent = b / 2;
	}else{
		
	}
	
}
