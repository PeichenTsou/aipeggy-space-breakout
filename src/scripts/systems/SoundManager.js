/**
 * Professional Sound Manager with Web Audio API
 * @class SoundManager
 * @description Manages all game sound effects with volume control and settings
 */
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.volume = 0.7;
    this.muted = false;
    this.initialized = false;
    this.settingsVisible = false;

    // Load settings from localStorage
    this.loadSettings();

    // Sound definitions with frequencies and characteristics
    this.soundDefinitions = {
      brickHit: { frequency: 800, duration: 0.1, type: "square" },
      brickHitOrange: { frequency: 600, duration: 0.12, type: "square" },
      brickHitYellow: { frequency: 500, duration: 0.15, type: "square" },
      brickHitGreen: { frequency: 400, duration: 0.18, type: "square" },
      beamAttack: { frequency: 200, duration: 0.8, type: "sawtooth" },
      ballSplit: { frequency: 1200, duration: 0.3, type: "sine" },
      powerUpCollect: { frequency: 1000, duration: 0.2, type: "sine" },
      bombExplosion: { frequency: 100, duration: 0.5, type: "square" },
      levelComplete: { frequency: 523, duration: 1.0, type: "sine" }, // C note
      gameOver: { frequency: 220, duration: 1.5, type: "triangle" },
    };
  }

  /**
   * Initialize audio context (must be called after user interaction)
   */
  async initialize() {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.initialized = true;
      console.log("SoundManager initialized successfully");
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
      this.initialized = false;
    }
  }

  /**
   * Play a sound effect
   */
  play(soundName, options = {}) {
    if (!this.initialized || this.muted || !this.audioContext) return;

    const soundDef = this.soundDefinitions[soundName];
    if (!soundDef) {
      console.warn(`Sound '${soundName}' not found`);
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Configure oscillator
      oscillator.type = soundDef.type;
      oscillator.frequency.setValueAtTime(
        soundDef.frequency * (options.pitch || 1),
        this.audioContext.currentTime
      );

      // Configure gain (volume)
      const finalVolume = this.volume * (options.volume || 1) * 0.3; // Keep sounds subtle
      gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + soundDef.duration
      );

      // Connect and play
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + soundDef.duration);
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  }

  /**
   * Play brick hit sound with pitch based on brick type
   */
  playBrickHit(brickType) {
    const soundMap = {
      RED: "brickHit",
      ORANGE: "brickHitOrange",
      YELLOW: "brickHitYellow",
      GREEN: "brickHitGreen",
    };

    const soundName = soundMap[brickType] || "brickHit";
    this.play(soundName);
  }

  /**
   * Play level complete fanfare
   */
  playLevelComplete() {
    // Play a simple melody
    const notes = [523, 659, 784, 1047]; // C, E, G, C
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playNote(freq, 0.3);
      }, index * 200);
    });
  }

  /**
   * Play a single musical note
   */
  playNote(frequency, duration) {
    if (!this.initialized || this.muted || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        frequency,
        this.audioContext.currentTime
      );

      gainNode.gain.setValueAtTime(
        this.volume * 0.2,
        this.audioContext.currentTime
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + duration
      );

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn("Error playing note:", error);
    }
  }

  /**
   * Set volume (0-1)
   */
  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    this.saveSettings();
  }

  /**
   * Toggle mute
   */
  toggleMute() {
    this.muted = !this.muted;
    this.saveSettings();
  }

  /**
   * Show/hide sound settings panel
   */
  toggleSettings() {
    this.settingsVisible = !this.settingsVisible;
    const panel = document.getElementById("soundSettings");
    if (panel) {
      panel.style.display = this.settingsVisible ? "block" : "none";
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(
        "aipeggy_sound_settings",
        JSON.stringify({
          volume: this.volume,
          muted: this.muted,
        })
      );
    } catch (error) {
      console.warn("Could not save sound settings:", error);
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem("aipeggy_sound_settings");
      if (saved) {
        const settings = JSON.parse(saved);
        this.volume = settings.volume || 0.7;
        this.muted = settings.muted || false;
      }
    } catch (error) {
      console.warn("Could not load sound settings:", error);
    }
  }

  /**
   * Get current settings for UI display
   */
  getSettings() {
    return {
      volume: this.volume,
      muted: this.muted,
      initialized: this.initialized,
    };
  }

  /**
   * Render sound settings panel
   */
  renderSettings(ctx) {
    if (!this.settingsVisible) return;

    // This will be handled by HTML/CSS UI instead of canvas rendering
    // Keeping this method for consistency with other systems
  }
}
