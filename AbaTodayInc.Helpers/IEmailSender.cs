using System.Threading.Tasks;

namespace AbaToday.Helpers
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string body);
        Task SendEmailContactAsync(string email, string subject, string body);
    }
}