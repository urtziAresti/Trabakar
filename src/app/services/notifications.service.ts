import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private platform: Platform) {
    if (!this.platform.is('pwa')) {
      this.requestPermissionWeb().then(res => {
        // this.showNotificationWeb('test web')
      })
    } else {
      this.requestPermission().then(res => {
        this.showNotification("test PWA")
      })
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    return await Notification.requestPermission();
  }

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (await this.isNotificationSupported()) {
        const swRegistration = await navigator.serviceWorker.ready;
        swRegistration.showNotification(title, options);
    }
  }

  private async isNotificationSupported(): Promise<boolean> {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }


  requestPermissionWeb(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  showNotificationWeb(title: string, options?: NotificationOptions): void {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, options);
    }
  }

  isWebNotificationSupported(): boolean {
    return "Notification" in window;
  }


}
