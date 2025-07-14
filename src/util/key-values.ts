type EscapeCallback = (event: KeyboardEvent) => void;
type EnterCallback = (event: KeyboardEvent) => void;

let currentEscapeCallback: EscapeCallback | null = null;
let currentEnterCallback: EnterCallback | null = null;

const handleEscape: EscapeCallback = (event) => {
  if (event.key === 'Escape' && currentEscapeCallback) {
    event.preventDefault();
    event.stopPropagation();
    currentEscapeCallback(event);
  }
}

export const setupEscapeListener = (callback: EscapeCallback) => {
  currentEscapeCallback = callback;
  addEventListener('keydown', handleEscape)
}

export const cleanupEscapeListener = () => {
  removeEventListener('keydown', handleEscape)
  currentEscapeCallback = null;
}

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    if (currentEnterCallback) {
      currentEnterCallback(event);
    }
  }
}

export const setupEnterListener = (callback: EnterCallback) => {
  currentEnterCallback = callback;
  addEventListener('keydown', handleEnter);
}

export const cleanupEnterListener = () => {
  removeEventListener('keydown', handleEnter);
  currentEnterCallback = null;
}
