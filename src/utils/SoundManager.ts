import flipSound from '/assets/audio/flipcard.mp3';
import matchSound from '/assets/audio/match.mp3';
import winSound from '/assets/audio/mission-success.mp3';

class SoundManager {
    private sounds: Record<string, HTMLAudioElement>;
    private isMuted: boolean;

    constructor() {
        this.sounds = {
            flip: new Audio(flipSound),
            match: new Audio(matchSound),
            win: new Audio(winSound),
        };
        this.isMuted = false;
    }

    playSound(name: string) {
        if (this.isMuted) return;

        const sound = this.sounds[name];
        if(sound) {
            sound.currentTime = 0;
            sound.play();
        } else {
            console.warn(`Sound "${name}" not found.`);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return !this.isMuted;
    }
    getMuteStatus() {
        return this.isMuted;
    }
}

export const soundManager = new SoundManager();