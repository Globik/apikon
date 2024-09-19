var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var kK = 0;
var sock = null;
var pc = null;
var MYIP = '23.23.22.35';
var HELP = 0;
var connectionState = "closed";
var mobChat = false;
var isOpen = false;
var PSENDER = false;
var F = false;
//var VK_USER = false;
var isShow = false;
var someInterval;
var OPENCLAIM = false;
var videoInput1, videoInput2;
const IPS = new Map();
var partnerId;
var MYSOCKETID = null;
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
const L = function(){ return Lang.value; }
const heartcountels = document.querySelectorAll("div.heartcount");
var context = new (window.AudioContext || window.webkitAudioContext)();
var notes = new Sound(context);
var nows = context.currentTime;
var tru;
const streamvideo = remote.captureStream();
var partnernick;
var partnerpremium="n";

//const recorder = new MediaRecorder(streamvideo, {mimetype:'video.webm'})
const G = function(){
	return Number(Grund.value);
}
function getPubId(){
	let a = gid('publishedid');
	if(!a)return;
	return a.value == 'null'?false:true;
}
var publishedId = getPubId()?gid('publishedid').value:null;

function toggleCam(el){

	if(window.streami){
			if(Prem.value == "n" && Brole.value !="admin"){
		window.location.href = "#gopremium";
		panelOpen();
		return;
	}
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
window.streami = undefined;
	local.srcObject = null;

	}else{
		let s = L()=='ru'?"Нажми на старт-то!":L()=='en'?'First press "start"':
		L()=='zh'?'首先按“开始”':
		L()=='id'?'Tekan pertama "mulai"':'';
		note({ content: s, type: "warn", time: 5 });
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
note({ content: "Your browser navigator.mediaDevices not supported", type: "warn", time: 5 });
}else{
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function(err){console.error(err)});
}
}

getDevice();
function ozenite(el){
	panelOpen();
}
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
		let s = L()=="ru"?"ОК. Добавили в игнор.":L()=='en'?"OK, added to ignore.":
		L()=='zh'?'好的，添加忽略。':
		L()=='id'?'Oke, ditambahkan untuk mengabaikan':'';
		note({ content: s, type: "info", time: 5 });
	}else if(d == "claim"){
		let s = L()=="ru"?"Спвсибо, модератор рассмотрит вашу жалобу.":
		L()=='en'?"Thanks, the moderator will look at your abuse":
		L()=='zh'?'谢谢，版主会看看你的滥用行为':
		L()=='id'?'Terima kasih, moderator akan melihat penyalahgunaan Anda':'';
		note({ content: s, type: "info", time: 5 });
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
function checkMonth(){
	let monthmilliseconds = 2592000000;
	let heute = Date.now();
	let mon = Mon.value;
	if(mon=="null")return;
	let mon2 = Number(mon)
	//alert(mon2);
	let ab = heute - mon2;
	if(ab < monthmilliseconds){
		//alert("premium account!");
	}else if(ab > monthmilliseconds){
		//alert("not a premium account");
		if(Login()){
			let d = {};
			d.usid = userId.value;
			vax('post','/api/removePremium', d, on_remove_prem, on_remprem_error, null, false);
		}
	}
}
checkMonth();
	function on_remove_prem(l, v){}
	function on_remprem_error(){};

function setSignal(){
	//alert("aha");
	//vax('post','/api/setDonation', { nick: NICK }, function(l, v){}, function(l, v){}, null, false);
	//document.removeEventListener('visibilitychange', newev);
}
//window.onpagehide=function(){alert('open')}
function get_socket() {
	/* if(NICK == "anon" || NICK == undefined){
		// sock.close();
		let s = L()=="ru"?"Залогиньтесь!":L()=='en'?"You should log in!":
		L()=='zh'?'您应该登录！':
		L()=='id'?'Anda harus masuk':'';
		 note({content: s, type: "warn", time: 5 });
		 location.href="#login";
	const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
		  return;
	  }}*/
	//  alert(ifEnter());
	/*
	if(ifEnter() && Brole.value !="admin"){
		window.location.href='#purchaseHREFI';
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
	window.onhashchange = null;
}
*/ 
 if(!sock) sock = new  WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
	 console.log("websocket opened");
	// heartbeat();
	 wsend({ type: "helloServer", userId: gid("userId").value?gid("userId").value:'anon', isprem: Prem.value, nick: userName.value, logged:  Login()?"yes":"no", LANG: L });
  };
  sock.onerror = function (e) {
   // note({ content: "Websocket error: " + e, type: "error", time: 5 });
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
	 // clearTimeout(pingTimeout);
    sock = null;
    let s = L()=="ru"?"Соединение с сервером закрыто!":L()=='en'?"Websocket closed!":
    L()=='zh'?'Websocket 已关闭':
    L()=='id'?'Soket web ditutup':'';
   // note({ content: s, type: "info", time: 5 });
    console.log('socket closed');
    closeAll(startbtn);
  };
}





var tr = undefined;
//get_socket();
var pingTimeout;
/*
function heartbeat(){
	clearTimeout(pingTimeout);
	pingTimeout = setTimeout(function(){
		sock.close();
	}, 3000+5000);
}*/
function on_msg(msg) {
	//console.log("data type: ", msg.type);
	 switch (msg.type) {
		 case 'pick':
		// heartbeat();
		 wsend({type:'pock'});
		 break
		 case 'helloServer':
		
		MYSOCKETID = msg.socketId;
		 break
      case 'online':
        onlineCount.textContent = msg.online
        break
      case 'new-ice-candidate':
        handleNewIceCandidate(msg.data)
        break
      case 'video-offer':
       console.warn(msg.vip, " ", msg.partnerId,msg.nick,msg.isprem);
       console.log("your id: ", userId.value, "partner id ", msg.partnerId);
       // claimMenu.setAttribute("data-vip", msg.vip);
       claimMenu.setAttribute("data-vip", msg.partnerId);
       partnernick = msg.nick;
       //alert(msg.nick);
      partnerpremium = msg.isprem;
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
      // partnernick = msg.nick;
      //   partnerpremium = msg.isprem;  
        console.warn('video answer ', msg.nick, msg.isprem);
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
   //    alert(msg.isprem+' '+msg.nick);
        console.log(msg.vip, " nick ", msg.partnerId,msg.nick);
        partnerId = msg.partnerId;
        partnernick = msg.nick;
        partnerpremium = msg.isprem;  
        console.log("your id: ", userId.value, "partner id ", msg.partnerId, ' ',msg.nick, msg.isprem);
       // claimMenu.setAttribute("data-vip", msg.vip);
        claimMenu.setAttribute("data-vip", msg.partnerId);
       // let a3 = checkIp(msg.vip);
        let a3 = checkIp(msg.partnerId);
        console.warn("a3", a3);
        if(!a3){
			console.warn("was isch");
		handlePeerMatched();
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
        case "messagepublished":
       // alert('publish');
        insertPublished(msg);
        break
        case 'gift':
        handleGift(msg);
        break
        case 'gift2':
        handleGift2(msg);
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
        MYIP = msg.vip;
        case 'media':
      //  goMedia(msg);
        break;
      default:
      goMedia(msg);
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
			div.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + msg + "</span>";
		}else{
		div.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		
mobileChat.className="";


textarea2.className="";

		div2.className="yourmsg2 he";
		if(bool){
			div2.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + msg + "</span>";
		}else{
		div2.innerHTML="<span><b>" + (L()=='ru'?'Собеседник':L()=='en'?'Partner':L()=='zh'?'伙伴':L()=='id'?'mitra':'') + ": </b></span><br><span>" + esci(msg.trim()) + "</span>";
	}
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		
}

function insertPublished(obj, bool){
	znakPrint.classList.add("hidden");
	znakPrint2.classList.add("hidden");
	let div=document.createElement('div');
	div.className="msg-publish";
	if(obj.sub){
		
			div.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + obj.data + "</span>";
		}else{
			
		div.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + esci(obj.data.trim()) + "</span>";
	}
	
		chatbox2.appendChild(div);
		mobileChat.className="";
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		textarea2.className = "";
		
		
		let div2=document.createElement('div');
	div2.className="msg-publish";
	if(obj.sub){
		
			div2.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + obj.data + "</span>";
		}else{
			
		div2.innerHTML="<span><b>" + obj.from + ": </b></span><br><span>" + esci(obj.data.trim()) + "</span>";
	}
	
		chatbox.appendChild(div2);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
}




function fuckMessage(msg){
	//mobile
	let div2=document.createElement('div');
	div2.className="yourmsg2 he";
    div2.innerHTML="<span><b>Собеседник: </b></span><br><span>" + msg + "mobile?</span>";
}
function handleHangUp(){
	
	 //printmsg2.className='';
     //printmsg.className="";
     znakPrint.classList.add("hidden");
     znakPrint2.classList.add("hidden");
    // let ss = unsubscribe?false:false;
    let amma=[[0,{}]]
    if(IPS.size > 0)amma = IPS;
  //  console.warn("giftsContainer.className ", giftsContainer.className);
    //giftsContainer.className="";
    console.log("before next");
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
				wsend({type: 'video-answer', isprem:Prem.value,nick:userName.value, vip: someIp, data: pc.localDescription /*, target: from, from: clientId*/});
				
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
		wsend({'type': 'video-offer', nick: userName.value, isprem: Prem.value, vip: someIp, data: pc.localDescription/*, target: target, from: clientId*/});
	//}).
	}catch(err){
		console.error(err);
		makingOffer=false;
	}finally{
	//	makingOffer = false;
	}

 }
 
 let constraints = { audio: true, video: true };
 
var DURATION = 0;
var dtimer;
var imgdata2;
function pl(){
	return;
var nows = context.currentTime;
	console.log(notes);
	notes.play(261.63, nows);
	//notes.stop();
}


function gettypes(){
	const posst = [
	'video/webm;codecs=vp9,opus',
	'video/webm;codecs=vp8,opus',
	'video/webm;codecs=h264,opus',
	'video/mp4;codecs=h264,aac'
	]
	return posst.filter(mimeType =>{
		return MediaRecorder.isTypeSupported(mimeType);
	});
}

var brows = adapter.browserDetails.browser;
console.log(brows);
var vers = adapter.browserDetails.version;
console.log(vers);
//debug("<b>Your browser, version:</b> " + brows + " " + vers);
console.log("<b>Your browser, version:</b> " + brows + " " + vers);
function on_check_banned(){}
function on_check_banned_error(){}

function start(el){
	
	 if(NICK == "anon" || NICK == undefined){
		let s = (L()=="ru"?"Залогиньтесь!":L()=='en'?"Please log in":L()=='zh'?'请登录':L()=='id'?'Silahkan masuk':'')
		 note({content: s, type: "warn", time: 5 });
		 return;
	  }
	if(!sock) {
		get_socket();
		}
	if(G() == 1 || G() == 2){
		window.location.href = "#banned";
	
		return;
	}
	if(VK_USER) return;
	let sdata = {};
	sdata.myip = MYIP;
	sdata.usid = userId.value;
	vax('post','/api/checkBanned', sdata, on_check_banned, on_check_banned_error, null, false);
	
	
	if(el.getAttribute("data-start")=="no"){
	//	pl();
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
	
	
	
	
	navigator.mediaDevices.getUserMedia(constraintsi).then(async function(stream){

	
	local.srcObject = stream;	
	window.streami = stream;
el.textContent = L()=="ru"?"стоп":L()=='en'?"stop":L()=='zh'?'停止':L()=='id'?'berhenti':'';
	el.setAttribute("data-start", "yes");
	el.disabled = false;
	el.className = "stop";
	
	//	makeRecord(stream);
	




		}).catch(handleError);
}
}else{
	
	closeAll(el);
	

}
}
//if(Login())start(startbtn);
 function mama(e){
	e.preventDefault();
	e.returnValue = 'suka';
	if(window.recorder.state == 'recording')window.recorder.stop();
}

var allChunks = [];
var bubu;
function makeRecord(stream){
	
	if(MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus')){
		bubu = 'video/webm;codecs=h264,opus';
	}else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')){
		bubu = 'video/webm;codecs=vp9,opus';
	}else{
		bubu = 'video/webm;codecs=vp8,opus';
	}
	
	let aaa = gettypes();
	console.log('aaa ', aaa);
	var recorder = new MediaRecorder(stream, { mimeType: bubu });
	window.recorder = recorder;
	recorder.start();
		setTimeout(function(){
		imgdata2 = Screenshota();
	},0)

	
	recorder.ondataavailable = dataAvailable; 
	recorder.onstop = onStop;
	recorder.onstart = recordStart; 
	recorder.onerror = recordError;
}	

 function recordStart(){
		dtimer = setInterval(function(){
			DURATION++;
			if(DURATION == 11) {
				window.recorder.stop();
		}
		}, 1000);
		console.log('state ', recorder.state)
	//	window.addEventListener('beforeunload', mama, false)
	}

function recordError(e){
		console.error(e);
		window.removeEventListener('beforeunload', mama);
	}
function dataAvailable(e){
	console.log('dataavailable ', e.data);
	if(e.data.size > 0) {
		allChunks.push(e.data);
		}
	}
 async function onStop(){
		try{
			clearInterval(dtimer);
		const fullBlob = new Blob(allChunks, { bubu });
		allChunks = [];
		let b11;let blo;
		if(imgdata2){
		b11 = imgdata2.split(',')[1];
    
		//alert(b11);
		blo = base64ToBlob(b11, 'image/jpg');
	}
		const f = new FormData();
		console.log('fuulblob ', fullBlob);
		f.append('video', fullBlob, userId.value + '.webm');
		f.append('thumbnail', blo, userId.value + '.jpg');
		f.append('duration', DURATION);
		f.append('userId', userId.value);
		f.append('username', userName.value);
		f.append('codec', bubu);
		DURATION = 0;
		
		const turl = "/api/filesupload";
		let r = await fetch(turl, {method: 'POST', body: f});
		let fd = await r.json();
		console.log(fd);
		window.removeEventListener('beforeunload', mama);
	}catch(e){
		console.error(e);
		note({content: e.toString(), type: "error", time: 5 });
		}
	}

function base64ToBlob(base64String, contentType = '') {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: contentType });
}
function closeAll(el){
	if(tru)tru.mode = "disabled";
    //{tru2.mode = "hidden";
	el.setAttribute("data-start", "no");
	el.textContent = L()=="ru"?"старт":L()=='en'?"start":L()=='zh'?'开始':L()=='id'?'awal':'';
	el.className = "start";
	 //onlineCount.textContent = 0;
     camsCount.textContent = "0";
     connects.textContent = "0";
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
 
 if(window.recorder && window.recorder.state == 'recording')window.recorder.stop();
 //const fullBlob = new Blob(allChunks,{ type:'video/mp4'});
 //const link = document.createElement('a');
 //link.style.display = 'none';
 //const downloadurl = window.URL.createObjectURL(fullBlob);
 //link.href = downloadurl;
 //link.dowload = 'media.mp4';
// document.body.appendChild(link);
// link.click();
// link.remove();
 
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
	
	function Screenshota() {
		//return new Promise(function(rej,res){
	//alert('Screenshot2()');
	if(!local.srcObject) return
    let cnv2 = document.createElement('canvas');
    let w = 300;
    let h = 300;
    cnv2.width = w;
    cnv2.height = h;
    let c = cnv2.getContext('2d');
  
   // c.drawImage(local, 0, 0, w, h);
    
   // cnv2.remove();
   // alert('d2 '+imgdata2);
   // return imgdata22;
    let cropx = 0;
		let cropy = 0;
		const aspectratio = local.videoWidth / local.videoHeight;
		if(aspectratio > 1){
			const scaledwidth = local.videoWidth / aspectratio;
			cropx =(local.videoWidth - scaledwidth) / 2;
			c.drawImage(local, cropx, cropy, scaledwidth, local.videoHeight, 0, 0, cnv2.width, cnv2.height);
			//alert(img.width + ' ' + img.height)// 320x240
			//alert(aspectratio)// landshaft
		}else{
			// portrait
			const scaledheight = local.videoHeight * aspectratio;
			cropy = (local.videoHeight - scaledheight) / 2;
			c.drawImage(local, cropx, cropy, local.videoWidth, scaledheight, 0, 0, cnv2.width, cnv2.height)
			//alert(2)

}
var imgdata22 = cnv2.toDataURL('image/jpeg', 0.95);
return imgdata22;
//cnv2.toBlob(function(b){
	//res(b);
//},'image/jpeg',0.95)
//})
}
	local.onloadedmetadata = function () {
		//let a = MediaRecorder.isTypeSupported('video/webm');
		//alert(a);
		setTimeout(function(){
	var imgdata3=Screenshota();
	wsend({type:"telegascreenshot",nick:(NICK?NICK:'Anonym'), src: imgdata3});
	}, 4000);
	//	notes.play(261.63, nows);
		console.log("local onloaded");
		if(isShow)return;
		setTimeout(function(){
		let imgdata = Screenshot();
//	alert('d4 '+imgdata);

		let amap=[['0',{}]];
	if(IPS.size > 0) amap = IPS;
	console.error("amap", amap, IPS);
		wsend({ type:'search-peer', nick: (NICK?NICK:'Anonym'), src: imgdata , ignores: [...IPS] });
	}, 0);
	someInterval = setInterval(doScreenshot, 1000);
		somespinner.className="show";
		mobileloader.className="active";
		duka2.className="show";
	}
	
	
	remote.onloadedmetadata = function (ev) {
	//	recorder.start();
		
		if(PSENDER){
			console.log("PSENDER!****");
			return;
		}
		console.log("remote onloaded");
		nextbtn.disabled = false;
		somespinner.className="";
		somehello.className="see";
		mobileloader.className="";
		
		//mobileChat.className = "";
		hideChat();
		duka2.className="";
		CONNECTED = true;
		
 tru=ev.target.addTextTrack("captions", "Titles", "ru");
   tru.mode="showing";
   let cue=new VTTCue(0.0,100090.9, partnernick + '  '+ (partnerpremium=="y"?'👑':''));
   cue.snapToLines=false;
   cue.lineAlign='center';
   //cue.vertical="rl"
  cue.positionAlign='center';
  cue.position=50;
   cue.size="100";
  //cue.activeCues[0].line=-4;
  
   cue.align="end";// start end 
  
  // console.log(cue.getCueAsHTML());
   tru.addCue(cue);
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
		 let l2 = txtvalue2.getAttribute("data-publish");
		 let l3 = txtvalue.getAttribute("data-publish");
		 if(l2 && l2 == "publish" && l == "two"){
			 //alert(l2);
			 let s4 = txtvalue2.value.trim();
			 if(!s4)return;
			 sendiTwoTwo();
			 return;
		 }else if(l3 && l3 == "publish" && l == "one"){
			  let s5 = txtvalue.value.trim();
			 if(!s5)return;
			 sendiTwoThree();
			 return;
		 }
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
		div.innerHTML="<span class='you2'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + n.msg + "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
	}else{
		let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + n.msg + "</span>";
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
		div.innerHTML="<span class='you2'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + esci(txtvalue.value.trim()) + "</span>";
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
		if(!txtvalue2.value) return;
			let div2=document.createElement('div');
		div2.className="yourmsg2";
		div2.innerHTML="<span class='you'><b>" + (L()=="ru"?"Вы":L()=='en'?"You":L()=='zh'?'你':L()=='id'?'Anda':'') + ": </b></span><br><span>" + esci(txtvalue2.value.trim()) + "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		wsend({type:"message", data: txtvalue2.value});
		txtvalue2.value="";
	}
	
	function sendiTwoTwo(){
		         znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
      if(!txtvalue2.value) return;
		
		console.log('publishedId: ', publishedId);
		wsend({ type: "messagepublished", data: txtvalue2.value, publishedId: publishedId, from: userName.value });
		txtvalue2.value="";
	}
	
	function sendiTwoThree(){
		znakPrint.classList.add("hidden");
      znakPrint2.classList.add("hidden");
      if(!txtvalue.value) return;
		
		console.log('publishedId: ', publishedId);
		wsend({ type: "messagepublished", data: txtvalue.value, publishedId: publishedId, from: userName.value });
		txtvalue.value="";
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


window.addEventListener("offline", function(e) {
	console.log('ofline');
  note({ content: "offline", type: "warn", time: 5 });
});
//note({ content: "online " + navigator.onLine, type: "info", time: 5 })
window.addEventListener("online", function(e) {
  console.log("online");
  note({ content: "online", type: "info", time: 5 });
});

//notes.play(261.63, nows);
   function next(el, bool, ignores, isIgnore){
	   //next(nextbtn, false, amma, false);
	   //pl();
	   if(HELP == 3){
		//   window.location.href="#helproject";
		if(vkBridge){
			vkBridge.send('VKWebAppShowBannerAd',{banner_location:'top'})
			.then(data=>{
				if(data.result){
					console.log('reklama');
				}
			}).catch(err=>{
				console.error(err);
			});
		}
	   }
	   HELP++;
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
    // note({content: "Failed! Press stop, then start", type: "warn", time: 5 });
    next(nextbtn, false, false, false);
     break;
    case 'disconnected':
    CONNECTED = false;
    console.log('ice disconnected');
    next(nextbtn, false, false, false);
   // note({content: "Временная потеря сигнала ", type: "warn", time: 10 });
  if(navigator.onLine){
	 // wsend({type: "hang-up", ignore: [[0,{}]], sub: "abrupt" });
	 // next(nextbtn, false, false, false);
   }else{
	   
	// if(sock)  sock.close();
	// closeAll(startbtn);
   }
      break;
  }
}

function iceGatheringStateChangeHandler (event) {
	// todo ???? hangs up on complete
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
 // alert('videocall');
console.log("PC*** ")
  if (!pc) {
	  console.log("!pc return");
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
		console.log("track stop");
		if(tru)tru.mode = "disabled";
    
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
    let w = 80;
    let h = 50;
  // cnv.width = w;
   // cnv.height = h;
    let c = cnv.getContext('2d');
    var ww = local.videoWidth;
    var hh = local.videoHeight;
     cnv.width = ww;
    cnv.height = hh;
    c.drawImage(local, 0, 0, ww, hh);
    var imgdata = cnv.toDataURL('image/jpeg', 1.0);
    cnv.remove();
    return imgdata;
    
}
 
/*
window.addEventListener('beforeunload', function(e){
	e.preventDefault();
	e.returnValue = 'suka';
	console.log('X ', 1+1);
})
window.onunload = function(e){
	//e.preventDefault();
	console.log('unload');
}*/
  function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		if(sock.readyState == WebSocket.OPEN)sock.send(d);
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

if(giftbox2)giftbox2.addEventListener('click', openGiftBox, false);
if(giftbox)giftbox.addEventListener('click', openGiftBox2, false);
if(giftsContainer)giftsContainer.addEventListener('click', ongiftscontainer, false);
if(giftsContainer2)giftsContainer2.addEventListener('click', ongiftscontainer2, false);

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
	if(giftsContainer2)giftsContainer2.classList.toggle("hidden");
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
		//if(!giftsContainer.classList.contains("hidden")){
		//	giftsContainer.classList.add("hidden");
		//}
		
		//if(!giftsContainer2.classList.contains("hidden")){
			//giftsContainer2.classList.add("hidden");
		//}
	}
	const dohod=gid('dohod');
	const payoutamountid = gid("payoutamountid");
	
function onHeartClick(ev){
	//alert(1);
	let y = playContainer.getAttribute("data-state");
	if(y == "published"){
		console.log("Cебе ты не можешь сердечки дарить");
		return;
	}
	if(!CONNECTED){
		let s = (L()=="ru"?"Никого нет!":"There is no one! ")
		note({ content: s, type: "info", tyme: 5 });
		return;
	}
	
	if(!Login()){
		window.location.href="#login";
		return;
	}
	let quant;let g;
	if(heartcountels){
	for(var i = 0; i < heartcountels.length; i++){
		let heartcount = heartcountels[i];
		let n = Number(heartcount.textContent);
		if(n <= 0){
			//note({ content: "Недостаточно средств!", type: "info", time: 5 });
			window.location.href = '#purchaseHREFA'
			return
		}else{
		 quant = n - 1;
		 g = "heart";
		heartcount.textContent = quant;	
		let cc = Number.parseFloat(quant*0.10).toFixed(2);
		if(dohod)dohod.textContent =  cc;
		 payoutamountid.value = cc;
		}
	}
}
	processHeart({ g: g, quant: 1 }, ev);
}

function processHeart(n, ev){
	let yy = playContainer.getAttribute("data-state");
	if(yy == "subscribed"){
		//console.log("");
		wsend({ type: "messagepublished", sub: "gift", quant: n.quant, data: `Послал в подарок ${n.g=='heart'?'сердечко &#x1f496':''}`, publishedId: publishedId, from: userName.value,
			istestheart: (isTestHeart.value=="true"?true:false) });
		return;
	}
			wsend({ type: "gift", gift: n.g, quant: n.quant, from_id: userId.value, from_name: userName.value, to_id: partnerId, 
				istestheart: (isTestHeart.value=="true"?true:false) });
				//wsend({ type: "messagepublished", data: txtvalue.value, publishedId: publishedId, from: userName.value });
			let str = L()=="ru"?`Послали в подарок ${n.g=='heart'?'сердечко &#x1f496':''}`:
			L()=='en'?`You've sent as a gift ${n.g=='heart'?'heart &#x1f496':''}`:
			L()=='zh'?`您已作为礼物发送 ${n.g=='heart'?'心 &#x1f496':''}`:
			L()=='id'?`Anda telah mengirimkannya sebagai hadiah ${n.g=='heart'?'jantung &#x1f496':''}`:''
			console.warn(str);
			let l = ev.target.getAttribute("data-type");
			//alert(l);
			
			insertMessage({ type: l, msg: str });
		}
		
		
		function purchaseTokens(el){
			panelOpen();
			if(!Login()){
		window.location.href="#login";
		return;
	}
			window.location.href = "#purchaseHREFA";
		}
		
function handleGift(msg){
	if(!heartcountels) return;
	console.log(msg);
	let s = (L()=="ru"?`Подарили в подарок сердечко &#x1f496`:L()=='en'?`You've gifted a heart &#x1f496`:
	L()=='zh'?'你赠予了一颗心 &#x1f496':
	L()=='id'?'kamu telah menghadiahkan hati &#x1f496':'')
	handleMessage(s, true);
	let n = Number(msg.quant);
	let a = Number(heartcountels[0].textContent);
	heartcountels[0].textContent = n + a;
	let n1 = Number(msg.quant);
	let a1 = Number(heartcountels[1].textContent);
	let b = heartcountels[1].textContent = n1 + a1;
	let cd = Number.parseFloat(b*0.10).toFixed(2);
	if(dohod)dohod.textContent =  cd;
	payoutamountid.value = cd;
	
}
function handleGift2(msg){
	if(!heartcountels) return;
	console.log(msg);
	let n = Number(msg.quant);
	let a = Number(heartcountels[0].textContent);
	heartcountels[0].textContent = n + a;
	let n1 = Number(msg.quant);
	let a1 = Number(heartcountels[1].textContent);
	let b = heartcountels[1].textContent = n1 + a1;
	let cd = Number.parseFloat(b*0.10).toFixed(2);
	if(dohod)dohod.textContent =  cd;
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
	 if(!dohod)return;
	panelOpen();
	if(!Login()){
		window.location.href = "#login";
		return;
	}
	if(Number(dohod.textContent) == 0 || Number(dohod.textContent == 0.00)){
		note({ content: "Нечего и минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		//alert("Нечего и минимум 1000 рублей на вывод накопить");
		return;
	}
	if(Number(dohod.textContent) <=1000 || Number(dohod.textContent <= 1000.00)){
		note({ content: "Минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		//alert("Минимум 1000 рублей на вывод накопить");
		return;
	}
	window.location.href = "#vivest"
 }
function Login(){
	if(isLogin.value == 'true'){
		return true;
	}else{
		return false;
	}
}
function onpayoutsubmit(ev){
	ev.preventDefault();
	let d = {};
	d.account = ev.target.payoutaccount.value;
	d.amount = ev.target.payoutamount.value;
	if(Number(d.amount) == 0 || Number(d.amount == 0.00)){
		note({ content: "Нечего и минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		alert("Нечего и минимум 1000 рублей на вывод накопить");
		return;
	}
	if(Number(d.amount) <=1000 || Number(d.amount <= 1000.00)){
		//note({ content: "Минимум 1000 рублей на вывод накопить", type: "warn", time: 10 });
		alert("Минимум 1000 рублей на вывод накопить");
		return;
	}
	if(!Login()){
		window.location.href = "#login";
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
		//alert(l.message);
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
function getInvoice(el){
	let d={};
	let a = localStorage.getItem("invoice");
	d.userid = userId.value;
	//alert('inv '+ a);
	if(a)d.inv = a;
	vax("post", "/api/getInvoice", d, on_getInvoice, on_getInvoice_error, el, false);
	el.disabled = true;
	el.classList.add("puls");
}
let btcaddress = document.querySelector(".btcaddress");
function on_getInvoice(l,el){
	console.log(l);
	el.classList.remove("puls");
	if(l.error){
		//alert(l.error);
		console.error(l.error);
		note({content:l.error, type:"error", time: 5 });
		return;
	}
	btcaddress.innerHTML = `<br><br><b>${L()=='ru'?'Биткоин адрес':'Bitcoin address'}</b><br><br><span class="btcspan"><a id="btca" href="bitcoin:${l.btcad}">${l.btcad}</a></span> | <button id="copybtn" onclick="copy(this);">copy</button>`;
	//alert('here inv '+l.inv);
	localStorage.setItem("invoice", l.inv);
} 

function copy(){
	const btca = document.querySelector("#btca");
	if(!btca)return;
	navigator.clipboard.writeText(btca.textContent).then(function(){
		//note({ content: "OK, copied!", type: "info", time: 5 });
		alert("Ok, copied");
	}, function(err){
		//alert(err);
		
		console.log(err);
	});
}

function on_getInvoice_error(l,v){
	//alert(l);
	console.log(l);
	v.classList.remove("puls");
	v.disabled = false;
	
}
