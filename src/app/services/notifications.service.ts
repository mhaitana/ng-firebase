import { Injectable } from '@angular/core';
import AWN from 'awesome-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  duration = 5000;

  constructor() { }

  general(message: string, label: string = 'General', duration: number = this.duration): void {
    this.show('tip', message, label, duration);
  }

  success(message: string, label: string = 'Success', duration: number = this.duration): void {
    this.show('success', message, label, duration);
  }

  info(message: string, label: string = 'Info', duration: number = this.duration): void {
    this.show('info', message, label, duration);
  }

  warning(message: string, label: string = 'Warning', duration: number = this.duration): void {
    this.show('warning', message, label, duration);
  }

  error(message: string, label: string = 'Error', duration: number = this.duration): void {
    this.show('alert', message, label, duration);
  }

  show(type: string, message: string, label: string, duration: number): void {
    new AWN()[type]('', {
      messages: {
        [type]: message
      },
      durations: {
        global: duration
      },
      labels: {
        [type]: label
      }
    });
  }
}
