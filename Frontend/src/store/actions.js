import util from '../util'
import axios from 'axios'

/**
 * Handle errors which occur when trying to access the local media
 * hardware; that is, exceptions thrown by getUserMedia(). The two most
 * likely scenarios are that the user has no camera and/or microphone
 * or that they declined to share their equipment when prompted. If
 * they simply opted not to share their media, that's not really an
 * error, so we won't present a message in that situation.
 */
function handleGetUserMediaError (err) {
  util.trace(err)

  switch (err.name) {
    case 'NotFoundError':
      alert('Unable to open your call because no camera and/or microphone were found.')
      break
    case 'SecurityError':
    case 'PermissionDeniedError':
      // Do nothing; this is the same as the user canceling the call.
      break
    default:
      alert('Error opening your camera and/or microphone: ' + err.message)
      break
  }
}

export default {
  registerUser ({ commit }, user) {
    commit('clearError')
    commit('setLoading', true)

    axios
      .post('/api/register', {
        ...user
      })
      .then(response => {
        const { data } = response

        if (data.user && data.user.token) {
          localStorage.setItem('accessToken', data.user.token)
          localStorage.setItem('currentUser', JSON.stringify(data.user))
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.user.token}`

          commit('setUser', data.user)
          commit('setToken', data.user.token)
          commit('setLoading', false)

          location.reload()
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          commit('setError', error.response.data.message)
        } else if (error.response && error.response.data && error.response.data.messages) {
          commit('setError', error.response.data.messages[0])
        } else {
          commit('setError', error.message)
        }
        commit('setLoading', false)

        setTimeout(() => {
          commit('clearError')
        }, 3500)

        console.error(error)
      })
  },
  loginUser ({ commit }, user) {
    commit('clearError')
    commit('setLoading', true)

    axios
      .post('/api/auth', {
        ...user
      })
      .then(response => {
        const { data } = response

        if (data.user && data.user.token) {
          localStorage.setItem('accessToken', data.user.token)
          localStorage.setItem('currentUser', JSON.stringify(data.user))
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.user.token}`

          commit('setUser', data.user)
          commit('setToken', data.user.token)
          commit('setLoading', false)

          location.reload()
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          commit('setError', error.response.data.message)
        } else if (error.response && error.response.data && error.response.data.messages) {
          commit('setError', error.response.data.messages[0])
        } else {
          commit('setError', error.message)
        }
        commit('setLoading', false)

        setTimeout(() => {
          commit('clearError')
        }, 3500)

        console.error(error)
      })
  },
  logoutUser ({ state, commit }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('current_user')
    axios.defaults.headers.common['Authorization'] = null

    commit('setUser', null)
    commit('setToken', null)

    location.reload()
  },
  updateUser ({ commit }, force = false) {
    const user = localStorage.getItem('currentUser')
    const token = localStorage.getItem('accessToken')

    if (user && !force) {
      return commit('setUser', JSON.parse(user))
    }

    if (!token && !force) return

    axios
      .get('/api/user')
      .then(response => {
        const { data } = response

        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user))

          commit('setUser', data.user)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          commit('setError', error.response.data.message)
        } else {
          commit('setError', error.message)
        }

        setTimeout(() => {
          commit('clearError')
        }, 3500)

        console.error(error)
      })
  },
  /**
   * A new ICE candidate has been received from the other peer. Call
   * RTCPeerConnection.addIceCandidate() to send it along to the
   * local ICE framework.
   */
  addIceCandidate ({ state }, candidateInfo) {
    const candidate = new RTCIceCandidate(candidateInfo)
    util.log('*** Adding received ICE candidate: ' + JSON.stringify(candidate))
    return state.peerConnection.addIceCandidate(candidate)
  },

  setLocalDescription ({ state }, description) {
    util.log('---> Setting local description to the offer')
    return state.peerConnection.setLocalDescription(description)
  },

  setRemoteDescription ({ state }, sdp) {
    util.log('---> Setting remote description')
    const description = new RTCSessionDescription(sdp)
    return state.peerConnection.setRemoteDescription(description)
  },

  createOffer ({ state }) {
    util.log('---> Creating offer')
    return state.peerConnection.createOffer()
  },

  sendOfferToPeer ({ state }) {
    util.log('---> Sending the offer to the remote peer')
    state.socket.emit('video-offer', state.peerConnection.localDescription)
  },

  createAnswer ({ state }) {
    util.log('---> Creating answer')
    return state.peerConnection.createAnswer()
  },

  sendAnswerToPeer ({ state }) {
    util.log('---> Sending answer to the remote peer')
    state.socket.emit('video-answer', state.peerConnection.localDescription)
  },

  hangUpCall ({ state }) {
    util.log('---> Notify the remote peer to hang up the call')
    state.socket.emit('hang-up')
  },

  ping ({ state }) {
    state.socket.emit('ping')
  },

  getUserMedia ({ commit, state }) {
    return navigator.mediaDevices.getUserMedia(state.mediaConstraints)
      .then((mediaStream) => {
        commit('addLocalStream', mediaStream)
      })
      .catch((err) => {
        handleGetUserMediaError(err)
        // Make sure we shut down our end of the RTCPeerConnection so we're ready to try again.
        commit('closePeerConnection')
      })
  }
}
