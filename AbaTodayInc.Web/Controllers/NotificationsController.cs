using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AbaToday.Web.Dtos;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain;
using AbaToday.Repos.Domain.Interfaces;
using AbaToday.Web.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LogicPod.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/{id?}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class NotificationsController : Controller
    {
        //private readonly IEmailSender _emailSender;
        //private readonly ISmsSender _smsSender;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private readonly INotificationsRepo _notificationsRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public NotificationsController(
            IEmailSender emailSender,
            //ISmsSender smsSender,
            IConfiguration config,
            INotificationsRepo notificationsRepo,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _emailSender = emailSender;
            //_smsSender = smsSender;
            _config = config;
            _notificationsRepo = notificationsRepo;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            //First, get all notification types
            var notificationTypes = _notificationsRepo.GetNotificationTypes();
            //Second, get notifications for subscription
            var notifications = _notificationsRepo
                .GetNotifications()
                .ToList();
            //Finally create DTO with notification types, adding information that says if there's something set up
            var notificationsDto = notificationTypes.Select(a => new NotificationDto
                {
                    Id = a.Id,
                    NameAndPath = a.NameAndPath,
                    IsAutomatedTask = a.IsAutomatedTask,
                    HasNotificationConfigured = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id) != null,
                    NotificationId = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)?.Id,
                    ShouldSendSms = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)?.ShouldSendSms,
                    ShouldSendEmail = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)?.ShouldSendEmail,
                    Roles = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)?.Roles,
                    ScheduleTypeId = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)
                        ?.NotificationScheduleTypeId,
                    ScheduleTypeName = notifications.FirstOrDefault(b => b.NotificationTypeId == a.Id)?
                        .NotificationScheduleType?
                        .Name
                })
                .OrderBy(a => a.NameAndPath)
                .ThenByDescending(a => a.HasNotificationConfigured);

            var scheduleTypes = _notificationsRepo.GetScheduleTypes().Select(a => new BasicSelectListItemDto
            {
                Value = a.Id,
                Label = a.Name
            });

            var roles = _roleManager.Roles
                .Select(a => new BasicSelectListItemDto
                {
                    Value = a.Name,
                    Label = a.Name
                });

            return Ok(new NotificationConfigDto
            {
                Notifications = notificationsDto,
                ScheduleTypes = scheduleTypes,
                Roles = roles
            });
        }

        [HttpPost]
        public IActionResult Save([FromBody] IEnumerable<NotificationDto> notifications)
        {
            foreach (var notificationDto in notifications.Where(a => a.HasNotificationConfigured))
            {
                if (notificationDto.NotificationId.HasValue)
                {
                    var notification = _notificationsRepo.GetById(
                        notificationDto.NotificationId.Value);
                    if (notification == null)
                    {
                        return NotFound();
                    }

                    notification.NotificationScheduleTypeId = notificationDto.ScheduleTypeId;
                    notification.Roles = notificationDto.Roles;
                    notification.ShouldSendEmail = notificationDto.ShouldSendEmail ?? false;
                    notification.ShouldSendSms = notificationDto.ShouldSendSms ?? false;
                    notification.UpdatedBy = User.Identity.Name;
                    notification.UpdatedAt = DateTime.Now.ToUniversalTime();
                }
                else
                {
                    var notification = new Notification
                    {
                        NotificationTypeId = notificationDto.Id,
                        NotificationScheduleTypeId = notificationDto.ScheduleTypeId,
                        Roles = notificationDto.Roles,
                        ShouldSendEmail = notificationDto.ShouldSendEmail ?? false,
                        ShouldSendSms = notificationDto.ShouldSendSms ?? false,
                        CreatedBy = User.Identity.Name,
                        CreatedAt = DateTime.Now.ToUniversalTime(),
                    };
                    _notificationsRepo.Add(notification);
                }
            }

            _notificationsRepo.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var notification = _notificationsRepo.GetById(id);
            if (notification == null)
            {
                return NotFound();
            }

            try
            {
                _notificationsRepo.Delete(id);
                _notificationsRepo.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return BadRequest("The requested record could not be deleted because it has associated data.");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException != null ? e.InnerException.Message : e.Message);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SendNotification([FromBody] SendNotificationDto sendNotificationDto)
        {
            await _notificationsRepo.NotifyAsync(
                sendNotificationDto.NotificationTypeId, 
                _config[sendNotificationDto.SmsTextKey],
                _config[sendNotificationDto.EmalSubjectKey],
                _config[sendNotificationDto.EmailBodyKey]);
            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SendContactUs([FromBody] ContactUsDto contactUsDto)
        {
            try
            {
                var emailSubject = string.Format(
                   _config["EmailMessages:ContactUs:Subject"],
                   contactUsDto.Name);
                var emailBody = string.Format(
                    _config["EmailMessages:ContactUs:Body"],
                    contactUsDto.Email,
                    contactUsDto.Message);
                await _emailSender.SendEmailContactAsync(
                    _config["SendGrid:From"],
                    emailSubject,
                    emailBody);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException != null ? e.InnerException.Message : e.Message);
            }
        }
    }
}