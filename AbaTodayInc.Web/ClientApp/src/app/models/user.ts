export interface User {
    id?: string;
    emailAddress: string;
    fullName: string;
    phoneNumber?: string;
    phoneCode?: string;
    isActive: boolean;
    roleId?: string;
    image?: string;
    title?: string
    daysSchedule?: string;
    startDate: Date;
    timeScheduleStart?: Date;
    timeScheduleEnd?: Date;
    reportsTo?: string;
    hoursPerWeek?: number;
    trackingHoursMandatory: boolean;
    laborTypeId?: string;
    laborTypeName?: string;
    //Client-side properties
    currentUser?: string;
    hasRelatedData?: boolean;
    hasTutorialBeenShown: boolean
}