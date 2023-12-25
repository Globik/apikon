var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var sock = null;
var pc = null;
var connectionState = "closed";
var mobChat = false;
var isOpen = false;
local.srcObject = null;
remote.srcObject = null;

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
 if(!sock) sock = new WebSocket(new_uri + "//" + loc3 + "/gesamt");

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
        printmsg2.className='write';
        printmsg.className="write";
      default:
        break
    }
	
}
function  handleMessage(msg){
	printmsg2.className="";
	printmsg.className="";
	let div=document.createElement('div');
	let div2=document.createElement('div');

		div.className="yourmsg";
		div.innerHTML="<span>"+ msg+ "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		
mobileChat.className="";
		div2.className="yourmsg2";
		div2.innerHTML="<span>"+ msg+ "</span>";
		chatbox2.appendChild(div2);
		chatbox2.scrollTop = chatbox2.clientHeight + chatbox2.scrollHeight;
		
}

function handleHangUp(){
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
		//alert(1);
		el.disabled = true;
			document.body.click();
		if(local.srcObject==null){
			//alert(2);
	/*
	
	 try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    alert(4);
    console.log('Received local stream');
    local.srcObject = stream;
   // localStream = stream
   window.streami = stream;
    startbtn.disabled = false;
    startbtn,className="stop"
  } catch (e) {
	  console.error(e);
   alert(`getUserMedia() error: ${e.name}`);
  }*/
	
	
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream){

	//alert(3);
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
		local.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
	}
	local.srcObject = null;
	closeVideoCall();
	wsend({type: "hang-up"});
	el.disabled = false;
	local.style.backGround="rgba(0,0,0,0);"
	if(sock) sock.close();
	chatbox.innerHTML="";
	chatbox2.innerHTML="";
	mobileChat.className="hide";
	mobChat = false;
	somespinner.className="";
		somehello.className="";
}
}

function handleError(err){
		note({"content": err, type: "error", time: 5});
	}
	local.onloadedmetadata = function () {
		console.log("onloaded");
		wsend({type:'search-peer'});
		somespinner.className="show";
	}
	remote.onloadedmetadata = function () {
		console.log("onloaded");
		nextbtn.disabled = false;
		somespinner.className="";
		somehello.className="see";
	}
	
	function hideChat(el){
		
		if(!mobChat){
		mobileChat.className="";
		mobChat =  true;
	}else{
		mobileChat.className = "hide";
		mobChat = false;
	}
	}
	function txtInput(el){
		wsend({type:"write"});
	}
	function sendi(event){
		 let l=event.getAttribute("data-send");
		
		let div=document.createElement('div');
		if(l=="one"){
		div.className="yourmsg";
		div.innerHTML="<span>"+ txtvalue.value+ "</span>";
		chatbox.appendChild(div);
		chatbox.scrollTop = chatbox.clientHeight + chatbox.scrollHeight;
		wsend({type:"message", data: txtvalue.value});
		txtvalue.value="";
	}else if(l=="two"){
		div.className="yourmsg2";
		div.innerHTML="<span>"+ txtvalue2.value+ "</span>";
		chatbox2.appendChild(div);
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
      wsend({type:'search-peer'});
      chatbox.innerHTML="";
	chatbox2.innerHTML="";
	mobileChat.className = "hide";
	mobChat = false;
	//somespinner.className="";
		somehello.className="";
     // el.disabled=true;
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
     closeVideoCall()
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
