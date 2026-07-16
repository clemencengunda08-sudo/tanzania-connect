/**
 * @fileOverview A simple event emitter for centralizing Firebase errors.
 */

type ErrorCallback = (error: any) => void;

class CustomEmitter {
  private listeners: { [key: string]: ErrorCallback[] } = {};

  on(event: string, callback: ErrorCallback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event: string, callback: ErrorCallback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event: string, error: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(cb => cb(error));
  }
}

export const errorEmitter = new CustomEmitter();
