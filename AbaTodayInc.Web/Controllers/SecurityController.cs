using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain;
using AbaToday.Web.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using AbaToday.Repos.Domain.Interfaces;

namespace AbaToday.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/{id?}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SecurityController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ISecurityRepo _securityRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly INotificationsRepo _notificationsRepo;

        public SecurityController(
            IConfiguration config,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            ISecurityRepo securityRepo,
            INotificationsRepo notificationsRepo,
            IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _roleManager = roleManager;
            _userManager = userManager;
            _securityRepo = securityRepo;
            _notificationsRepo = notificationsRepo;
            _config = config;
        }

        [HttpGet]
        public IActionResult TryAuthorize(string id)
        {
            var user = _userManager.FindByNameAsync(User.Identity.Name).Result;
            var roles = _userManager.GetRolesAsync(user).Result;
            if (roles.Contains("subscriptionadmin") || roles.Contains("sysadmin"))
            {
                return Ok();
            }

            var isAuthorized = _securityRepo.IsActionAssignedToRoles(roles, id);
            if (isAuthorized)
            {
                return Ok();
            }

            return Unauthorized();
        }

        #region Users

        [HttpGet]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDto
            {
                Id = user.Id,
                EmailAddress = user.UserName,
                FullName = user.FullName,
                Title = user.Title,
                PhoneCode = user.PhoneNumber.Split(" ").Length > 1 ? user.PhoneNumber.Split(" ")[1] : user.PhoneNumber,
                PhoneNumber = user.PhoneNumber.Split(" ").Length > 1 ? user.PhoneNumber.Split(" ")[0] : "1",
                DaysSchedule = user.DaysSchedule,
                ReportsTo = user.ReportsTo,
                StartDate = user.StartDate,
                TimeScheduleStart = user.TimeScheduleStart,
                TimeScheduleEnd = user.TimeScheduleEnd,
                HoursPerWeek = user.HoursPerWeek,
                TrackingHoursMandatory = user.TrackingHoursMandatory,
                IsActive = user.IsActive,
                Image = user.Image
            });
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = userDto.EmailAddress,
                Email = userDto.EmailAddress,
                FullName = userDto.FullName,
                PhoneNumber = userDto.PhoneCode + " " + userDto.PhoneNumber,
                Title = userDto.Title,
                DaysSchedule = userDto.DaysSchedule,
                ReportsTo = userDto.ReportsTo,
                StartDate = userDto.StartDate,
                TimeScheduleStart = userDto.TimeScheduleStart?.ToUniversalTime(),
                TimeScheduleEnd = userDto.TimeScheduleEnd?.ToUniversalTime(),
                HoursPerWeek = userDto.HoursPerWeek,
                TrackingHoursMandatory = userDto.TrackingHoursMandatory,
                IsActive = userDto.IsActive
            };
            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "User data is not valid.");
            }

            #region Send email to newly created user

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var callbackUrl = $"{baseUrl}/#/account/passwordReset?code={HttpUtility.UrlEncode(code)}&user={user.UserName}";

            await _emailSender.SendEmailAsync(
                user.Email,
                _config["EmailMessages:SetPassword:Subject"],
                string.Format(
                    _config["EmailMessages:SetPassword:Body"],
                    baseUrl,
                    callbackUrl));

            #endregion

            #region Send Notifications

            //var manageUsersUrl = $"{baseUrl}/#/security/users";
            //var smsText = string.Format(_config["Notifications:SystemEvents:Security:UserCreated:SmsText"], user.FullName);
            //var emailSubject = _config["Notifications:SystemEvents:Security:UserCreated:EmailSubject"];
            //var emailBody = string.Format(_config["Notifications:SystemEvents:Security:UserCreated:EmailBody"], user.FullName, manageUsersUrl);
            //await _notificationsRepo.NotifyAsync("USCR", smsText, emailSubject, emailBody);

            #endregion

            return Ok(user.Id);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto userDto)
        {
            if (userDto?.Id == null)
            {
                return BadRequest("No valid User was posted.");
            }

            var user = _userManager.Users.FirstOrDefault(a => a.Id == userDto.Id);
            if (user == null)
            {
                return NotFound();
            }

            user.FullName = userDto.FullName;
            user.PhoneNumber = userDto.PhoneCode + " " + userDto.PhoneNumber;
            user.Title = userDto.Title;
            user.DaysSchedule = userDto.DaysSchedule;
            user.ReportsTo = userDto.ReportsTo;
            user.StartDate = userDto.StartDate;
            user.TimeScheduleStart = userDto.TimeScheduleStart;
            user.TimeScheduleEnd = userDto.TimeScheduleEnd;
            user.HoursPerWeek = userDto.HoursPerWeek;
            user.TrackingHoursMandatory = userDto.TrackingHoursMandatory;
            user.IsActive = userDto.IsActive;

            if (!TryValidateModel(user))
            {
                return BadRequest(ModelState);
            }

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "User data is not valid.");
            }

            #region Send Notifications

            //var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            //var manageUsersUrl = $"{baseUrl}/#/security/users";
            //var smsText = string.Format(_config["Notifications:SystemEvents:Security:UserModified:SmsText"], user.FullName);
            //var emailSubject = _config["Notifications:SystemEvents:Security:UserModified:EmailSubject"];
            //var emailBody = string.Format(_config["Notifications:SystemEvents:Security:UserModified:EmailBody"], user.FullName, manageUsersUrl);
            //await _notificationsRepo.NotifyAsync("USMD", smsText, emailSubject, emailBody);

            #endregion

            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = _userManager.FindByIdAsync(id.ToString()).Result;
            if (user == null)
            {
                return NotFound();
            }

            var result = _userManager.DeleteAsync(user).Result;
            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "User could not be deleted.");
            }

            #region Send Notifications

            //var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            //var manageUsersUrl = $"{baseUrl}/#/security/users";
            //var smsText = string.Format(_config["Notifications:SystemEvents:Security:UserDeleted:SmsText"], user.FullName);
            //var emailSubject = _config["Notifications:SystemEvents:Security:UserDeleted:EmailSubject"];
            //var emailBody = string.Format(_config["Notifications:SystemEvents:Security:UserDeleted:EmailBody"], user.FullName, manageUsersUrl);
            //await _notificationsRepo.NotifyAsync("USDE", smsText, emailSubject, emailBody);

            #endregion

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserByUserName(string id)
        {
            var user = await _userManager.FindByNameAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDto
            {
                Id = user.Id,
                EmailAddress = user.UserName,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                IsActive = user.IsActive,
                Image = user.Image,
                Title = user.Title,
                DaysSchedule = user.DaysSchedule,
                ReportsTo = user.ReportsTo,
                StartDate = user.StartDate,
                TimeScheduleStart = user.TimeScheduleStart,
                TimeScheduleEnd = user.TimeScheduleEnd,
                HoursPerWeek = user.HoursPerWeek,
                TrackingHoursMandatory = user.TrackingHoursMandatory,
               
            });
        }

        [HttpGet]
        public async Task<IActionResult> UpdateUserLoggedState(Guid id)
        {
            var user = _userManager.FindByIdAsync(id.ToString()).Result;
            await _userManager.UpdateAsync(user);
            return Ok();
        }

        #endregion

        #region Roles

        [HttpGet]
        public async Task<IActionResult> GetRoleById(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());

            if (role == null)
            {
                return NotFound();
            }

            return Ok(new RoleDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description,
                IsActive = role.IsActive
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleDto roleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = new ApplicationRole
            {
                Name = roleDto.Name,
                Description = roleDto.Description,
                IsActive = roleDto.IsActive
            };
            var result = await _roleManager.CreateAsync(role);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "Role data is not valid.");
            }

            return Ok(role.Id);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRole([FromBody] RoleDto roleDto)
        {
            if (roleDto?.Id == null)
            {
                return BadRequest("No valid Role was posted.");
            }

            var role = _roleManager.Roles.FirstOrDefault(a => a.Id == (Guid)roleDto.Id);
            if (role == null)
            {
                return NotFound();
            }

            role.Name = roleDto.Name;
            role.Description = roleDto.Description;
            role.IsActive = roleDto.IsActive;

            if (!TryValidateModel(role))
            {
                return BadRequest(ModelState);
            }

            var result = await _roleManager.UpdateAsync(role);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "User data is not valid.");
            }

            return Ok(result);
        }

        [HttpDelete]
        public IActionResult DeleteRole(Guid id)
        {
            var role = _roleManager.FindByIdAsync(id.ToString()).Result;
            if (role == null)
            {
                return NotFound();
            }

            var result = _roleManager.DeleteAsync(role).Result;
            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "Role could not be deleted.");
            }

            return Ok();
        }

        #endregion

        #region RoleActions

        [HttpGet]
        public IActionResult GetRolesBySubscriptionId()
        {
            var roles = _roleManager.Roles
                .Select(a => new RoleDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    IsActive = a.IsActive
                });

            return Ok(roles);
        }

        [HttpGet]
        public IActionResult GetModules()
        {
            var modules = _securityRepo.GetModules().Select(a => new ActionDto
            {
                Id = null,
                ActionName = null,
                ModuleName = a
            });

            return Ok(modules);
        }

        [HttpGet]
        public IActionResult GetActionsByRoleId(Guid roleId)
        {
            var actions = _securityRepo.GetActionsByRoleId(roleId).Select(a => new RoleActionDto
            {
                ApplicationActionId = a.ApplicationActionId,
                ActionName = a.ApplicationAction.ActionName,
                ApplicationRoleId = a.ApplicationRoleId
            });
            return Ok(actions);
        }

        [HttpGet]
        public IActionResult GetActionsByRole(string id, string roleId)
        {
            var actions = _securityRepo.GetActionsByRole(id, roleId).Select(a => new RoleActionDto
            {
                ApplicationActionId = a.ApplicationActionId,
                ActionName = a.ApplicationAction.ActionName,
                ApplicationRoleId = a.ApplicationRoleId
            });
            return Ok(actions);
        }

        [HttpGet]
        public IActionResult GetActionsByRoleName(string id)
        {
            var roleId = _roleManager.FindByNameAsync(id).Result.Id;

            var actions = _securityRepo.GetActionsByRoleId(roleId).Select(a => new ActionDto
            {
                ModuleName = a.ApplicationAction.ModuleName,
                ActionName = a.ApplicationAction.ActionName
            });
            return Ok(actions);
        }

        [HttpGet]
        public IActionResult GetActionsByModuleName(string id, string roleId)
        {
            var actions = _securityRepo.GetActionsByModuleName(id, roleId).ToList().Select(a => new ActionDto
            {
                Id = a.Id,
                ActionName = a.ActionName,
                ModuleName = a.ModuleName
            });
            return Ok(actions);
        }

        [HttpPost]
        public IActionResult UpdateRoleActions([FromBody] ActionDto[] actionsDto)
        {
            var roleId = new Guid(actionsDto.FirstOrDefault(a => a.RoleId != null)?.RoleId ?? string.Empty);
            var moduleName = actionsDto.FirstOrDefault(a => a.ModuleName != null)?.ModuleName;
            _securityRepo.DeleteActionsModuleByModuleName(moduleName, roleId);

            foreach (var item in actionsDto)
            {
                var roleAction = new RoleAction
                {
                    ApplicationActionId = item.Id ?? _securityRepo.GetActionIdByActionName(moduleName, item.ActionName),
                    ApplicationRoleId = roleId,
                    CreatedAt = DateTime.Now.ToUniversalTime(),
                    CreatedBy = User.Identity.Name,
                };
                _securityRepo.AddActionsModuleByRoleId(roleAction);
                _securityRepo.SaveChanges();
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteRoleActions(Guid id)
        {
            _securityRepo.DeleteActionsModuleByRoleId(null, id);
            _securityRepo.SaveChanges();
            return Ok();
        }

        #endregion

        #region UsersRol

        [HttpGet]
        public IActionResult GetRolesInUsersBySubscriptionId()
        {
            var roles = _roleManager.Roles
                .Select(a => new RoleDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    IsActive = a.IsActive
                });

            return Ok(roles);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersBySubscriptionId(string id)
        {
            if (id == null)
            {
                var users = _userManager.Users.Select(a =>
                        new UserDto
                        {
                            Id = a.Id,
                            FullName = a.FullName,
                            EmailAddress = a.Email,
                            CurrentUser = User.Identity.Name
                        });

                return Ok(users);
            }
            else
            {
                var roleName = _roleManager.FindByIdAsync(id).Result.Name;
                var usersByRol = await _userManager.GetUsersInRoleAsync(roleName);
                var users = _userManager.Users.Select(a =>
                        new UserDto
                        {
                            Id = a.Id,
                            FullName = a.FullName,
                            EmailAddress = a.Email,
                            CurrentUser = User.Identity.Name
                        });

                var userList = usersByRol.Select(a => a.Id);
                users = users.Where(a => !userList.Contains((Guid)a.Id));

                return Ok(users);
            }
        }

        [HttpGet]
        public IActionResult GetUsersBySubscriptionIdByRoleId(Guid id)
        {
            var roleName = _roleManager.FindByIdAsync(id.ToString()).Result.Name;
            var usersByRol = _userManager.GetUsersInRoleAsync(roleName)
                .Result
                .Select(a => new UserDto
                {
                    FullName = a.FullName
                });
            return Ok(usersByRol);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRoleUsers([FromBody] UserDto[] usersDto)
        {
            if (usersDto.FirstOrDefault() == null)
            {
                return NotFound();
            }

            var roleId = usersDto.FirstOrDefault()?.RoleId;
            var roleName = _roleManager.FindByIdAsync(roleId).Result.Name;
            var usersByRole = _userManager.GetUsersInRoleAsync(roleName);

            foreach (var item in usersByRole.Result)
            {
                await _userManager.RemoveFromRoleAsync(item, roleName);
            }

            foreach (var item in usersDto)
            {
                var fullName = item.FullName;
                var user = _userManager.Users.FirstOrDefault(a => a.FullName == fullName);
                await _userManager.RemoveFromRoleAsync(user, roleName);
                await _userManager.AddToRoleAsync(user, roleName);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRoleUsers(Guid id)
        {
            var roleName = _roleManager.FindByIdAsync(id.ToString()).Result.Name;
            var usersByRole = _userManager.GetUsersInRoleAsync(roleName);

            foreach (var item in usersByRole.Result)
            {
                await _userManager.RemoveFromRoleAsync(item, roleName);
            }

            return Ok();
        }

        #endregion
    }
}