//https://codepen.io/gregh/pen/RKVNgB/
class Sound {

  constructor(context) {
    this.context = context;
  }

  vinit() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  play(value, time) {
    this.vinit();
console.log("Playing a sound")
    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
    this.oscillator.stop(time + 1);
  }

}
/*
let context = new (window.AudioContext || window.webkitAudioContext)();
let notes = new Sound(context);
let nows = context.currentTime;
*/ 
/*
notes.play(261.63, nows);
note.play(293.66, now + 0.5);
note.play(329.63, now + 1);
note.play(349.23, now + 1.5);
note.play(392.00, now + 2);
note.play(440.00, now + 2.5);
note.play(493.88, now + 3);
note.play(523.25, now + 3.5);
*/
