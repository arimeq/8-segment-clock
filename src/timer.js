/**
 * Countdown timer. It is driven by its end timestamp, not by ticking setTimeout:
 * it stays exact when the page is throttled or in the background.
 */
export class Timer {
  constructor(seconds = 210) {
    this.initialized = false;
    this.remaining = seconds * 1000; // milliseconds, while the timer stands
    this.end = null; // Date.now() at the end of the countdown, while the timer runs
  }

  get running() {
    return this.end !== null;
  }

  set(seconds) {
    this.remaining = seconds * 1000;
    if (this.running) {
      this.end = Date.now() + this.remaining;
    }
    this.initialized = true;
  }

  start() {
    if (!this.running) {
      this.end = Date.now() + this.remaining;
    }
  }

  stop() {
    if (this.running) {
      this.remaining = Math.max(0, this.end - Date.now());
      this.end = null;
    }
  }

  /** Stops the timer and gives the display back to the clock */
  reset() {
    this.stop();
    this.initialized = false;
  }

  msLeft() {
    return this.running ? Math.max(0, this.end - Date.now()) : this.remaining;
  }

  secondsLeft() {
    return Math.ceil(this.msLeft() / 1000);
  }
}
