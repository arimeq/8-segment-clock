const WORK = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;
const ROUNDS = 4; // work sessions before a long break

/**
 * Pomodoro technique on top of a Timer: 25 minutes of work, then a 5 minute break;
 * every 4th break is 15 minutes long. Phases follow each other automatically.
 */
export class Pomodoro {
  constructor(timer, onPhaseChange = () => {}) {
    this.timer = timer;
    this.onPhaseChange = onPhaseChange;
    this.phase = null; // 'work' | 'short break' | 'long break' | null when inactive
    this.round = 0;
  }

  get active() {
    return this.phase !== null;
  }

  get label() {
    return this.active ? `Pomodoro ${this.round}/${ROUNDS} · ${this.phase}` : '';
  }

  start() {
    this.round = 1;
    this.enter('work', WORK);
  }

  stop() {
    this.phase = null;
  }

  /** Called on every frame; moves on to the next phase once the current one is over */
  tick() {
    if (this.active && this.timer.running && this.timer.msLeft() === 0) {
      if (this.phase !== 'work') {
        this.round = this.round % ROUNDS + 1;
        this.enter('work', WORK);
      } else if (this.round === ROUNDS) {
        this.enter('long break', LONG_BREAK);
      } else {
        this.enter('short break', SHORT_BREAK);
      }
    }
  }

  enter(phase, seconds) {
    this.phase = phase;
    this.timer.set(seconds);
    this.timer.start();
    this.onPhaseChange(phase);
  }
}
