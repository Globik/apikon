import rootState from './state'
import util from '../util'

/**
 * Handles |icecandidate| events by forwarding the specified
 * ICE candidate (created by our local ICE agent) to the other
 * peer through the signaling server.
 */
function iceCandidateHandler (event) {
  if (event.candidate) {
    util.log('*** Outgoing ICE candidate: ' + event.candidate.candidate)
    rootState.socket.emit('new-ice-candidate', event.candidate)
  }
}

/**
 * Handle |iceconnectionstatechange| events. This will detect
 * when the ICE connection is closed, failed, or disconnected.
 * This is called when the state of the ICE agent changes.
 */
function iceConnectionStateChangeHandler (event) {
  util.log('*** ICE connection state changed to ' + event.target.iceConnectionState)

  switch (event.target.iceConnectionState) {
    case 'connected':
    case 'complete':
      rootState.connectionState = 'open'
      break
    case 'closed':
    case 'failed':
    case 'disconnected':
    // и вот тут бы сигнал на сервер послать, что, мол, готов к приятию другого собеседника
    rootState.socket.emit('search-peer');
     // closeVideoCall()
      break
  }
}

/**
 * Handle the |icegatheringstatechange| event. This lets us know what the
 * ICE engine is currently working on: "new" means no networking has happened
 * yet, "gathering" means the ICE engine is currently gathering candidates,
 * and "complete" means gathering is complete. Note that the engine can
 * alternate between "gathering" and "complete" repeatedly as needs and
 * circumstances change.
 */
function iceGatheringStateChangeHandler (event) {
  util.log('*** ICE gathering state changed to: ' + event.target.iceGatheringState)
}

/**
 * Set up a |signalingstatechange| event handler. This will detect when
 * the signaling connection is closed.
 */
function signalingStateChangeHandler (event) {
  util.log('*** WebRTC signaling state changed to: ' + event.target.signalingState)

  switch (event.target.signalingState) {
    case 'closed':
    //  closeVideoCall()
      break
  }
}

/**
 * Called by the WebRTC layer to let us know when it's time to
 * begin, resume, or restart ICE negotiation.
 */
function negotiationNeededHandler (event) {
  util.log('*** Negotiation needed')

  if (rootState.connectionState === 'closed') {
    rootState.connectionState = 'connecting'
    rootState.socket.emit('search-peer')
  }
}

/**
 * Called by the WebRTC layer when events occur on the media tracks
 * on our WebRTC call. This includes when streams are added to and
 * removed from the call.
 *
 * track events include the following fields:
 * RTCRtpReceiver       receiver
 * MediaStreamTrack     track
 * MediaStream[]        streams
 * RTCRtpTransceiver    transceiver
 *
 * In our case, we're just taking the first stream found and attaching
 * it to the <video> element for incoming media.
 */
function trackHandler (event) {
  util.log('*** the remote peer adds a track to the connection')
  rootState.remoteStream = event.streams[0]
}

function removeTrackHandler (event) {
  util.log('*** the remote peer removes a track from the connection')
  const trackList = rootState.remoteStream.getTracks()
  if (trackList.length === 0) {
    closeVideoCall()
  }
}
  iceServers: [ 
	  {
        urls: 'stun:stun.l.google.com:19302'
      },
      { urls: 'turn:relay1.expressturn.com:3478', username: 'efZIKNPZ0Y17GFG3WZ', credential: 'HIYNupkIAHFXSgW8'},
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]
/**
 * Close the RTCPeerConnection and reset variables so that the user can
 * make or receive another call if they wish. This is called both
 * when the user hangs up, the other user hangs up, or if a connection
 * failure is detected.
 */
function closeVideoCall () {
  rootState.connectionState = 'closed'

  if (!rootState.peerConnection) {
    return
  }

  util.log('Closing the peer connection...')

  // Disconnect all our event listeners; we don't want stray events
  // to interfere with the hangup while it's ongoing.
  rootState.peerConnection.removeEventListener('icecandidate', iceCandidateHandler)
  rootState.peerConnection.removeEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler)
  rootState.peerConnection.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler)
  rootState.peerConnection.removeEventListener('signalingstatechange', signalingStateChangeHandler)
  rootState.peerConnection.removeEventListener('negotiationneeded', negotiationNeededHandler)
  rootState.peerConnection.removeEventListener('track', trackHandler)
  rootState.peerConnection.removeEventListener('removetrack ', removeTrackHandler)

  if (rootState.remoteStream) {
    rootState.remoteStream.getTracks().forEach(track => {
      track.stop()
    })
    rootState.remoteStream = null
  }

  rootState.peerConnection.close()
  rootState.peerConnection = null
}

export default {
  setUser (state, data) {
    state.user = data
  },

  setToken (state, data) {
    state.token = data
  },

  setIsOpenMenu (state, payload) {
    state.isOpenMenu = payload
  },

  setLoading (state, payload) {
    state.loading = payload
  },

  setError (state, payload) {
    state.error = payload
  },

  clearError (state) {
    state.error = null
  },

  addLocalStream (state, stream) {
    state.localStream = stream
    state.localStream.getTracks().forEach(track => {
      state.peerConnection.addTrack(track, state.localStream)
    })
  },

  removeLocalStream (state) {
    state.localStream.getTracks().forEach(track => track.stop())
    state.localStream = null
  },

  createPeerConnection (state) {
    util.log('Setting up a connection...')
    state.peerConnection = new RTCPeerConnection(state.connectionConfig)
    state.peerConnection.addEventListener('icecandidate', iceCandidateHandler)
    state.peerConnection.addEventListener('iceconnectionstatechange', iceConnectionStateChangeHandler)
    state.peerConnection.addEventListener('icegatheringstatechange', iceGatheringStateChangeHandler)
    state.peerConnection.addEventListener('signalingstatechange', signalingStateChangeHandler)
    state.peerConnection.addEventListener('negotiationneeded', negotiationNeededHandler)
    state.peerConnection.addEventListener('track', trackHandler)
    state.peerConnection.addEventListener('removetrack ', removeTrackHandler)
  },

  closePeerConnection (state) {
    closeVideoCall()
    state.messages.splice(0)
  },

  clearMessages (state) {
    state.messages.splice(0)
  },

  addMessage (state, message) {
    state.messages.push(message)
  },

  setOnline (state, online) {
    state.online = online
  }
}
