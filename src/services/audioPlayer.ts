// Romantic Arabic & Swahili Ambient Web Audio synthesizer for Aysha & Kalimah's Nikah
// Zero-dependency, zero-404, acoustic lute, qanun & harp modal chord progressions

export interface TrackMeta {
  id: string;
  title: string;
  composer: string;
  mood: string;
  durationSec: number;
}

export const PLAYLIST: TrackMeta[] = [
  {
    id: 'noor-al-qalb',
    title: 'Noor Al-Qalb (Celestial Oud & Harp)',
    composer: 'Acoustic Maqam Ensemble',
    mood: 'Peaceful & Luminous',
    durationSec: 195,
  },
  {
    id: 'barakallah-reverie',
    title: 'Barakallah (Sacred Nikah Blessing)',
    composer: 'Medina Reverie',
    mood: 'Sacred & Joyous',
    durationSec: 210,
  },
  {
    id: 'swahili-coastal-breeze',
    title: 'Swahili Coastal Shores (Acoustic Qanun & Lute)',
    composer: 'Swahili Arabesque Strings',
    mood: 'Gentle Coastal Warmth',
    durationSec: 185,
  },
  {
    id: 'andalusian-twilight',
    title: 'Andalusian Twilight (Ambient Harmony)',
    composer: 'Garden of Cordoba',
    mood: 'Serene & Tender',
    durationSec: 220,
  },
];

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.45;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;
  private listeners: Set<(state: { isPlaying: boolean; trackIndex: number; volume: number }) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(cb: (state: { isPlaying: boolean; trackIndex: number; volume: number }) => void) {
    this.listeners.add(cb);
    cb(this.getState());
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => cb(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      trackIndex: this.currentTrackIndex,
      volume: this.volume,
      track: PLAYLIST[this.currentTrackIndex],
    };
  }

  public async togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  public async play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.notify();
    this.startSequencer();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.currentStep = 0;
    this.notify();
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.currentStep = 0;
    this.notify();
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  private startSequencer() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    // Modal Maqam Nahawand / Hijaz inspired harmonic frequencies (D minor based)
    const tracksNotes = [
      // Track 0: Noor Al-Qalb (D minor, G minor, A minor, Bb major)
      [
        [293.66, 349.23, 440.0, 587.33], // D, F, A, D5
        [196.0, 293.66, 349.23, 466.16], // G, D, F, Bb4
        [220.0, 261.63, 329.63, 440.0], // A, C, E, A4
        [233.08, 293.66, 349.23, 466.16], // Bb, D, F, Bb4
      ],
      // Track 1: Barakallah Reverie (G, C, Em, D)
      [
        [196.0, 246.94, 293.66, 392.0], // G, B, D, G4
        [261.63, 329.63, 392.0, 523.25], // C, E, G, C5
        [164.81, 246.94, 329.63, 493.88], // E, B, E, B4
        [220.0, 293.66, 369.99, 440.0], // A, D, F#, A4
      ],
      // Track 2: Swahili Coastal Shores (F major, C major, D minor, Bb major)
      [
        [174.61, 220.0, 261.63, 349.23], // F, A, C, F4
        [261.63, 329.63, 392.0, 523.25], // C, E, G, C5
        [220.0, 261.63, 293.66, 440.0], // A, C, D, A4
        [233.08, 293.66, 349.23, 466.16], // Bb, D, F, Bb4
      ],
      // Track 3: Andalusian Twilight (D minor, C major, Bb major, A major)
      [
        [293.66, 349.23, 440.0, 587.33], // D, F, A, D5
        [261.63, 329.63, 392.0, 523.25], // C, E, G, C5
        [233.08, 293.66, 349.23, 466.16], // Bb, D, F, Bb4
        [220.0, 277.18, 329.63, 440.0], // A, C#, E, A4
      ],
    ];

    const currentProgression = tracksNotes[this.currentTrackIndex % tracksNotes.length];
    const stepInterval = 1450;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chord = currentProgression[this.currentStep % currentProgression.length];
      const now = this.ctx.currentTime;

      // Soft plucked acoustic lute / harp timbre
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Lowpass filter for smooth acoustic wood texture
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1300, now);
        filter.frequency.exponentialRampToValueAtTime(280, now + 2.6);

        // Pluck envelope with long natural resonance
        const delayTime = idx * 0.2;
        const noteStart = now + delayTime;
        const noteDuration = 2.4;

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.065 / (idx + 1), noteStart + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(noteStart);
        osc.stop(noteStart + noteDuration + 0.1);
      });

      this.currentStep++;
    };

    playStep();
    this.timerId = window.setInterval(playStep, stepInterval);
  }
}

export const weddingAudio = new WeddingAudioPlayer();
