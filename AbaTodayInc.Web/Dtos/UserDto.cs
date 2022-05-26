using System;
using System.Collections.Generic;

namespace AbaToday.Web.Dtos
{
    public class UserDto
    {
        public Guid? Id { get; set; }
        public string EmailAddress { get; set; }
        public string FullName { get; set; }
        public string PhoneCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public string RoleId { get; set; }
        public string Title { get; set; }
        public string DaysSchedule { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? TimeScheduleStart { get; set; }
        public DateTime? TimeScheduleEnd { get; set; }
        public string ReportsTo { get; set; }
        public decimal? HoursPerWeek { get; set; }
        public bool TrackingHoursMandatory { get; set; }
        public string LaborTypeId { get; set; }
        public string LaborTypeName { get; set; }

        //client-side properties
        public string CurrentUser { get; set; }
        public bool HasRelatedData { get; set; }

    }
}