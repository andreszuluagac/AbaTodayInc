export interface Notification {
    id: string;
    nameAndPath: string;
    isAutomatedTask: boolean;
    hasNotificationConfigured: boolean;
    notificationId?: string;
    shouldSendSms?: boolean;
    shouldSendEmail?: boolean;
    roles?: string;
    scheduleTypeId?: string;
    scheduleTypeName?: string;
    //Client-side properties
    name?: string;
}