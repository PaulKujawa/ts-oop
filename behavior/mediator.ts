/*
 * example of a talk show, where only one speaker can talk at a time.
 * Instead of speakers talking with each other,
 * all interactions go through the host, the mediator.
 */

interface Speaker {
  startSpeech(): void;
  stopSpeech(): void;
}

class Government implements Speaker {
  private host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  startSpeech() {
    if (this.host.isMicrophoneAvailable) {
      this.host.isMicrophoneAvailable = false;
      console.log("Government: takes microphone");
    } else {
      console.log("Government: can't talk, microphone is taken");
    }
  }

  stopSpeech() {
    console.log("Government: returns microphone");
    this.host.isMicrophoneAvailable = true;
  }
}

class Opposition implements Speaker {
  private host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  startSpeech() {
    if (this.host.isMicrophoneAvailable) {
      this.host.isMicrophoneAvailable = false;
      console.log("Opposition: takes microphone");
    } else {
      console.log("Opposition: can't talk, microphone is taken");
    }
  }

  stopSpeech() {
    console.log("Opposition: returns microphone");
    this.host.isMicrophoneAvailable = true;
  }
}

class Host {
  government: Speaker | undefined;
  opposition: Speaker | undefined;
  isMicrophoneAvailable = true;

  welcomeSpeaker(government: Speaker, opposition: Speaker) {
    this.government = government;
    this.opposition = opposition;
  }

  giveMic(speaker: Speaker) {
    speaker.startSpeech();
  }

  takeBackMic(speaker: Speaker) {
    speaker.stopSpeech();
  }
}

const host = new Host();
const Jane = new Government(host);
const John = new Opposition(host);

host.welcomeSpeaker(Jane, John);
host.giveMic(Jane);
host.giveMic(John);
host.takeBackMic(Jane);
host.giveMic(John);
