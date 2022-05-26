"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticData = void 0;
var StaticData = /** @class */ (function () {
    function StaticData() {
    }
    StaticData.subscriptionTypeCols = [
        { field: "name", header: "SECURITY.SUBSCRIPTIONS.FIELDS.NAME", width: "125px" },
        { field: "description", header: "SECURITY.SUBSCRIPTIONS.FIELDS.DESCRIPTION", width: "240px" },
        { field: "monthlyValue", header: "SECURITY.SUBSCRIPTIONS.FIELDS.MONTHLY", width: "110px", isCurrency: true, useUsd: true },
        { field: "firstYearValue", header: "SECURITY.SUBSCRIPTIONS.FIELDS.FIRSTYEAR", width: "110px", isCurrency: true, useUsd: true },
        { field: "secondYearValue", header: "SECURITY.SUBSCRIPTIONS.FIELDS.SECONDYEAR", width: "110px", isCurrency: true, useUsd: true },
        { field: "thirdYearOnValue", header: "SECURITY.SUBSCRIPTIONS.FIELDS.THIRDYEARON", width: "110px", isCurrency: true, useUsd: true },
        { field: "startDate", header: "SECURITY.SUBSCRIPTIONS.FIELDS.START", width: "125px", isDate: true },
        { field: "endDate", header: "SECURITY.SUBSCRIPTIONS.FIELDS.END", width: "120px", isDate: true },
        {
            field: "isActive",
            header: "SECURITY.SUBSCRIPTIONS.FIELDS.ACTIVE",
            isBoolean: true,
            width: "100px"
        }
    ];
    StaticData.subscriptionUsersCols = [
        { field: "image", header: "SECURITY.SUBSCRIPTIONS.FIELDS.IMAGE", width: "60px", isImageUrl: true },
        { field: "fullName", header: "SECURITY.SUBSCRIPTIONS.FIELDS.FULLNAME", width: "170px", badgePropertyName: "subscriptionAdmin" },
        { field: "emailAddress", header: "SECURITY.SUBSCRIPTIONS.FIELDS.EMAIL", width: "170px", isEmail: true },
        { field: "phoneNumber", header: "SECURITY.SUBSCRIPTIONS.FIELDS.PHONE", width: "140px" },
        { field: "roleId", header: "SECURITY.SUBSCRIPTIONS.FIELDS.ROLES", width: "200px", isCommaSeparated: true },
    ];
    StaticData.rolesCols = [
        { field: "name", header: "SECURITY.MANAGEROLES.FIELDS.NAME", width: "150px" },
        { field: "description", header: "SECURITY.MANAGEROLES.FIELDS.DESCRIPTION", width: "150px" },
        { field: "isActive", header: "SECURITY.MANAGEROLES.FIELDS.ACTIVE", isBoolean: true, width: "120px" }
    ];
    StaticData.usersCols = [
        { field: "emailAddress", header: "SECURITY.MANAGEUSERS.FIELDS.EMAIL", width: "220px" },
        { field: "fullName", header: "SECURITY.MANAGEUSERS.FIELDS.FULLNAME", width: "220px" },
        { field: "phoneNumber", header: "SECURITY.MANAGEUSERS.FIELDS.PHONENUMBER", width: "170px" },
        { field: "startDate", header: "SECURITY.MANAGEUSERS.FIELDS.STARTDATE", isDate: true, width: "220px" },
        { field: "title", header: "SECURITY.MANAGEUSERS.FIELDS.TITLE", width: "220px" },
        { field: "laborTypeName", header: "SECURITY.MANAGEUSERS.FIELDS.LABORTYPE", width: "220px" },
        //{ field: "daysSchedule", header: "SECURITY.MANAGEUSERS.FIELDS.DAYSSCHEDULE", width: "220px" },
        { field: "timeScheduleStart", header: "SECURITY.MANAGEUSERS.FIELDS.TIMESCHEDULESTART", isTime: true, width: "220px" },
        { field: "timeScheduleEnd", header: "SECURITY.MANAGEUSERS.FIELDS.TIMESCHEDULEEND", isTime: true, width: "220px" },
        { field: "reportsTo", header: "SECURITY.MANAGEUSERS.FIELDS.REPORTTO", width: "220px" },
        { field: "hoursPerWeek", header: "SECURITY.MANAGEUSERS.FIELDS.HOURSPERWEEK", width: "220px" },
        { field: "trackingHoursMandatory", header: "SECURITY.MANAGEUSERS.FIELDS.TRACKINGHOURSMANDATORY", isBoolean: true, width: "240px" },
        { field: "isActive", header: "SECURITY.MANAGEROLES.FIELDS.ACTIVE", isBoolean: true, width: "120px" }
    ];
    return StaticData;
}());
exports.StaticData = StaticData;
//# sourceMappingURL=static-data.js.map