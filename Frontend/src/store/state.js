const hostname = window.location.hostname.includes('localhost') ? 'localhost' : (window.location.hostname.includes('m.') ? 'm.rouletka.ru' : 'rouletka.ru')
const scheme = document.location.protocol === 'https:' ? 'wss' : 'ws'
const port = window.location.hostname.includes('localhost') ? 3000 : (scheme === 'wss' ? 443 : 80)
const page = window.location.hostname.includes('localhost') ? '/' : '/websocket/'
let serverUrl = scheme + '://' + hostname + ':' + port + page
const token = localStorage.getItem('accessToken')

if (token) {
  serverUrl += '?token=' + token
}
// АХУТУНГ! Короче это надо переделать потому что оно не работает в деплое на серваке
// в serverUrl для пк wss://roulet.chat/websocket/
// для мобилки wss://m.roulet.chat/websocket/
//
// Сам WebSocket сервер можешь не трогать т.к. NGINX настроенный мною уже
// проксирует с 8081 порта на тот адрес

/* gggg
var myPeerConnection = new RTCPeerConnection({ 
 iceServers: [ 
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  ]
  , });
 */

export default {
  user: null,
  token: null,
  isOpenMenu: false,
  loading: false,
  error: null,
  peerConnection: null,
  localStream: null,
  remoteStream: null,
  online: 0,
  messages: [],
  /**
   * open, connecting, closed
   */
  connectionState: 'closed',
  connectionConfig: {
	  iceServers: [ 
 { urls: "stun:stun.relay.metered.ca:80", },
{ urls: "turn:a.relay.metered.ca:80", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
{ urls: "turn:a.relay.metered.ca:80?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", },
  { urls: "turn:a.relay.metered.ca:443", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }, 
  { urls: "turn:a.relay.metered.ca:443?transport=tcp", username: "33c88ed716afa1a802b5116a", credential: "YlI1/qfkEWya3Q4p", }
  ]
	  /*
    iceServers: [
      {
        urls: 'stun:openrelay.metered.ca:80'
      },
      {
        urls: 'turn:openrelay.metered.ca:80',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'turn:openrelay.metered.ca:443',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'turn:openrelay.metered.ca:443?transport=tcp',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
    */ 
  },
  mediaConstraints: {
    audio: true,
    video: {
      aspectRatio: {
        ideal: 1.333333 // 3:2 aspect is preferred
      }
    }
  },
  socket: new WebSocket(serverUrl, 'json', { headers: { Authorization: token } })
}
