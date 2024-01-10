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
local.srcObject = null;
remote.srcObject = null;
var F = false;
var isShow = false;

var videoInput1, videoInput2;

function toggleCam(el){
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
	 let videoTrack = stream.getVideoTracks()[0];
	   var sender = pc.getSenders().find(function(s) {
        return s.track.kind == videoTrack.kind;
      });
      
      sender.replaceTrack(videoTrack).then(function(){
		  
	  }).catch(handleError);
	 
	 
	}).catch(handleError)
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
			}else{
				
				settingspanel.className = "";
				isOpen = false;
			}
		}


if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}

function get_socket() {
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
var tr = undefined;
get_socket();
function on_msg(msg) {
	console.log("data type: ", msg.type);
	 switch (msg.type) {
      case 'online':
        onlineCount.textContent = msg.online
        break
      case 'new-ice-candidate':
        handleNewIceCandidate(msg.data)
        break
      case 'video-offer':
        handleVideoOffer(msg.data)
        break
      case 'video-answer':
        handleVideoAnswer(msg.data)
        break
      case 'hang-up':
        handleHangUp()
        break
      case 'peer-matched':
        handlePeerMatched()
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
      default:
        break
    }
	
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
	next(nextbtn);
}

function handleNewIceCandidate (msg) {
  console.log('ice cand: ', msg);
	if(pc){
		//var cand = new RTCIceCandidate(msg);
		pc.addIceCandidate(msg).then(function(){
			
		}).catch(handleError);
	}

}
 function handleVideoOffer(msg){
	 console.log('handle video offer ', msg);
	 createPeerConnection();
	pc.setRemoteDescription(msg).then(function(){
		return pc.createAnswer().then(function(answer){
			return pc.setLocalDescription(answer).then(function(){
				wsend({type: 'video-answer', data: pc.localDescription /*, target: from, from: clientId*/});
				// state.socket.emit('video-answer', state.peerConnection.localDescription)
			});
		});
	}).catch(handleError);
 }
 
 function handleVideoAnswer(msg){
	 	pc.setRemoteDescription(msg).then(function(){
			
		}).catch(handleError);
 }
 
 const offerOpts = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
 function handlePeerMatched(){
	// vvstate.socket.emit('video-offer', state.peerConnection.localDescription)
	 createPeerConnection();
    
    
	//someCodec();
	//changeVideoCodec('video/VP9');
	pc.createOffer(offerOpts).then(function(offer){
		return pc.setLocalDescription(offer);
	}).then(function(){
		
		wsend({'type': 'video-offer', data: pc.localDescription/*, target: target, from: clientId*/});
	}).catch(handleError);

 }
 
 let constraints = { audio: true, video: true };

function start(el){
	if(!sock) {
		get_socket();
		}
	if(el.getAttribute("data-start")=="no"){
		
		el.disabled = true;
			document.body.click();
		if(local.srcObject==null){
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
	
	
	if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});
}
window.streami = undefined;
	local.srcObject = null;
	
	closeVideoCall();
	wsend({type: "hang-up"});
	el.disabled = false;
	nextbtn.disabled = true;
	local.style.backGround="rgba(0,0,0,0);"
	if(sock) sock.close();
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
}
}

function handleError(err){
		note({"content": err, type: "error", time: 5});
	}
	local.onloadedmetadata = function () {
		console.log("local onloaded");
		if(isShow)return;
		wsend({ type:'search-peer', nick: (NICK?NICK:'Anonym') });
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
	
	
	  var iceServers = {"iceServers": [ 
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
  
   function next(el){
	   el.disabled = true;
     // this.closePeerConnection()
    //  this.hangUpCall()
    //  this.createPeerConnection()
    //  this.addLocalStream(this.localStream)
      closeVideoCall();
      wsend({type: "hang-up"});
      wsend({type:'search-peer', nick: (NICK?NICK:"Anon") });
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
     // el.disabled=true;
       printmsg2.className='';
        printmsg.className="";
        
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
    case 'complete':
      connectionState = 'open'
      break
    case 'closed':
    case 'failed':
    case 'disconnected':
    // и вот тут бы сигнал на сервер послать, что, мол, готов к приятию другого собеседника
  //  rootState.socket.emit('search-peer');
     closeVideoCall();
       printmsg2.className='';
        printmsg.className="";
      break
  }
}

function iceGatheringStateChangeHandler (event) {
  console.log('*** ICE gathering state changed to: ' + event.target.iceGatheringState)
}

function signalingStateChangeHandler (event) {
  console.log('*** WebRTC signaling state changed to: ' + event.target.signalingState)

  switch (event.target.signalingState) {
    case 'closed':
     closeVideoCall()
      break
  }
}

function negotiationNeededHandler (event) {
  console.log('*** Negotiation needed')

  if (connectionState === 'closed') {
    connectionState = 'connecting'
   // wsend({type: 'search-peer'})
  }
}

function trackHandler (event) {
  console.log('*** the remote peer adds a track to the connection')
  //rootState.remoteStream = event.streams[0]
}

function removeTrackHandler (event) {
  console.log('*** the remote peer removes a track from the connection')
  const trackList = remote.srcObject.getTracks()
  if (trackList.length === 0) {
    closeVideoCall()
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
	
	note({content: "ice err: " + e.url + " " + e.errorText, type: "error", time: 5});
}


  function createPeerConnection () {
    try{
    pc = new RTCPeerConnection(iceServers);
}catch(er){
	note({content: err, type:"error", time: 5});
	return;
}
addLocalStream ();
 	if('ontrack' in pc){
	pc.ontrack = addStream;
}else{
	pc.addStream(window.streami);
	pc.onaddstream = function(e){
		remot.srcObject = e.stream;
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
      // wsend({type: 'search-peer'});
  }

 function closePeerConnection() {
    closeVideoCall()
    //state.messages.splice(0)
  }

 function clearMessages() {
    
  }

function  addMessage(state, message) {
    
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
	window.location.href="/dashboard";
}
function pushSubscribe(el){
	if(!confirm("Присылать пуш-уведомления о том, кто онлайн?")){
		return;
	}
	el.disabled = true;
	el.className = "puls";
	
	
	
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
    callFunctionFromScript(el);
}
	//script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
	script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js"
	head.appendChild(script);
	
	
}
	
	
	function callFunctionFromScript(el){
		
		
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
	})
		/*
	window.OneSignalDeferred = window.OneSignalDeferred || [];
	OneSignalDeferred.push(function(OneSignal){
		let ifsupported = OneSignal.Notifications.isPushSupported();
		if(!ifsupported){
			note({ content: "Ваш браузер не поддерживает пуш-уведомления!", type: "error", time: 5 });
			el.className = "";
			el.disabled = false;
			return;
		}
		OneSignal.init({
			appId:"226ceb60-4d9a-4299-8d74-b0af22809342"
		});
		
		 OneSignal.Notifications.addEventListener('permissionPromptDisplay', function (ev) {
        console.log("The prompt displayed ", ev);
        el.className = "";
        el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('permissionChange', function (permission) {
        if(permission){
			console.log("permission accepted");
		}
        el.className = "";
        el.disabled = false;
    });
    
     OneSignal.Notifications.addEventListener('click', function (event) {
        
			console.log("click event ", event);
		
        el.className = "";
        el.disabled = false;
    });
    
    
    
    
    
    
	});
	*/ 
}
	



