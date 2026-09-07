import { InjectionToken } from '@angular/core';

export interface AppConfig {
  companyName: string;
  enableLogs: boolean;
  enableNotifications: boolean;
  enableTheming: boolean;
  sessionTimeout: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
