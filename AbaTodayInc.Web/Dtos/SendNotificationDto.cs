namespace AbaToday.Web.Dtos
{
    public class SendNotificationDto
    {
        public string NotificationTypeId { get; set; }
        public string SmsTextKey { get; set; }
        public string EmalSubjectKey { get; set; }
        public string EmailBodyKey { get; set; }
    }
}