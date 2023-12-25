import createLogger from 'vuex/dist/logger'
import rootState from './state'
import util from '../util'

/**
 * Signaling messages: these messages are used to trade WebRTC
 * signaling information during negotiations leading up to a video call.
 */

/* A new ICE candidate has been received */
function handleNewIceCandidate (msg, dispatch) {
  dispatch('addIceCandidate', msg)
    .catch((err) => util.trace(`Error ${err.name}: ${err.message}`))
}

/* Invitation and offer to chat */
function handleVideoOffer (msg, dispatch) {
  dispatch('setRemoteDescription', msg)
    .then(() => dispatch('createAnswer'))
    .then((answer) => dispatch('setLocalDescription', answer))
    .then(() => dispatch('sendAnswerToPeer'))
    .catch((err) => util.trace(`Error ${err.name}: ${err.message}`))
}

/* Callee has answered our offer */
function handleVideoAnswer (msg, dispatch) {
  dispatch('setRemoteDescription', msg)
    .catch((err) => util.trace(`Error ${err.name}: ${err.message}`))
}

/* The other peer has hung up the call */
function handleHangUp (state, commit) {
  commit('closePeerConnection')
  commit('createPeerConnection')
  commit('addLocalStream', state.localStream)
}

/* A remote peer has been found and matched */
function handlePeerMatched (dispatch) {
  dispatch('createOffer')
    .then((offer) => dispatch('setLocalDescription', offer))
    .then(() => dispatch('sendOfferToPeer'))
    .catch((err) => util.trace(`Error ${err.name}: ${err.message}`))
}

/**
 * Chatting messages: these messages are used to communicate with the remote peer.
 */

function handleMessage (msg, commit) {
  commit('addMessage', msg)
}

const webSocketPlugin = ({ state, commit, dispatch }) => {
  rootState.socket.emit = (type, data) => {
    rootState.socket.send(JSON.stringify({ type, data }))
  }

  rootState.socket.addEventListener('open', (evt) => {
    util.log('The websocket connection has been opened successfully.')

    setInterval(() => {
      dispatch('ping')
    }, 53000)
  })

  rootState.socket.addEventListener('close', (evt) => {
//alert('Websocket closed!');
    util.log(`The websocket connection has been closed with error code ${evt.code}: ${evt.reason}`)
  })

  rootState.socket.addEventListener('error', (evt) => {
	  alert(JSON.stringify(evt));
    util.trace(evt)
  })
//home/globi/rc/for-developers/Frontend/dist/js/app.1bdb24bc.js
//dist/js/app.24c32cac.js
  rootState.socket.addEventListener('message', (evt) => {
    const msg = JSON.parse(evt.data)

    switch (msg.type) {
      case 'online':
       // onlineCount.textContent = msg.online
        break
      case 'new-ice-candidate':
        handleNewIceCandidate(msg.data, dispatch)
        break
      case 'video-offer':
        handleVideoOffer(msg.data, dispatch)
        break
      case 'video-answer':
        handleVideoAnswer(msg.data, dispatch)
        break
      case 'hang-up':
        handleHangUp(state, commit)
        break
      case 'peer-matched':
        handlePeerMatched(dispatch)
        break
      case 'message':
        handleMessage(msg.data, commit)
        break
      default:
        break
    }
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), webSocketPlugin]
  : [webSocketPlugin]
