using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.Web;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Helpers;
using AbaToday.Repos.Domain.Interfaces;
using AbaToday.Web.Dtos;
using AbaTodayInc.Repos.Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AbaToday.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private readonly IWebHostEnvironment _env;
        private readonly ISecurityRepo _securityRepo;
        private readonly ICustomerRepo _customerRepo;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        
        public AccountController(
                            IConfiguration config,
                            SignInManager<ApplicationUser> signInManager,
                            IWebHostEnvironment env,
                            ISecurityRepo securityRepo,
                            UserManager<ApplicationUser> userManager,
                            IEmailSender emailSender,
                            ICustomerRepo customerRepo)
        {
            _emailSender = emailSender;
            _config = config;
            _env = env;
            _securityRepo = securityRepo;
            _signInManager = signInManager;
            _userManager = userManager;
            _customerRepo = customerRepo;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LogIn([FromBody] LoginDto login)
        {
            try
            {
                const string errorMessage = "ACCOUNT.LOGIN.DATANOTVALID";
                if (!ModelState.IsValid)
                {
                    return BadRequest(errorMessage);
                }

                var user = await _userManager.FindByNameAsync(login.EmailAddress);
                if (user == null)
                {
                    return BadRequest(errorMessage);
                }

                if (!user.EmailConfirmed)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                    var callbackUrl = $"{baseUrl}/#/account/confirmEmail?code={HttpUtility.UrlEncode(code)}&user={user.UserName}";

                    await _emailSender.SendEmailAsync(
                        user.Email,
                        _config["EmailMessages:WelcomeMessage:Subject"],
                        string.Format(_config["EmailMessages:WelcomeMessage:Body"],
                            HtmlEncoder.Default.Encode(callbackUrl)));
                    return BadRequest("ACCOUNT.LOGIN.EMAILNOTCONFIRMED");
                }

                var result = await _signInManager.CheckPasswordSignInAsync(
                    user,
                    login.Password,
                    false);
                if (!result.Succeeded)
                {
                    return BadRequest(errorMessage);
                }

                var identityToken = GetJwtToken(user);

                return Ok(new LoginResponseDto
                {
                    UserName = login.EmailAddress,
                    IdentityToken = identityToken,
                    FullName = user.FullName,
                    Roles = _userManager.GetRolesAsync(user).Result
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] Customer customer)
        {
            try
            {
                const string errorMessage = "Register data is invalid.";
                if (!ModelState.IsValid)
                {
                    return BadRequest(errorMessage);
                }

                customer.Id = Guid.NewGuid();
                customer.PasswordHash = customer.PasswordHash.GetHashCode().ToString();

                var response = _customerRepo.Add(customer);
                if (!response)
                {
                    return BadRequest($"Error trying register Customer: {response}");
                }

                return Ok("Customer register succesfully");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByNameAsync(resetPasswordDto.EmailAddress);
            if (user == null)
            {
                return BadRequest("User does not exist.");
            }

            var result = await _userManager.ResetPasswordAsync(
                user,
                resetPasswordDto.Code,
                resetPasswordDto.Password);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "Reset password data is not valid.");
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromBody] AuthTokenDto authTokenDto)
        {
            var errorMessage = "Invalid username or confirmation token.";
            if (!ModelState.IsValid)
            {
                return BadRequest(errorMessage);
            }

            var user = await _userManager.FindByNameAsync(authTokenDto.UserId);
            if (user == null)
            {
                return BadRequest(errorMessage);
            }

            var result = await _userManager.ConfirmEmailAsync(user, authTokenDto.Code);

            if (result.Succeeded)
            {
                return Ok();
            }

            var error = result.Errors.FirstOrDefault();
            return BadRequest(error != null ? error.Description : errorMessage);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SendForgotPasswordEmail([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(forgotPasswordDto.EmailAddress);
                if (user == null)
                {
                    return BadRequest("User does not exist.");
                }

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                var callbackUrl = $"{baseUrl}/#/account/passwordReset?code={HttpUtility.UrlEncode(code)}&user={user.UserName}";

                await _emailSender.SendEmailAsync(
                    user.Email,
                    _config["EmailMessages:ForgotPassword:Subject"],
                    string.Format(
                        _config["EmailMessages:ForgotPassword:Body"],
                        baseUrl,
                        callbackUrl));

                return Ok();
            }

            return BadRequest(ModelState);
        }

        private object GetJwtToken(ApplicationUser user)
        {
            //Create the token
            var claims = new List<Claim>
            {
                //This claim is needed so _userManager.GetUserId returns the Id instead of the username
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            //Get roles for user and add them to claims
            var roles = _userManager.GetRolesAsync(user).Result;
            claims.AddRange(roles.Select(a => new Claim(ClaimTypes.Role, a)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Tokens:Issuer"], _config["Tokens:Audience"], claims,
                expires: DateTime.Now.AddYears(1), signingCredentials: creds);
            var results = new { Token = new JwtSecurityTokenHandler().WriteToken(token), Expiration = token.ValidTo };
            return results;
        }

        #region ManageProfile

        [HttpGet]
        public async Task<IActionResult> GetProfileByEmail()
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest("User does not exist.");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var manageProfileDto = new ManageProfileDto
            {
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber?.Split(" ").Length > 1 ? user.PhoneNumber.Split(" ")[1] : user.PhoneNumber,
                PhoneNumberCode = user.PhoneNumber?.Split(" ").Length > 1 ? user.PhoneNumber.Split(" ")[0] : "1",
                Roles = roles,
                Image = user.Image
            };

            return Ok(manageProfileDto);
        }

        [HttpPost]
        public async Task<IActionResult> SaveProfile([FromBody] ManageProfileDto manageProfileDto)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest("User does not exist.");
            }

            user.FullName = manageProfileDto.FullName;
            user.PhoneNumber = manageProfileDto.PhoneNumber != null ? manageProfileDto.PhoneNumberCode + " " + manageProfileDto.PhoneNumber : manageProfileDto.PhoneNumber;
            user.Image = manageProfileDto.Image;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var error = result.Errors.FirstOrDefault();
                return BadRequest(error != null ? error.Description : "User data is invalid.");
            }

            if (string.IsNullOrEmpty(manageProfileDto.Password))
            {
                return Ok(result);
            }

            var resultChangePassword =
                await _userManager.ChangePasswordAsync(user, manageProfileDto.Password, manageProfileDto.NewPassword);
            if (!resultChangePassword.Succeeded)
            {
                return BadRequest(string.Join(",", resultChangePassword.Errors.Select(a => a.Code)));
            }

            return Ok(result);
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public IActionResult Upload(Guid? id)
        {
            try
            {
                var userId = id ?? Guid.NewGuid();
                var webRootPath = _env.WebRootPath;

                var file = Request.Form.Files[0];
                var folderName = Path.Combine("uploads", "profiles");
                var pathToSave = Path.Combine(webRootPath, folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var ext = fileName.Split(".");
                    var item = ext.Length - 1;
                    fileName = userId + "." + ext[item];
                    var fullPath = Path.Combine(pathToSave, fileName);

                    if (!Directory.Exists(pathToSave))
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(userId);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        #endregion
    }
}