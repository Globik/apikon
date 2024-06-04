var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var kK = 0;
var sock = null;
var pc = null;
var connectionState = "closed";
var mobChat = false;
var isOpen = false;

var F = false;
var isShow = false;
var someInterval;
var OPENCLAIM = false;
var videoInput1, videoInput2;
const IPS = new Map();
var partnerId;

var someIp = null;
var remote = gid("remote");
var local = gid("local");
const claimMenu = gid("claimMenu");
const startbtn = gid("startbtn");
const nextbtn = gid("nextbtn");
local.srcObject = null;
remote.srcObject = null;
var esWar = null;
var polite = true;
var makingOffer = false;
var ignoreOffer = false;
var isSettingRemoteAnswerPending = false;
var unsubscribe = false;
var CONNECTED = false;

const heartcountels = document.querySelectorAll("div.heartcount");

function toggleCam(el){
	if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;

	}else{
		note({ content: "Нажми на старт-то!", type: "warn", time: 5 });
		panelOpen();
		return;
	}
	
	var dura;
	var si = el.getAttribute("data-current");
	if(si !== videoInput2){
	el.setAttribute("data-current", videoInput2);
	dura = videoInput2;
	
	F = true;
}else{
	el.setAttribute("data-current", videoInput1);
	dura = videoInput1;
	
	F = false;
}

		let constraints = {
			audio:{
      echoCancellation: {exact: true}
    }, 
    video:{deviceId: dura ? {exact: dura} : undefined}
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
		isShow = true;
	local.srcObject = stream;	
	window.streami = stream;
	panelOpen();
	
	if(!pc) {
		return;
	}
	// let videoTrack = stream.getVideoTracks()[0];
	   const audioTrack = stream.getTracks()[0];	
	   const videoTrack = stream.getTracks()[1];
	 console.log('videoTrack.kind ', audioTrack.kind," ", videoTrack.kind);
	// if(audioTrack){
	   var sender = pc.getSenders().find(function(s) {
		 console.log('s.track.kind ', s.track.kind);
		  if(s.track && audioTrack){ 
        return s.track.kind == audioTrack.kind;
	}else{
		return undefined;
		}
      });
      
 // }
      
       var sender2 = pc.getSenders().find(function(s) {
		 console.log('s.track.kind2 ', s.track.kind);
		  if(s.track && videoTrack){ 
        return s.track.kind == videoTrack.kind;
	
	}else{
		return undefined;
		}
      });
      
      
      
      
      
      
    
      if(sender){
      sender.replaceTrack(audioTrack).then(function(){
		  console.log('was denn');  
	  }).catch(handleError);
	  
  }
	  
	   if(sender2){
      sender2.replaceTrack(videoTrack).then(function(){
		console.log('was denn');  
	  }).catch(handleError);
	  
  }
	 
 }
	).catch(handleError)
	isShow = false;
}
var isSharing =false;
async function doSharing(el){
	let ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if(ismobile){
		note({ content: "Не работает в мобильниках!", type: "error", time: 5 });
		panelOpen();
		return;
	}
	if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;

	}else{
		note({ content: "Нажми на старт-то!", type: "error", time: 5 });
		panelOpen();
		return;
	}
	var screenS = null;
	try{
		  const con = { video: { cursor: 'always' }, audio: true };
           screenS = await navigator.mediaDevices.getDisplayMedia(con);
          local.srcObject = screenS;
          window.streami = screenS;
          
          panelOpen();
          // const screenTrack = screenS.getVideoTracks()[0];
           const screenTrack = screenS.getTracks()[0];	
        if(!screenTrack){
			note({ content: "No sharing works. Oops.", type: "error", time: 5 });
			return;
		}
           if(screenTrack){
			   isSharing = true;
			   screenTrack.onended = ()=>{
				   panelOpen();
				   note({ content: "Screensharing ended", type: "info", time: 5 });
				   toggleCam(camToggle);
				   screenS = null;
				   isSharing = false;
				   
			   }
			   
			  
			
			   
		   }
          if(!pc){
			  return;
		  }
         
          if(screenTrack){
			  const sender = pc.getSenders().find(sender=> sender.track.kind === screenTrack.kind);
			  if(!sender) {
				  note({ content: "Oops", type: "error", time: 5 });
				  return;
				  }
			  sender.replaceTrack(screenTrack);
			  isShow = true;
		  }	  
	  }catch(e){
		 note({ content: e, type: "error", time: 5 });
		 isShow = false;
	  }finally{
	   setTimeout(function(){
				if(!isSharing){
					if(!screenS) {
						let constraintsi = {
		audio:{
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate:48000,
      sampleSize: 16
    }, 
	video: {deviceId: videoInput1 ? {exact: videoInput1} : undefined,
		width:320, height:240, 
	//	frameRate:15
		}
		};
	
	panelOpen();
	note({ content: "Отменв скриншэринга. Включаем вебку!", type: "info", time: 5 });
						navigator.mediaDevices.getUserMedia(constraintsi).then(function(stream){

	isShow = true;
	local.srcObject = stream;	
	window.streami = stream;
	
	
	if(!pc) {
		return;
	}
	 let videoTrack = stream.getVideoTracks()[0];
	   var sender = pc.getSenders().find(function(s) {
        return s.track.kind == videoTrack.kind;
      });
      
      sender.replaceTrack(videoTrack).then(function(){
		  
	  }).catch(handleError);
	 
	
	
	
	
	
}).catch(handleError);
					}
				}   
			   }, 0);
		   }
}
function mach(){
	if(pc){
		//if(sock)sock.close();
		pc.close();
		//pc=null;
		
	}
}
function gotDevices(deviceInfos){
	let a = navigator.mediaDevices.getSupportedConstraints();
	
	for(var i=0; i !== deviceInfos.length; ++i){
		
		const deviceInfo = deviceInfos[i];
		if(deviceInfo.kind === 'videoinput'){
			if(kK == 0){
				videoInput1 = deviceInfo.deviceId;
			
	
			}else if(kK == 1){
				
				videoInput2 = deviceInfo.deviceId;
			}
			
			kK++;
		}
	}
}
function getDevice(){
if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
console.warn("your browser navigator.mediaDevices not supported");
}else{
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function(err){console.error(err)});
}
}

getDevice();

function panelOpen(el){
			
			var settingspanel = document.getElementById("settingspanel");
			if(!isOpen){
			settingspanel.className = "open";
			isOpen = true;	
			
			
			document.addEventListener("visibilitychange", newev);
	
	/*
	window.addEventListener('beforeunload', function(event) {
    // Send a message to all other tabs that this tab is closing
    console.log('tab-closing');
});
*/			
			
			
			
			
			}else{
				 document.removeEventListener('visibilitychange', newev);
				settingspanel.className = "";
				isOpen = false;
			}
		}
function openClaim(el){
	
	if(!OPENCLAIM){
			claimMenu.className = "show";
			OPENCLAIM = true;	
			}else{
				claimMenu.className = "";
				OPENCLAIM = false;
			}
}

function sendClaim(el){
	let d = el.getAttribute("data-claim");
	if(d == "ignor"){
		note({ content: "ОК. Добавили в игнор.", type: "info", time: 5 });
	}else if(d == "claim"){
		note({ content: "Спвсибо, модератор рассмотрит вашу жалобу.", type: "info", time: 5 });
	}
	openClaim(claimContainer);
	let l = claimMenu.getAttribute("data-vip");
	if(l)insertIgnore(l);
}
function insertIgnore(ip){
	if(!remote.srcObject){
		return;
	}
	if(!IPS.has(ip))IPS.set(ip, {});
	console.log("pressing next");
	next(nextbtn, true, IPS, true);
}
function closeClaim(el){
	/*
	if(OPENCLAIM){
			claimMenu.className = "";
				OPENCLAIM = false;
	}*/
	//openClaim();
}
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}


function newev(){
	 if (document.hidden){
        console.log("Browser tab is hidden")
        setSignal();
    } else {
        console.log("Browser tab is visible")
       //document.removeEventListener('visibilitychange', newev);
    }
   // document.removeEventListener('visibilitychange', newev);
}


function wari(el){
	//alert('load');
	return;
	let s = document.querySelector('iframe');
	s.onclick=function(){
		//alert(1);
	}
	//s.contentWindow.postMessage('message', '*');
	//s.contentWindow.onopen=function(){
	//alert(6);
	//}
	
//	const channel = new BroadcastChannel('tab-activity');

// Listen for messages on the channel
/*
channel.addEventListener('message', (event) => {
    if (event.data === 'open-new-tab') {
        console.log('User opened another tab');
    }
});
*/ 
	document.addEventListener("visibilitychange", newev);
	
	
	window.addEventListener('beforeunload', function(event) {
    // Send a message to all other tabs that this tab is closing
    console.log('tab-closing');
});
	
	
}

window.onmessage = function(event){
	//alert(1);
	//console.warn(event);
   if (event.origin == 'http://localhost:3000') {
      if(event.data == "message")  console.log('Message received! ', event.data);
       // alert('message ');
    }
};



const channel = new BroadcastChannel('message');
	channel.onmessage = function (ev) { 
		console.log(ev.data); 
		let a = ev.data.type;
		if(a == "start"){
			start(startbtn);
		}else if(a == "next"){
			next(nextbtn, true);
		}else{}
		}


var isEnter = gid('isEnter');
function ifEnter(){
	if(isEnter.value === "true"){
		return true;
	}else{
		return false;
	}
}

function setSignal(){
	//alert("aha");
	//vax('post','/api/setDonation', { nick: NICK }, function(l, v){}, function(l, v){}, null, false);
	//document.removeEventListener('visibilitychange', newev);
}
//window.onpagehide=function(){alert('open')}
function get_socket() {
	 if(NICK == "anon" || NICK == undefined){
		//  sock.close();
		  note({content: "Залогиньтесь!", type: "warn", time: 5 });
		  return;
	  }
	//  alert(ifEnter());
	if(ifEnter()){
		window.location.href='#purchaseHREF';
		 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
}
window.onhashchange = function(ev){
	console.log('hashchanged');
	window.location.href='#purchaseHREF';
}
return window.location.href='#purchaseHREF';

}else{
	window.ohashchange = null;
}
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	 wsend({ type: "helloServer", userId: gid("userId").value, nick: userName.value });
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
    onlineCount.textContent = 0;
     camsCount.textContent = "0";
     connects.textContent = "0";
     if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;
	
}
startbtn.setAttribute("data-start", "no");
	startbtn.textContent = "старт";
	startbtn.className = "start";
	sock = null;
	startbtn.disabled = false;
	nextbtn.disabled = true;
  };
}
var tr = undefined;
//get_socket();
function on_msg(msg) {
	//console.log("data type: ", msg.type);
	 switch (msg.type) {
		 case 'pick':
		// wsend({type:'pock'});
		 break
      case 'online':
        onlineCount.textContent = msg.online
        break
      case 'new-ice-candidate':
        handleNewIceCandidate(msg.data)
        break
      case 'video-offer':
       console.log(msg.vip, " ", msg.partnerId);
       console.log("your id: ", userId.value, "partner id ", msg.partnerId);
       // claimMenu.setAttribute("data-vip", msg.vip);
       claimMenu.setAttribute("data-vip", msg.partnerId);
       //  let a = checkIp(msg.vip);
        let a = checkIp(msg.partnerId);
        if(!a){
        handleVideoOffer(msg.data)
	}else{
		console.log("NO VIDEO");
	//	wsend({type: "hang-up", subi: "here" });
	let amap=[[0,{}]];
	if(IPS.size > 0) amap = IPS;
	next(nextbtn, true, IPS, true);
	}
        break
      case 'video-answer':
        handleVideoAnswer(msg.data)
        break
      case 'hang-up':
      if(msg.ignore){
		  console.warn(msg.ignore, " ", msg.partnerId);
		  if(!IPS.has(msg.partnerId)){
			  IPS.set(msg.partnerId, {});
		  }
	  }
	  console.warn("hangup! " + msg.ignore);
        handleHangUp()
        break
      case 'peer-matched':
        console.log(msg.vip, " ", msg.partnerId);
        partnerId = msg.partnerId;
        console.log("your id: ", userId.value, "partner id ", msg.partnerId);
       // claimMenu.setAttribute("data-vip", msg.vip);
        claimMenu.setAttribute("data-vip", msg.partnerId);
       // let a3 = checkIp(msg.vip);
        let a3 = checkIp(msg.partnerId);
        console.warn("a3", a3);
        if(!a3){
			console.warn("was isch");
		handlePeerMatched()
	}else{
		console.error("some ignor");
		//wsend({ type: "hang-up" });
		let amap=[[0,{}]];
	if(IPS.size > 0) amap = IPS;
	next(nextbtn, true, IPS, true);
		
	}
        break
      case 'message':
        handleMessage(msg.data)
        break
        case 'gift':
        handleGift(msg);
        break
        case 'write':
   //  if(!tr){
       // printmsg2.className='write';
       // printmsg.className="write";
       znakPrint.classList.remove("hidden");
       znakPrint2.classList.remove("hidden");
	//}
		tr=setTimeout(function(){
			//printmsg2.className='';
			//printmsg.className="";
			znakPrint.classList.add("hidden");
			znakPrint2.classList.add("hidden");
			clearTimeout(tr);
			tr = undefined;
		}, 1000);
	
        break;
       case 'unwrite':
       // printmsg2.className='';
       // printmsg.className="";
        znakPrint.classList.add("hidden");
        znakPrint2.classList.add("hidden");
        break;
        case 'connected2':
        connects.textContent = msg.size;
        break;
        case 'dynamic':
        handleDynamic(msg);
        break;
        case 'error':
        note({ content: msg.err, type: "error", time: 5 });
        break;
        case 'vip':
        someIp = msg.vip;
      default:
        break
    }
	
}
function checkIp(ip){
	let a = IPS.has(ip);
	return a;
}
function  handleMessage(msg, bool){
	//printmsg2.className="";
	//printmsg.className="";
	znakPrint.classList.add("hidden");
	znakPrint2.classList.add("hidden");
	let div=document.createElement('div');
	let div2=document.createElement('div');

		div.className="yourmsg he2";
		if(bool){
			div.innerHTML="<span><b>Собеседник: </b></span><br><span>" + msg + "</span>";
		}else{
		div.innerHTML="<span><b>Собеседник: </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		
mobileChat.className="";


textarea2.className="";

		div2.className="yourmsg2 he";
		if(bool){
			div2.innerHTML="<span><b>Собеседник: </b></span><br><span>" + msg + "</span>";
		}else{
		div2.innerHTML="<span><b>Собеседник: </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		
}
function fuckMessage(msg){
	//mobile
	let div2=document.createElement('div');
	div2.className="yourmsg2 he";
    div2.innerHTML="<span><b>Собеседник: </b></span><br><span>" + msg + "mobile?</span>";
}
function handleHangUp(){
	//alert("hongup");
	 //printmsg2.className='';
     //printmsg.className="";
     znakPrint.classList.add("hidden");
     znakPrint2.classList.add("hidden");
    // let ss = unsubscribe?false:false;
    let amma=[[0,{}]]
    if(IPS.size > 0)amma = IPS;
    console.warn("giftsContainer.className ", giftsContainer.className);
    //giftsContainer.className="";
	next(nextbtn, false, amma, false);
}

function handleNewIceCandidate(msg) {
 // console.log('ice cand: ', msg);
	if(pc){
		//var cand = new RTCIceCandidate(msg);
	if(msg){
		pc.addIceCandidate(msg).then(function(){
			
		}).catch(function handleError(er){
			console.log("ignoreOffer ? ", ignoreOffer);
			console.error(er);
		});
	}
	}

}
 async function handleVideoOffer(msg){
	console.log('makingOffer: ', makingOffer);
	if(makingOffer){
		console.warn("already made an offer");
		return;
	}
	 console.log('handle video offer ', msg.type);
	 createPeerConnection();
	 if(pc&&pc.signalingState=="have-local-offer")return;
	//  if(pc.signalingState == "stable") return;
	   
	 try{
		// const readyForOffer = !makingOffer && (pc.signalingState == "stable" || isSettingRemoteAnswerPendingtting);
		// const offerCollision = msg.type == "offer" && !readyForOffer;
		// ignoreOffer = !polite && offerCollision;
		// if(ignoreOffer){
			// return;
		 //}
		// isSettingRemoteAnswerPending = msg.type == "answer";
		
	await pc.setRemoteDescription(msg);
	//.then(function(){
		//return 
	//	isSettingRemoteAnswerPending = false;
	const answer =	await pc.createAnswer();
		//.then(function(answer){
			//return 
			await pc.setLocalDescription(answer);
			//.then(function(){
				wsend({type: 'video-answer', vip: someIp, data: pc.localDescription /*, target: from, from: clientId*/});
				
		//	});
		//});
	//}).
	
	}catch(err){
		console.error(err);
	}
 }
 // iceTransportPolicy:"relay"
 
 function handleVideoAnswer(msg){
	 if(pc && pc.signalingState == "stable") return;
	 console.log("handle video answer");
	 if(pc.signalingState=="have-local-offer"){
	 	pc.setRemoteDescription(msg).then(function(){
			
		}).catch(function handleError(er){
			console.error(er);
		});
	}
 }
 
 const offerOpts = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
 async function handlePeerMatched(){
	
	 createPeerConnection();
	//  if(makingOffer) return;
    try{
		makingOffer = true;
	const offer = await pc.createOffer(offerOpts)
	//.then(function(offer){
		//return 
		await pc.setLocalDescription(offer);
	//}).then(function(){
		wsend({'type': 'video-offer', vip: someIp, data: pc.localDescription/*, target: target, from: clientId*/});
	//}).
	}catch(err){
		console.error(err);
		makingOffer=false;
	}finally{
	//	makingOffer = false;
	}

 }
 
 let constraints = { audio: true, video: true };

function start(el){
	 if(NICK == "anon" || NICK == undefined){
		
		  note({content: "Залогиньтесь!", type: "warn", time: 5 });
		  return;
	  }
	if(!sock) {
		get_socket();
		}
	if(el.getAttribute("data-start")=="no"){
		
		el.disabled = true;
			document.body.click();
		if(local.srcObject==null){
			let constraintsi = {
		audio:true /*{
			
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate:48000,
      sampleSize: 16
    }*/, 
	video: {deviceId: videoInput1 ? {exact: videoInput1} : undefined,
		width:320, height:240, 
	//	frameRate:15
		}
		};
	
	
	
	
	navigator.mediaDevices.getUserMedia(constraintsi).then(function(stream){

	
	local.srcObject = stream;	
	window.streami = stream;



	el.setAttribute("data-start", "yes");
	el.disabled = false;
	el.className = "stop"
	
	el.textContent = "стоп";
		}).catch(handleError);
}
}else{
	el.setAttribute("data-start", "no");
	el.textContent = "старт";
	el.className = "start";
	
	unsubscribe = false;
	if(window.streami){
		local.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
}
CONNECTED = false;
clearInterval(someInterval);
someInterval = null;
	local.srcObject = null;
	window.streami = undefined;
	closeVideoCall();
	wsend({type: "hang-up", ignore: false });
	el.disabled = false;
	nextbtn.disabled = true;
	local.style.backGround="rgba(0,0,0,0);"
	//if(sock) sock.close();
	isShow = false;
	chatbox.innerHTML="";
	chatbox2.innerHTML="";
	txtvalue.value="";
	txtvalue2.value="";
	mobileChat.className="hide";
	mobChat = false;
	somespinner.className="";
		somehello.className="";
		mobileloader.className="";
		 // printmsg2.className='';
       // printmsg.className="";
         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
        duka2.className="";
        clearDynamicContainer();
        camsCount.textContent = "0";
        connects.textContent = "0";
         polite = true;
 makingOffer = false;
 ignoreOffer = false;
 isSettingRemoteAnswerPending = false;
 if(sock) sock.close();
 partnerId = null;
}
}

function handleError(err){
	//alert(err);
		//note({"content": err.name, type: "error", time: 15});
		console.error(err);
	}
	function doScreenshot(){
		if(!local.srcObject) return;
		let imgdata = Screenshot();
		wsend({ type: "srcdata", src: imgdata});	
	}
	local.onloadedmetadata = function () {
		console.log("local onloaded");
		if(isShow)return;
		setTimeout(function(){
		let imgdata = Screenshot();
	

		let amap=[['0',{}]];
	if(IPS.size > 0) amap = IPS;
	console.error("amap", amap, IPS);
		wsend({ type:'search-peer', nick: (NICK?NICK:'Anonym'), src: imgdata , ignores: [...IPS] });
	}, 100);
	someInterval = setInterval(doScreenshot, 1000);
		somespinner.className="show";
		mobileloader.className="active";
		duka2.className="show";
	}
	remote.onloadedmetadata = function () {
		console.log("remote onloaded");
		nextbtn.disabled = false;
		somespinner.className="";
		somehello.className="see";
		mobileloader.className="";
		
		//mobileChat.className = "";
		hideChat();
		duka2.className="";
		CONNECTED = true;
	}
	
	function hideChat(el){
		
		if(!mobChat){
		mobileChat.className = "";
		textarea2.className = "";
		mobChat =  true;
	}else{
		mobileChat.className = "hide";
		textarea2.className = "hide";
		mobChat = false;
	}
	}
	
	function txtInput(el){

		wsend({type:"write"});
	
	}
	function someChange(){
		wsend({type:"unwrite"});
	}
	
	txtvalue.addEventListener('keydown', sendEnter, false);
	txtvalue2.addEventListener('keydown', sendEnter, false);
	function sendEnter(ev){
		if(ev.key == "Enter"){
			//alert(event.target.getAttribute("data-send"));
			//if(!txtvalue.value || !txtvalue2.value)return;
			let str = txtvalue2.value.trim();
			//if(str.length==0)return;
			sendi(event.target);
		}
	}
	
	function sendi(event){
		
		 let l = event.getAttribute("data-send");
		// alert(l);
		 if(l){
		 if(l == "one"){
			 //for computer
			//if(!txtvalue.value)return;
			console.warn('bu ', txtvalue.value.trim());
			let stri = txtvalue.value.trim();
		//console.warn("str ", str, str.length);
		if(!stri)return;
			sendiOne();
		//	console.warn('bu ', txtvalue.value);
			//textvalue2.value="";
			
	}else if(l == "two"){
		// for mobile
		//console.warn('bu2 ', txtvalue.value.trim());
		let str = txtvalue2.value.trim();
		console.warn("str ", str, str.length);
		if(!str)return;
		sendiTwo();
		
	}
}
/*
let l2 = ev.target.getAttribute("data-send");
if(l2){
	 if(l2 == "one"){
			sendiOne();
			
	}else if(l2 == "two"){
		sendiTwo();
		
	}
}*/
	 }
	 
	 function insertMessage(n){
		 if(n.type == "computer"){
		 let div=document.createElement('div');
		
		div.className = "yourmsg";
		div.innerHTML="<span class='you2'><b>Вы: </b></span><br><span>" + n.msg + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}else{
		let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>Вы: </b></span><br><span>" + n.msg + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
	}
	 }
	 
	 function sendiOne(){	
			if(!txtvalue.value) return;
				let div=document.createElement('div');
				// printmsg2.className='';
       // printmsg.className="";
        znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
		div.className="yourmsg";
		div.innerHTML="<span class='you2'><b>Вы: </b></span><br><span>" + esci(txtvalue.value.trim()) + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		wsend({type:"message", data: txtvalue.value});
		txtvalue.value="";
	}
	function sendiTwo(){
		//for mobile
		// printmsg2.className='';
        //printmsg.className="";
         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
    //  alert(txtvalue2.value+txtvalue2.value.length);
     // console.log(txtvalue2.value);
		if(!txtvalue2.value) return;
			let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>Вы: </b></span><br><span>" + esci(txtvalue2.value.trim()) + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		wsend({type:"message", data: txtvalue2.value});
		txtvalue2.value="";
	}
		//uuu
		function sendi2(l){
		if(l=="one"){
			sendiOne();
			
	}else if(l=="two"){
		sendiTwo();
		
	}}

	
	
	  var iceServers2 = {"iceServers": [ 
	  {
        urls: 'stun:stun.l.google.com:19302'
      },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'efZIKNPZ0Y17GFG3WZ', credential: 'HIYNupkIAHFXSgW8'},
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]};
  var iceServers = {
	  "iceServers":[
	  {
        urls: 'stun:stun.l.google.com:19302'
      }
	  ]
	  };
  
  if(ICESERVERS){
 iceServers  = ICESERVERS;
}





   function next(el, bool, ignores, isIgnore){
	   el.disabled = true;
	   CONNECTED = false;
      closeVideoCall();
    if(bool)  {
		wsend({type: "hang-up", ignore: isIgnore });
		unsubscribe = true;
	}
      let imgdata = Screenshot();
     // alert(JSON.stringify({a: [...ignores]}));
     wsend( { type:'search-peer', nick: (NICK?NICK:"Anoni"), src: imgdata, ignores: (ignores?[...ignores]:[[0,{}]]) });
      chatbox.innerHTML="";
	  chatbox2.innerHTML="";
	mobileChat.className = "hide";
	mobChat = false;
	txtvalue.value="";
	txtvalue2.value="";
	somespinner.className="show";
	mobileloader.className="active";
	duka2.className="show";
		somehello.className="";
      // printmsg2.className='';
      //  printmsg.className="";
      znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
     // sectionTextArea.classList.add('hide');
      textarea2.classList.add('hide');
         polite = true;
 makingOffer = false;
 ignoreOffer = false;
 isSettingRemoteAnswerPending = false;
 partnerId = null;
 //giftsContainer.style.display="block";
    }
    
    
    
    function iceCandidateHandler (event) {
  if (event.candidate) {
    wsend({type: 'new-ice-candidate', data: event.candidate/*, target: targetId*/})
  }
}


function iceConnectionStateChangeHandler (event) {
  console.log('*** ICE connection state changed to ' + event.target.iceConnectionState)

  switch (event.target.iceConnectionState) {
    case 'connected':
   // if(esWar == 'remoteOffer')
    wsend({ type: "connected" });
    break;
    case 'complete':
      connectionState = 'open'
      break;
    case 'closed':
    console.log('ice closed');
    note({content: "Closed", type: "warn", time: 5 });
    break;
    case 'failed':
    console.log('ice failed');
     note({content: "Failed! Press stop, then start", type: "warn", time: 5 });
     break;
    case 'disconnected':
    CONNECTED = false;
    console.log('ice disconnected');
    note({content: "Disconnected! Press next", type: "warn", time: 5 });
   // wsend({type:"disconnection"});
  //  alert(event.target.iceConnectionState);
  //  next(nextbtn);
      break;
  }
}

function iceGatheringStateChangeHandler (event) {
  console.log('*** ICE gathering state changed to: ' + event.target.iceGatheringState)
//  if(event.target.iceGatheringState=="complete")next(nextbtn);
}

function signalingStateChangeHandler (event) {
  console.log('*** WebRTC signaling state changed to: ' + event.target.signalingState)

  switch (event.target.signalingState) {
    case 'closed':
   //  closeVideoCall()
   console.log("signaling state closed");
   note({content: "Signaling State Closed", type: "warn", time: 5 });
   //wsend({type:"disconnection"});
      break;
      case 'have-remote-offer':
     // if(!esWar){
		  esWar = 'remoteOffer';
	  //}
      break;
      case 'have-local-offer':
      esWar = 'localOffer';
      break;
  }
}

function negotiationNeededHandler (event) {
 // console.log('*** Negotiation needed')

  if (connectionState === 'closed') {
    connectionState = 'connecting'
   // wsend({type: 'search-peer'})
  }
}

function trackHandler (event) {
  console.log('*** the remote peer adds a track to the connection')
 remote.srcObject = event.streams[0]
 
}

function removeTrackHandler (event) {
  console.log('*** the remote peer removes a track from the connection')
  const trackList = remote.srcObject.getTracks()
  if (trackList.length === 0) {
  //  closeVideoCall()
  }
}
  

function closeVideoCall() {
  

  if (!pc) {
    return
  }
//nextbtn.disabled = true;
  console.log('Closing the peer connection...');
  pc.removeEventListener('icecandidate', iceCandidateHandler);
  pc.removeEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler);
  pc.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler);
  pc.removeEventListener('signalingstatechange', signalingStateChangeHandler);
  pc.removeEventListener('negotiationneeded', negotiationNeededHandler);
  pc.removeEventListener('track', trackHandler);
  pc.removeEventListener('removetrack ', removeTrackHandler);

  if (remote.srcObject) {
    remote.srcObject.getTracks().forEach(track => {
      track.stop()
    })
    remote.srcObject = null;
    connectionState = "closed";
  }

  pc.close();
  pc = null;
}


 function addLocalStream () {
    var streami = window.streami;
 try{
    streami.getTracks().forEach(function(track){
	pc.addTrack(track, streami);
	})
}catch(e){
	note({content: e, type:'error', time: 5})
	}
  }

  function removeLocalStream () {
	  if(!local.srcObject) return;
    local.getTracks().forEach(track => track.stop());
    local.srcObject = null
  }
  
function addStream({ track, streams }){
	track.onunmute = function(){
	if(remote.srcObject){return;}
	remote.srcObject = streams[0];
	
	}
}

function iceCandidateError(e) {
	console.error("ice err: ", e.url, e.errorText );
//	note({content: "ice err: " + e.url + " " + e.errorText, type: "error", time: 5});
}


  function createPeerConnection () {
    try{
    pc = new RTCPeerConnection(iceServers);
}catch(er){
	alert(er);
	return;
}
addLocalStream ();
 	if('ontrack' in pc){
	pc.ontrack = addStream;
}else{
	pc.addStream(window.streami);
	pc.onaddstream = function(e){
		remote.srcObject = e.stream;
	}
}
    pc.addEventListener('icecandidate', iceCandidateHandler, false);
    pc.addEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler, false);
    pc.addEventListener('icegatheringstatechange', iceGatheringStateChangeHandler, false);
    pc.addEventListener('signalingstatechange', signalingStateChangeHandler, false);
    pc.addEventListener('negotiationneeded', negotiationNeededHandler, false);
    pc.addEventListener('track', trackHandler, false);
    pc.addEventListener('removetrack ', removeTrackHandler, false);
    pc.addEventListener('onicecandidateerror', iceCandidateError, false);
    
  }

 function closePeerConnection() {
    closeVideoCall()
    //state.messages.splice(0)
  }

 function clearMessages() {
    
  }

function  addMessage(state, message) {
    
  }


function handleDynamic(obj){
	//console.log(obj);
	if(obj.sub == "total"){
		camsCount.textContent = obj.cams.length;
		let b = Number(obj.connects);
		//if(b != 0){
		//connects.textContent = b / 2;
	//}
		/*
		obj.cams.forEach(function(el, i){
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", el[1].id);
		d.innerHTML=`<caption>${el[1].nick}</caption><div class="dynamicImgHalter"><img src="${el[1].src}"/></div>`;
		dynamicContainer.appendChild(d);
		*/ 
	//})
	}else if(obj.sub == "remove"){
		camsCount.textContent = obj.camcount;
		//let el = document.querySelector(`[data-id="${obj.id}"]`);
		//if(el)el.remove();
	}else if(obj.sub == "add"){
		/*
		let d = document.createElement("div");
		d.className="dynamicbox";
		d.setAttribute("data-id", obj.id);
		d.innerHTML=`<caption>${obj.nick}</caption><div class="dynamicImgHalter"><img src="${obj.src}"/></div>`;
		dynamicContainer.appendChild(d);*/
		camsCount.textContent = obj.camcount;
		 
		let b = Number(obj.connects);
		//if(b == 0)return;
		//connects.textContent = b / 2;
		
	}else if(obj.sub == "connects"){
		let b = Number(obj.connects);
		//if(b == 0)return;
		//connects.textContent = b / 2;
	}else{
		
	}
}
function clearDynamicContainer(){
	return;
	if(!dynamicContainer)return;
	while(dynamicContainer.firstChild){
		dynamicContainer.firstChild.remove();
	}
}
function Screenshot() {
	if(!local.srcObject) return;
    let cnv = document.createElement('canvas');
    let w = 180;
    let h = 150;
    cnv.width = w;
    cnv.height = h;
    var c = cnv.getContext('2d');
    c.drawImage(local, 0, 0, w, h);
    var imgdata = cnv.toDataURL('image/png', 1.0);
    cnv.remove();
    return imgdata;
    
}


  function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}
function toAdminPanel(el){
	document.removeEventListener('visibilitychange', newev);
	window.location.href="/dashboard";
}
function pushSubscribe(el){
	if(!confirm("Присылать пуш-уведомления о том, кто онлайн?")){
		
		panelOpen();
		return;
	}
	//el.disabled = true;
	el.className = "puls";
	panelOpen();
	
	
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
    callFunctionFromScript(el);
}
	script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
	//script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js"
	head.appendChild(script);
	
	
}
	
	
	function callFunctionFromScript(el){
		
		/*
		 var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "226ceb60-4d9a-4299-8d74-b0af22809342"
        });
        OneSignal.setExternalUserId("1");
    });
    OneSignal.isPushNotificationsEnabled(function (isenabled) {
        if (isenabled) {
            console.log("push notifications are enabled!");
            OneSignal.getUserId(function (userid) {
                console.log("userid: " + userid);
            })
        } else {
            console.log("push notifications are not enabled yet");
            
        }
    })
    OneSignal.on('permissionPromptDisplay', function () {
        console.log("The prompt displayed");
        
    });
    OneSignal.push(["getNotificationPermission", function (permission) {
        console.log("Site Notification Permission:", permission);
        
    }]);
    OneSignal.push(function () {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
             el.disabled = false;
            el.className = "";
        });
    });
    OneSignal.push(function () {
        OneSignal.on('notificationDisplay', function (event) {
            console.warn('OneSignal notification displayed:', event);
             el.disabled = false;
            el.className = "";
        });
	})*/
		
	window.OneSignalDeferred = window.OneSignalDeferred || [];
	OneSignalDeferred.push(function(OneSignal){
		let ifsupported = OneSignal.Notifications.isPushSupported();
		if(!ifsupported){
			note({ content: "Ваш браузер не поддерживает пуш-уведомления!", type: "error", time: 5 });
			el.className = "";
			//el.disabled = false;
			return;
			//panelOpen();
		}
		//panelOpen();
		OneSignal.init({
			appId:"226ceb60-4d9a-4299-8d74-b0af22809342"
		});
		
		 OneSignal.Notifications.addEventListener('permissionPromptDisplay', function (ev) {
        console.log("The prompt displayed ", ev);
        el.className = "";
       // el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('permissionChange', function (permission) {
        if(permission){
			console.log("permission accepted");
		}
        el.className = "";
      //  el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('click', function (event) {
        
			console.log("click event ", event);
		
        el.className = "";
      //  el.disabled = false;
    });
    
    
    
    
    
    
	});
	
}
const mediaBox = document.querySelector("article#mediabox");
const giftsContainer  = document.querySelector("section#giftsContainer");
const giftsContainer2  = document.querySelector("section#giftsContainer2");
const giftbox2 = document.getElementById("giftbox2");
const giftbox = document.getElementById("giftbox");
const heartels = document.querySelectorAll("div.heart");
//const heartcountels = document.querySelectorAll("div.heartcount");

giftbox2.addEventListener('click', openGiftBox, false);
giftbox.addEventListener('click', openGiftBox2, false);
giftsContainer.addEventListener('click', ongiftscontainer, false);
giftsContainer2.addEventListener('click', ongiftscontainer2, false);

for(var i = 0; i < heartels.length; i++){
	var heartel = heartels[i];
	heartel.addEventListener('click', onHeartClick, false);
}
function openGiftBox(el){
	console.log("here opengiftbox1", giftsContainer.classList);
	el.stopImmediatePropagation();
	giftsContainer.classList.toggle("hidden");
	/*
	if(giftsContainer.classList.contains("hidden")){
		console.warn("hidden gifts");
		giftsContainer.className="";
		giftsContainer.style.display="block";
		
	}else{
		giftsContainer.style.display="none";
		giftsContainer.classList.add("hidden");
	}*/
}
function openGiftBox2(el){
	//console.log("here opengiftbox2");
	el.stopImmediatePropagation();
	giftsContainer2.classList.toggle("hidden");
}
	function ongiftscontainer(ev){
	ev.stopPropagation();
	}
	function ongiftscontainer2(ev){
	ev.stopPropagation();
	}
	
	/*
	giftsDiv.onclick = function(ev){
		console.log('giftsDive clicked');
	}
	giftsDiv2.onclick = function(ev){
		console.log('giftsDive clicked');
	}*/
	mediaBox.onclick = function(ev){
		//return;
		if(!giftsContainer.classList.contains("hidden")){
			giftsContainer.classList.add("hidden");
		}
		
		if(!giftsContainer2.classList.contains("hidden")){
			giftsContainer2.classList.add("hidden");
		}
	}
	const dohod=gid('dohod');
	const payoutamountid = gid("payoutamountid");
	
function onHeartClick(ev){
	//alert(1);
	
	if(!CONNECTED){
		note({ content: "Никого нет!", type: "info", tyme: 5 });
		return;
	}
	
	
	let quant;let g;
	for(var i = 0; i < heartcountels.length; i++){
		let heartcount = heartcountels[i];
		let n = Number(heartcount.textContent);
		if(n <= 0){
			note({ content: "Недостаточно средств!", type: "info", time: 5 });
			return
		}else{
		 quant = n - 1;
		 g = "heart";
		heartcount.textContent = quant;	
		let cc = Number.parseFloat(quant*0.10).toFixed(2);
		dohod.textContent =  cc;
		 payoutamountid.value = cc;
		}
	}
	processHeart({ g: g, quant: 1 }, ev);
}

function processHeart(n, ev){
			wsend({ type: "gift", gift: n.g, quant: n.quant, from_id: userId.value, from_name: userName.value, to_id: partnerId, 
				istestheart: (isTestHeart.value=="true"?true:false) });
			let str = `Послали в подарок ${n.g=='heart'?'сердечко &#x1f496':''}`
			console.warn(str);
			let l = ev.target.getAttribute("data-type");
			//alert(l);
			
			insertMessage({ type: l, msg: str });
		}
		
function handleGift(msg){
	console.log(msg);
	handleMessage(`Подарили в подарок сердечко &#x1f496`, true);
	let n = Number(msg.quant);
	let a = Number(heartcountels[0].textContent);
	heartcountels[0].textContent = n + a;
	let n1 = Number(msg.quant);
	let a1 = Number(heartcountels[1].textContent);
	let b = heartcountels[1].textContent = n1 + a1;
	let cd = Number.parseFloat(b*0.10).toFixed(2);
	dohod.textContent =  cd;
	payoutamountid.value = cd;
	
}


	let orderform = document.forms.ordertodo;
	const mypayoutform = document.forms.mypayoutform;
	
	orderform.addEventListener('submit', pay, false);
	mypayoutform.addEventListener('submit', onpayoutsubmit, false);

//const api_url = "https://api.yookassa.ru/v3/payments";
var sukasuka="10";
function pay(el){
	/*
	el.preventDefault();
	let dcount = sukasuka
	let damount = el.target.count.value;
	let userid = el.target.userid.value;
	let nick = el.target.nick.value;
	if(!nick || !userid || !damount || !dcount){
		note({ content: "No data", type: "error", time: 5 });
		return;
	}
	
	let d = {};
	d.dcount = dcount;
	d.damount = damount;
	d.nick = nick;
	d.userid = userid;
	vax('post','/pay/api/getPayUrl', d, on_get_payurl, on_payurl_error, el.target, false);
	el.target.className = "puls";
	*/ 
}


function dodo(el){
	//alert(el.getAttribute('data-count'));
	sukasuka = el.getAttribute('data-count');
	let a = document.querySelector(".mechecked");
	if(a)a.className="";
	let b = el.getAttribute('id');
	let c = document.querySelector("label[for="+b+"]");
	if(c)c.classList.toggle("mechecked");
}
function on_get_payurl(l, el){
	el.className = "";
	if(l.error){
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	console.log(l.message);
	window.location.href=l.message;
	//note({ content: l.message, type: "info", time: 5 });
}
function on_payurl_error(l, el){
	el.className = "";
	note({ content: l.message, type: "error", time: 5 });
}
 function getPayout(el){
	panelOpen();
 }

function onpayoutsubmit(ev){
	ev.preventDefault();
	let d = {};
	d.account = ev.target.payoutaccount.value;
	d.amount = ev.target.payoutamount.value;
	if(Number(d.amount) == 0){
		note({ content: "Нечего", type: "warn", time: 5 });
		return;
	}
	//alert(d.amount);
	
	d.label = ev.target.label.value;
	vax(ev.target.method, ev.target.action, d, on_payout, on_get_payout_error, ev.target, false);
	ev.target.className = "puls";
	ev.target.disabled = true;
}

function on_payout(l, el){
	el.className = "";
	el.disabled = false;
	if(l.error){
		alert(l.message);
		note({ content: l.message, type: "error", time: 5 });
		return;
	}
	note({ content: l.message, type: "info", time: 5 });
	window.reload();
}
function on_get_payout_error(l, ev){
	ev.disabled = false;
	ev.className = "";
	note({ content: l, type: "error", time: 5 });
}
