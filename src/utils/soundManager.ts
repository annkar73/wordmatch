class SoundManager {
    private sounds: Record<string, HTMLAudioElement>;
    private isMuted: boolean;

    constructor() {
        this.sounds = {
            flip: new Audio('/assets/audio/flipcard.mp3'),
            match: new Audio('/assets/audio/match.mp3'),
            win: new Audio('/assets/audio/mission-success.mp3'),
        };
        this.isMuted = false;
    }

    playSound(name: string) {
        if (this.isMuted) return;

        const sound = this.sounds[name];
        if (sound) {
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
