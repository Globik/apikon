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
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	 wsend({ type: "helloServer", userId: gid("userId").value });
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
	startbtn.textContent = "start";
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
        case 'write':
   //  if(!tr){
        printmsg2.className='write';
        printmsg.className="write";
	//}
		tr=setTimeout(function(){
			printmsg2.className='';
			printmsg.className="";
			clearTimeout(tr);
			tr = undefined;
		}, 1000);
	
        break;
       case 'unwrite':
        printmsg2.className='';
        printmsg.className="";
        break;
        case 'connected2':
        connects.textContent = msg.size;
        break;
        case 'dynamic':
        handleDynamic(msg);
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
function  handleMessage(msg){
	printmsg2.className="";
	printmsg.className="";
	let div=document.createElement('div');
	let div2=document.createElement('div');

		div.className="yourmsg he2";
		div.innerHTML="<span><b>Собеседник: </b></span><br><span>"+ esci(msg) + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		
mobileChat.className="";


textarea2.className="";

		div2.className="yourmsg2 he";
		div2.innerHTML="<span><b>Собеседник: </b></span><br><span>"+ esci(msg) + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		
}

function handleHangUp(){
	//alert("hongup");
	 printmsg2.className='';
     printmsg.className="";
    // let ss = unsubscribe?false:false;
    let amma=[[0,{}]]
    if(IPS.size > 0)amma = IPS;
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
	
	el.textContent = "stop";
		}).catch(handleError);
}
}else{
	el.setAttribute("data-start", "no");
	el.textContent = "start";
	el.className = "start";
	
	unsubscribe = false;
	if(window.streami){
		local.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
}
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
		  printmsg2.className='';
        printmsg.className="";
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
		duka2.className="";
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
	function sendi(event){
		 let l=event.getAttribute("data-send");
		//uuu
		
		if(l=="one"){
				
			if(!txtvalue.value) return;
				let div=document.createElement('div');
				 printmsg2.className='';
        printmsg.className="";
		div.className="yourmsg";
		div.innerHTML="<span class='you2'><b>Вы: </b></span><br><span>"+ txtvalue.value+ "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		wsend({type:"message", data: txtvalue.value});
		txtvalue.value="";
	}else if(l=="two"){
		 printmsg2.className='';
        printmsg.className="";
		if(!txtvalue2.value) return;
			let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>Вы: </b></span><br><span>"+ txtvalue2.value+ "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		wsend({type:"message", data: txtvalue2.value});
		txtvalue2.value="";
	}
}
	
	
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
       printmsg2.className='';
        printmsg.className="";
         polite = true;
 makingOffer = false;
 ignoreOffer = false;
 isSettingRemoteAnswerPending = false;
 partnerId = null;
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
	



