// Web Audio API engine for authentic, latency-free, offline atmospheric soundscapes

class AtmosphericAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private currentPreset: string | null = null;
  private isCurrentlyPlaying: boolean = false;
  private currentVolume: number = 0.5;

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
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }

  public getActivePreset(): string | null {
    return this.currentPreset;
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public stop() {
    if (this.activeNodes.length > 0) {
      this.activeNodes.forEach(node => {
        if (typeof node === 'number') {
          window.clearInterval(node);
        } else if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try {
            (node as AudioScheduledSourceNode).stop();
          } catch (e) {
            // Already stopped
          }
        }
      });
      this.activeNodes = [];
    }
    this.isCurrentlyPlaying = false;
    this.currentPreset = null;
  }

  public play(preset: string, volume: number = 0.5) {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.currentVolume = volume;
    this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    this.currentPreset = preset;
    this.isCurrentlyPlaying = true;

    const ctx = this.ctx;
    const dest = this.masterGain;

    switch (preset) {
      case 'sitar_bells':
        this.createSitarSoundscape(ctx, dest);
        break;
      case 'mariachi_brass':
        this.createMariachiSoundscape(ctx, dest);
        break;
      case 'guzheng_firecrackers':
        this.createGuzhengSoundscape(ctx, dest);
        break;
      case 'oud_breeze':
        this.createOudSoundscape(ctx, dest);
        break;
      case 'bavarian_polka':
        this.createBavarianSoundscape(ctx, dest);
        break;
      case 'batucada_samba':
        this.createBatucadaSoundscape(ctx, dest);
        break;
      case 'thai_water':
        this.createThaiWaterSoundscape(ctx, dest);
        break;
      case 'celtic_whistle':
        this.createCelticSoundscape(ctx, dest);
        break;
      case 'klezmer_chimes':
        this.createKlezmerSoundscape(ctx, dest);
        break;
      case 'andean_panpipes':
        this.createAndeanSoundscape(ctx, dest);
        break;
      case 'scandi_folk':
        this.createScandiSoundscape(ctx, dest);
        break;
      case 'african_djembe':
        this.createAfricanDjembeSoundscape(ctx, dest);
        break;
      case 'choral_carols':
        this.createChoralSoundscape(ctx, dest);
        break;
      case 'persian_santur':
        this.createPersianSoundscape(ctx, dest);
        break;
      case 'taiko_flute':
        this.createTaikoSoundscape(ctx, dest);
        break;
      case 'hearthside_strings':
      default:
        this.createHearthsideSoundscape(ctx, dest);
        break;
    }
  }

  // --- SOUNDSCAPE GENERATORS ---

  // 1. Sitar & Indian Temple Bells
  private createSitarSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Tanpura drone (Sa & Pa: 146.83Hz D3 and 220Hz A3)
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.2, ctx.currentTime);
    droneGain.connect(dest);

    [146.83, 220.0, 293.66].forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      osc.connect(filter);
      filter.connect(droneGain);
      osc.start();
      this.activeNodes.push(osc);
    });

    // Melodic sitar plucks in Yaman Raga
    const sitarNotes = [220, 246.94, 277.18, 311.13, 329.63, 369.99, 440, 493.88];
    const sitarTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = sitarNotes[Math.floor(Math.random() * sitarNotes.length)];
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Pitch glide for Meend (sitar expression)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.3);

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.3, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

      osc.connect(noteGain);
      noteGain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.7);
    }, 600);

    // Temple bell chimes every few seconds
    const bellTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      this.playBellTone(ctx, dest, 880 + Math.random() * 400);
    }, 3800);

    this.activeNodes.push(sitarTimer, bellTimer);
  }

  // 2. Mariachi Brass & Fiesta Strums
  private createMariachiSoundscape(ctx: AudioContext, dest: AudioNode) {
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [220.00, 277.18, 329.63], // A major
      [293.66, 369.99, 440.00], // D major
      [196.00, 246.94, 293.66]  // G major
    ];
    let chordIdx = 0;

    const strumTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const curChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Rhythmic vihuela strum
      curChord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.03);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);

        osc.start(ctx.currentTime + i * 0.03);
        osc.stop(ctx.currentTime + 0.8);
      });

      // Mariachi Trumpet fanfare flourish occasionally
      if (Math.random() > 0.5) {
        const trumpetOsc = ctx.createOscillator();
        trumpetOsc.type = 'sawtooth';
        const tFreq = curChord[2] * 2;
        trumpetOsc.frequency.setValueAtTime(tFreq, ctx.currentTime + 0.2);
        trumpetOsc.frequency.linearRampToValueAtTime(tFreq * 1.25, ctx.currentTime + 0.5);

        const tGain = ctx.createGain();
        tGain.gain.setValueAtTime(0.15, ctx.currentTime + 0.2);
        tGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        trumpetOsc.connect(tGain);
        tGain.connect(dest);
        trumpetOsc.start(ctx.currentTime + 0.2);
        trumpetOsc.stop(ctx.currentTime + 1.3);
      }
    }, 750);

    this.activeNodes.push(strumTimer);
  }

  // 3. Guzheng & Festive Firecrackers
  private createGuzhengSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Pentatonic scale (D4, E4, F#4, A4, B4, D5, E5)
    const scale = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99];

    const guzhengTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      // Tremolo / bend
      if (Math.random() > 0.6) {
        osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(freq * 1.03, ctx.currentTime + 0.35);
      }

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    }, 450);

    // Occasional gentle celebratory sparkle
    const sparkleTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      this.playPinkNoiseBurst(ctx, dest, 0.08, 0.25);
    }, 2800);

    this.activeNodes.push(guzhengTimer, sparkleTimer);
  }

  // 4. Oud & Ramadan Evening Breeze
  private createOudSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Warm wind drone
    this.createWindDrone(ctx, dest, 0.12);

    // Hijaz Maqam scale
    const hijaz = [220, 233.08, 277.18, 293.66, 329.63, 349.23, 392.00, 440];

    const oudTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = hijaz[Math.floor(Math.random() * hijaz.length)];
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    }, 650);

    this.activeNodes.push(oudTimer);
  }

  // 5. Bavarian Accordion & Polka
  private createBavarianSoundscape(ctx: AudioContext, dest: AudioNode) {
    let beat = 0;
    const bassFreqs = [130.81, 196.00]; // C3, G3
    const chordFreqs = [261.63, 329.63, 392.00];

    const polkaTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const isBass = beat % 2 === 0;
      beat++;

      if (isBass) {
        // Tuba / Oom bass
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(bassFreqs[(beat / 2) % bassFreqs.length], ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Accordion chord Pah
        chordFreqs.forEach(f => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, ctx.currentTime);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(dest);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        });
      }
    }, 380);

    this.activeNodes.push(polkaTimer);
  }

  // 6. Batucada Samba Percussion & Shakers
  private createBatucadaSoundscape(ctx: AudioContext, dest: AudioNode) {
    let count = 0;
    const sambaTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      count++;

      // Surdo bass drum on beats 2 and 4
      if (count % 4 === 2 || count % 4 === 0) {
        this.playSurdoDrum(ctx, dest, count % 4 === 2 ? 80 : 65);
      }

      // Agogô high/low bell
      if (count % 3 === 0) {
        this.playBellTone(ctx, dest, 587.33);
      } else if (count % 2 === 0) {
        this.playBellTone(ctx, dest, 440.00);
      }

      // Shaker on every 16th note feel
      this.playPinkNoiseBurst(ctx, dest, 0.05, 0.08);
    }, 180);

    this.activeNodes.push(sambaTimer);
  }

  // 7. Thai Kim Xylophone & Flowing Water
  private createThaiWaterSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Water wash
    this.createWaterBrookAmbience(ctx, dest);

    // 7-tone Thai equidistant scale approximation
    const thaiNotes = [330, 375, 420, 480, 550, 620, 710];
    const xylophoneTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = thaiNotes[Math.floor(Math.random() * thaiNotes.length)];
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.95);
    }, 350);

    this.activeNodes.push(xylophoneTimer);
  }

  // 8. Celtic Tin Whistle & Bodhrán
  private createCelticSoundscape(ctx: AudioContext, dest: AudioNode) {
    const bodhranTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      this.playSurdoDrum(ctx, dest, 95);
    }, 550);

    const whistleNotes = [587.33, 659.25, 739.99, 880.00, 987.77, 1174.66];
    const whistleTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = whistleNotes[Math.floor(Math.random() * whistleNotes.length)];
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Whistle vibrato LFO
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(5.5, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(6, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      lfo.stop(ctx.currentTime + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.25);
    }, 700);

    this.activeNodes.push(bodhranTimer, whistleTimer);
  }

  // 9. Klezmer Clarinet & Menorah Chimes
  private createKlezmerSoundscape(ctx: AudioContext, dest: AudioNode) {
    const freygish = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 554.37, 587.33];
    const clarinetTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = freygish[Math.floor(Math.random() * freygish.length)];
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Clarinet pitch bend / krekhts ornament
      if (Math.random() > 0.4) {
        osc.frequency.setValueAtTime(freq * 0.95, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.15);
      }

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    }, 480);

    // Chimes
    const chimeTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      this.playBellTone(ctx, dest, 1200 + Math.random() * 600);
    }, 3200);

    this.activeNodes.push(clarinetTimer, chimeTimer);
  }

  // 10. Andean Panpipes & Charango
  private createAndeanSoundscape(ctx: AudioContext, dest: AudioNode) {
    this.createWindDrone(ctx, dest, 0.1);

    // Minor pentatonic panpipe notes
    const zampNotes = [329.63, 392.00, 440.00, 493.88, 587.33, 659.25];
    const pipeTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = zampNotes[Math.floor(Math.random() * zampNotes.length)];
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.15);
    }, 600);

    this.activeNodes.push(pipeTimer);
  }

  // 11. Scandinavian Nyckelharpa & Summer Folk
  private createScandiSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Continuous drone
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(220, ctx.currentTime);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, ctx.currentTime);

    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(dest);
    droneOsc.start();
    this.activeNodes.push(droneOsc);

    // Nordic folk melody
    const folkNotes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440];
    const melodyTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = folkNotes[Math.floor(Math.random() * folkNotes.length)];
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 0.95);
    }, 450);

    this.activeNodes.push(melodyTimer);
  }

  // 12. African Djembe & Kalimba
  private createAfricanDjembeSoundscape(ctx: AudioContext, dest: AudioNode) {
    let beat = 0;
    const rhythmTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      beat++;

      // Djembe Bass / Tone / Slap pattern
      if (beat % 4 === 1) {
        this.playSurdoDrum(ctx, dest, 85); // Bass
      } else if (beat % 4 === 2 || beat % 4 === 4) {
        this.playSurdoDrum(ctx, dest, 180); // Tone
      } else {
        this.playPinkNoiseBurst(ctx, dest, 0.1, 0.08); // Slap
      }

      // Kalimba thumb piano melodic drops
      if (Math.random() > 0.4) {
        const kalimbaNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        const freq = kalimbaNotes[Math.floor(Math.random() * kalimbaNotes.length)];
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 1.25);
      }
    }, 220);

    this.activeNodes.push(rhythmTimer);
  }

  // 13. Cathedral Choral & Christmas Carols
  private createChoralSoundscape(ctx: AudioContext, dest: AudioNode) {
    const chordProgressions = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00]  // G major
    ];
    let chordIdx = 0;

    const organTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const chord = chordProgressions[chordIdx % chordProgressions.length];
      chordIdx++;

      chord.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.4);

        osc.connect(gain);
        gain.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 3.5);
      });

      // Tubular cathedral bell
      this.playBellTone(ctx, dest, 523.25);
    }, 3200);

    this.activeNodes.push(organTimer);
  }

  // 14. Persian Santur & Spring Equinox
  private createPersianSoundscape(ctx: AudioContext, dest: AudioNode) {
    this.createWaterBrookAmbience(ctx, dest);

    // Shur Dastgah scale
    const shur = [293.66, 311.13, 329.63, 369.99, 392.00, 440.00, 493.88, 587.33];
    const santurTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = shur[Math.floor(Math.random() * shur.length)];

      // Double strike of hammered dulcimer
      for (let i = 0; i < 2; i++) {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 1.1);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 1.2);
      }
    }, 420);

    this.activeNodes.push(santurTimer);
  }

  // 15. Japanese Taiko & Shakuhachi
  private createTaikoSoundscape(ctx: AudioContext, dest: AudioNode) {
    let beat = 0;
    const taikoTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      beat++;

      // Taiko deep drum hit
      if (beat % 4 === 1 || beat % 4 === 3) {
        this.playTaikoHit(ctx, dest);
      }

      // Wooden clapper (Hyoshigi)
      if (beat % 8 === 0) {
        this.playBellTone(ctx, dest, 1800);
      }
    }, 400);

    // Shakuhachi pentatonic flute
    const inScale = [293.66, 311.13, 392.00, 440.00, 466.16, 587.33];
    const fluteTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const freq = inScale[Math.floor(Math.random() * inScale.length)];
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(ctx.currentTime + 1.7);
    }, 1200);

    this.activeNodes.push(taikoTimer, fluteTimer);
  }

  // 16. Hearthside Acoustic & Fireside Crackle
  private createHearthsideSoundscape(ctx: AudioContext, dest: AudioNode) {
    // Hearthside crackle
    const crackleTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      if (Math.random() > 0.4) {
        this.playPinkNoiseBurst(ctx, dest, 0.04, 0.05);
      }
    }, 150);

    // Acoustic guitar arpeggio
    const guitarChords = [
      [196.00, 246.94, 293.66, 392.00], // G
      [164.81, 246.94, 329.63, 392.00], // Em
      [174.61, 220.00, 261.63, 349.23], // F
      [130.81, 196.00, 261.63, 329.63]  // C
    ];
    let curChord = 0;

    const guitarTimer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      const chord = guitarChords[curChord % guitarChords.length];
      curChord++;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.3);
      });
    }, 1100);

    this.activeNodes.push(crackleTimer, guitarTimer);
  }

  // --- AUDIO PRIMITIVES ---

  private playBellTone(ctx: AudioContext, dest: AudioNode, freq: number) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Harmonic overtone
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(dest);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 2.6);
    osc2.stop(ctx.currentTime + 2.6);
  }

  private playSurdoDrum(ctx: AudioContext, dest: AudioNode, startFreq: number = 75) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 0.38);
  }

  private playTaikoHit(ctx: AudioContext, dest: AudioNode) {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  }

  private playPinkNoiseBurst(ctx: AudioContext, dest: AudioNode, gainVal: number, duration: number) {
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    noise.start();
  }

  private createWindDrone(ctx: AudioContext, dest: AudioNode, volume: number) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    osc.start();
    this.activeNodes.push(osc);
  }

  private createWaterBrookAmbience(ctx: AudioContext, dest: AudioNode) {
    const timer = window.setInterval(() => {
      if (!this.isCurrentlyPlaying) return;
      this.playPinkNoiseBurst(ctx, dest, 0.03, 0.15);
    }, 120);
    this.activeNodes.push(timer);
  }
}

export const atmosphericAudio = new AtmosphericAudioEngine();
