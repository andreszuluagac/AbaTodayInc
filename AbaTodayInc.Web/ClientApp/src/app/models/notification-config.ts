import { SelectItem } from "primeng/api";

import { Notification } from "./notification";

export interface NotificationConfig {
    notifications: Notification[];
    scheduleTypes: SelectItem[];
    roles: SelectItem[];
}