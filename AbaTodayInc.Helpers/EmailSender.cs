using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AbaToday.Helpers
{
    public class EmailSender : IEmailSender
    {
        private readonly string _apiKey;
        private readonly string _from;
        private readonly string _header;
        private readonly string _headerContact;
        private readonly string _signature;

        public EmailSender(IConfiguration configuration)
        {
            _apiKey = configuration["SendGrid:ApiKey"];
            _from = configuration["SendGrid:From"];
            _header = configuration["EmailMessages:EmailHeader"];
            _signature = configuration["EmailMessages:EmailSignature"];
            _headerContact = configuration["EmailMessages:ContactUs:ContactHeader"];
        }

        public async Task SendEmailAsync(string email, string subject, string body)
        {
            await SendEmailAsync(email.Split(',').ToList(), subject, body);
        }

        private async Task SendEmailAsync(IEnumerable<string> emailAddresses, string subject, string body)
        {
            var client = new SendGridClient(_apiKey);
            var message = CreateMessage(emailAddresses, subject, body);
            await client.SendEmailAsync(message);
        }

        public async Task SendEmailContactAsync(string email, string subject, string body)
        {
            await SendEmailContactMessageAsync(email.Split(',').ToList(), subject, body);
        }

        private SendGridMessage CreateMessage(IEnumerable<string> emailAddresses, string subject, string body)
        {
            var from = new EmailAddress(_from, "AbaToday");
            var recipients = emailAddresses.Select(address => new EmailAddress(address)).ToList();
            var message = MailHelper.CreateSingleEmailToMultipleRecipients(
                from, 
                recipients, 
                subject, 
                body, 
                $"<div style=\'font-family: Tahoma,Segoe UI,Verdana\'>{_header}{body}{_signature}</div>");
            return message;
        }

        private async Task SendEmailContactMessageAsync(IEnumerable<string> emailAddresses, string subject, string body)
        {
            var client = new SendGridClient(_apiKey);
            var message = CreateContactMessage(emailAddresses, subject, body);
            await client.SendEmailAsync(message);
        }

        private SendGridMessage CreateContactMessage(IEnumerable<string> emailAddresses, string subject, string body)
        {
            var from = new EmailAddress(_from, "AbaToday");
            var recipients = emailAddresses.Select(address => new EmailAddress(address)).ToList();
            var message = MailHelper.CreateSingleEmailToMultipleRecipients(
                from,
                recipients,
                subject,
                body,
                $"<div style=\'font-family: Tahoma,Segoe UI,Verdana\'>{_headerContact}{body}{_signature}</div>");
            return message;
        }
    }
}