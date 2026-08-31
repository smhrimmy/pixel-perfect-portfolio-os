import type { AudioConfig, SoundConfig } from "../types";

export class ProceduralAudioManager implements AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private config: AudioConfig;
  private isMuted = false;
  private isInitialized = false;

  constructor(config: AudioConfig) {
    this.config = config;
  }

  init(): void {
    if (this.isInitialized) return;

    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not available:", e);
    }
  }

  private ensureContext(): boolean {
    if (!this.ctx || !this.masterGain) return false;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return true;
  }

  playAmbient(): void {
    if (!this.ensureContext() || !this.ctx || !this.masterGain) return;
    if (this.ambientOsc) return;

    const { ambient } = this.config;

    // Create ambient oscillator
    this.ambientOsc = this.ctx.createOscillator();
    this.ambientGain = this.ctx.createGain();
    this.ambientFilter = this.ctx.createBiquadFilter();

    this.ambientOsc.type = ambient.waveType;
    this.ambientOsc.frequency.value = ambient.baseFrequency;

    // Filter
    this.ambientFilter.type = ambient.filter?.type ?? "lowpass";
    this.ambientFilter.frequency.value = ambient.filter?.frequency ?? 800;
    this.ambientFilter.Q.value = ambient.filter?.Q ?? 1;

    // Gain
    this.ambientGain.gain.value = 0;
    this.ambientGain.gain.linearRampToValueAtTime(
      ambient.volume * 0.15,
      this.ctx.currentTime + 2
    );

    // Connect: osc -> filter -> gain -> master
    this.ambientOsc.connect(this.ambientFilter);
    this.ambientFilter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOsc.start();
  }

  stopAmbient(): void {
    if (this.ambientOsc && this.ctx) {
      this.ambientGain?.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.ambientOsc?.stop();
        this.ambientOsc?.disconnect();
        this.ambientOsc = null;
        this.ambientGain?.disconnect();
        this.ambientGain = null;
        this.ambientFilter?.disconnect();
        this.ambientFilter = null;
      }, 1100);
    }
  }

  playSound(sound: SoundConfig): void {
    if (!this.ensureContext() || !this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = sound.waveType;
    osc.frequency.value = sound.frequency;

    const now = this.ctx.currentTime;
    const { attack, decay, sustain, release } = sound.envelope;
    const totalDuration = attack + decay + sustain + release;

    // ADSR envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(sound.volume, now + attack);
    gain.gain.linearRampToValueAtTime(
      sound.volume * sustain,
      now + attack + decay
    );
    gain.gain.linearRampToValueAtTime(
      0,
      now + attack + decay + sustain + release
    );

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + totalDuration + 0.01);
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(
        muted ? 0 : 1,
        this.ctx.currentTime + 0.1
      );
    }
  }

  destroy(): void {
    this.stopAmbient();
    this.ctx?.close();
    this.ctx = null;
    this.masterGain = null;
    this.isInitialized = false;
  }
}

interface AudioManager {
  init(): void;
  playAmbient(): void;
  stopAmbient(): void;
  playSound(sound: SoundConfig): void;
  setMuted(muted: boolean): void;
  destroy(): void;
}
