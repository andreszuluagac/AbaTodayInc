import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { NotificationConfig } from "../models/notification-config";
import { Notification } from "../models/notification";
import { SendNotification } from "../models/send-notification";
import { ContactUs } from "../models/contactus";

@Injectable({
  providedIn: "root"
})
export class NotificationsService {

    constructor(private readonly http: HttpClient) { }

    getNotifications(): Observable<NotificationConfig> {
        const endpoint = "api/notifications/getAll";
        return this.http.get<NotificationConfig>(endpoint);
    }

    saveNotifications(notifications: Notification[]): Observable<void> {
        const endpoint = "api/notifications/save";
        return this.http.post<void>(endpoint, notifications);
    }

    deleteNotification(id: string): Observable<void> {
        const endpoint = `api/notifications/delete/${id}`;
        return this.http.delete<void>(endpoint);
    }

    sendNotification(sendNotification: SendNotification): Observable<void> {
        const endpoint = "api/notifications/sendNotification";
        return this.http.post<void>(endpoint, sendNotification);
    }

    sendContactUs(contactUs: ContactUs): Observable<void> {
        const endpoint = "api/notifications/sendContactUs";
        return this.http.post<void>(endpoint, contactUs);
    }
}
