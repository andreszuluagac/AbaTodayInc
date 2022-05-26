using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain.Interfaces;
using AbaToday.Web.ClientHelpers;
using AbaToday.Web.Dtos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/{id?}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class MasterDataController : Controller
    {
        private readonly ISecurityRepo _securityRepo;
        private readonly IMasterEntityRepo _masterEntityRepo;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAbaTodayIncClientHelpers _abaTodayIncClientHelpers;

        public MasterDataController(
            ISecurityRepo securityRepo,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IMasterEntityRepo masterEntityRepo,
            IAbaTodayIncClientHelpers abaTodayIncClientHelpers)
        {
            _masterEntityRepo = masterEntityRepo;
            _roleManager = roleManager;
            _userManager = userManager;
            _securityRepo = securityRepo;
            _abaTodayIncClientHelpers = abaTodayIncClientHelpers;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetCountries()
        {
            try
            {
                return Ok(_masterEntityRepo.GetAllCountries().Select(a => new BasicSelectListItemDto
                {
                    Value = a.Id.ToString(),
                    Label = a.Name,
                    AdditionalData = a.Code
                }));
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException != null ? e.InnerException.Message : e.Message);
            }
        }

        /// <summary>
        ///     Gets all entities from database
        /// </summary>
        /// <param name="id">
        ///     Entity type: 'businesses', 'customers', 'sites', 'lists', 'products', 'lists', 'divisions' or 'listItems'
        /// </param>
        /// <param name="parentEntityId">
        ///     If getting child entities, this is the id of the parent entity.
        ///     Works for 'divisions' (children of 'businesses') and 'listItems' (children of 'lists').
        /// </param>
        /// <param name="filterData">
        ///     Filter Data for Entity search.
        /// </param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult SearchEntitiesByEntityType(
            string id,
            string parentEntityId = null,
            EntityFilterDataDto filterData = null,
            bool showFinalized = false)
        {
            try
            {
                switch (id.ToLower())
                {
                    case "roles":
                        return Ok(GetAllRoles());
                    case "users":
                        return Ok(GetAllUsers());
                    default:
                        return BadRequest(
                            "Parameter 'id' should be 'users', 'roles'");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException != null ? e.InnerException.Message : e.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteEntity(string id, Guid entityId)
        {
            try
            {
                switch (id.ToLower())
                {
                    case "roles":
                        DeleteRole(entityId);
                        return Ok();
                    case "users":
                        DeleteUser(entityId);
                        return Ok();
                    default:
                        return BadRequest(
                            "Id should be 'roles' or 'users'");
                }
            }
            catch (DbUpdateException)
            {
                return BadRequest("The requested record could not be deleted because it has associated data.");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException != null ? e.InnerException.Message : e.Message);
            }
        }

        #region Private methods to get lists of entities
        private EntityListDto<RoleDto> GetAllRoles()
        {
            IEnumerable<ApplicationRole> roles = _roleManager.Roles;

            var queryString = Request.Query;

            #region Global Filter

            string filter = queryString["$filter"];
            if (filter != null)
            {
                roles = roles.Where(a =>
                    FieldContainsFilter(a.Name, filter) ||
                    FieldContainsFilter(a.Description, filter));
            }

            #endregion

            var count = roles.Count();

            #region Pagination

            if (int.TryParse(queryString["$take"], out var take) &&
                int.TryParse(queryString["$skip"], out var skip))
            {
                roles = roles.Skip(skip).Take(take != 0 ? take : 10);
            }
            else
            {
                roles = roles.Take(10);
            }

            #endregion

            var rolesDto = roles.ToList().Select(a => new RoleDto
            {
                Id = a.Id,
                Name = a.Name,
                Description = a.Description,
                IsActive = a.IsActive,
                HasRelatedData = _userManager.GetUsersInRoleAsync(a.Name).Result.Any()
            }).AsQueryable();

            #region OrderBy

            string orderBy = queryString["$orderBy"];
            if (orderBy != null)
            {
                var sortOrder = Convert.ToInt32(queryString["$sortOrder"]);
                rolesDto = rolesDto.OrderBy(orderBy + (sortOrder == -1 ? " DESC" : ""));
            }

            #endregion

            return new EntityListDto<RoleDto>
            {
                Entities = rolesDto,
                Count = count
            };
        }

        private EntityListDto<UserDto> GetAllUsers()
        {
            var user = _userManager.FindByNameAsync(User.Identity.Name).Result;
            //Do not include current user
            IEnumerable<ApplicationUser> users = _userManager.Users
                .Where(a => a.Id != user.Id);

            var queryString = Request.Query;

            #region Global Filter

            string filter = queryString["$filter"];
            if (filter != null)
            {
                users = users.Where(a =>
                    FieldContainsFilter(a.UserName, filter) ||
                    FieldContainsFilter(a.FullName, filter) ||
                    FieldContainsFilter(a.PhoneNumber, filter) ||
                    FieldContainsFilter(a.DaysSchedule, filter) ||
                    FieldContainsFilter(a.HoursPerWeek, filter) ||
                    FieldContainsFilter(a.ReportsTo, filter) ||
                    FieldContainsFilter(a.StartDate, filter) ||
                    FieldContainsFilter(a.TimeScheduleStart, filter) ||
                    FieldContainsFilter(a.TimeScheduleEnd, filter) ||
                    FieldContainsFilter(a.Title, filter) ||
                    FieldContainsFilter(a.TrackingHoursMandatory, filter));
            }
            #endregion

            var count = users.Count();

            #region Pagination

            if (int.TryParse(queryString["$take"], out var take) &&
                int.TryParse(queryString["$skip"], out var skip))
            {
                users = users.Skip(skip).Take(take != 0 ? take : 10);
            }
            else
            {
                users = users.Take(10);
            }

            #endregion

            var usersDto = users.ToList().Select(a => new UserDto
            {
                Id = a.Id,
                EmailAddress = a.UserName,
                FullName = a.FullName,
                PhoneNumber = a.PhoneNumber,
                IsActive = a.IsActive,
                DaysSchedule = a.DaysSchedule,
                HoursPerWeek = a.HoursPerWeek,
                ReportsTo = a.ReportsTo,
                StartDate = a.StartDate,
                TimeScheduleStart = a.TimeScheduleStart,
                TimeScheduleEnd = a.TimeScheduleEnd,
                Title = a.Title,
                TrackingHoursMandatory = a.TrackingHoursMandatory,
                HasRelatedData = _userManager.GetRolesAsync(a).Result.Any() ||
                                 _userManager.IsInRoleAsync(a, "sysadmin").Result ||
                                 _userManager.IsInRoleAsync(a, "subscriptionadmin").Result
            }).AsQueryable();

            #region OrderBy

            string orderBy = queryString["$orderBy"];
            if (orderBy != null)
            {
                var sortOrder = Convert.ToInt32(queryString["$sortOrder"]);
                usersDto = usersDto.OrderBy(orderBy + (sortOrder == -1 ? " DESC" : ""));
            }

            #endregion

            return new EntityListDto<UserDto>
            {
                Entities = usersDto,
                Count = count
            };
        }

        #endregion

        #region Account Deletion Methods

        [HttpGet]
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

        [HttpGet]
        public IActionResult DeleteUser(Guid id)
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

            return Ok();
        }

        #endregion

        #region Helper methods

        private static bool FieldContainsFilter(object fieldValue, string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return true;
            }

            return fieldValue != null &&
                   !string.IsNullOrEmpty(fieldValue.ToString()) &&
                   fieldValue.ToString()!.ToLower().Contains(filter.ToLower());
        }

        #endregion
    }
}