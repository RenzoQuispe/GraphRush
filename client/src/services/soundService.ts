// Sistema de sonidos centralizado usando Web Audio API

export type SoundType = 'click' | 'success' | 'error' | 'tick' | 'gameover' | 'warning';

export interface SoundConfig {
  frequency: number;
  duration: number;
  volume: number;
  type?: OscillatorType;
  ramp?: {
    targetFrequency?: number;
    targetVolume?: number;
  };
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  click: {
    frequency: 800,
    duration: 0.1,
    volume: 0.1,
  },
  success: {
    frequency: 523.25,
    duration: 0.3,
    volume: 0.2,
    ramp: {
      targetFrequency: 783.99,
    },
  },
  error: {
    frequency: 200,
    duration: 0.15,
    volume: 0.15,
  },
  tick: {
    frequency: 1000,
    duration: 0.05,
    volume: 0.05,
  },
  warning: {
    frequency: 800,
    duration: 0.2,
    volume: 0.15,
  },
  gameover: {
    frequency: 300,
    duration: 0.5,
    volume: 0.2,
    ramp: {
      targetFrequency: 100,
    },
  },
};

export class SoundService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
    if (enabled) {
      this.initAudioContext();
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && !this.audioContext) {
      this.initAudioContext();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  play(type: SoundType) {
    if (!this.enabled || !this.audioContext) return;

    const config = SOUND_CONFIGS[type];
    const ctx = this.audioContext;
    const currentTime = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = config.type || 'sine';
    oscillator.frequency.value = config.frequency;
    gainNode.gain.setValueAtTime(config.volume, currentTime);

    if (config.ramp) {
      if (config.ramp.targetFrequency) {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.ramp.targetFrequency,
          currentTime + config.duration
        );
      }
      gainNode.gain.exponentialRampToValueAtTime(
        config.ramp.targetVolume || 0.01,
        currentTime + config.duration
      );
    } else {
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + config.duration);
    }

    oscillator.start(currentTime);
    oscillator.stop(currentTime + config.duration);
  }

  playCustom(frequency: number, duration: number, volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  // instancia Singleton
  private static instance: SoundService | null = null;

  static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }
}