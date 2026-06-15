import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem<T>(key: string, value: T): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}