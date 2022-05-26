using System;
using System.Linq;
using System.Threading.Tasks;
using AbaToday.Domain.Data;
using Microsoft.AspNetCore.Identity;

namespace AbaToday.DataAccess.Seeders
{
    public class ApplicationUserSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public ApplicationUserSeeder(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedUsersAndRoles()
        {
            await CreateRole("sysadmin");
            await CreateRole("subscriptionadmin");
            //await CreateRole("inventorycontrol");
            await CreateUser("tech@abatoday.com", "AbaToday system admin", "sysadmin");
            //await AssignActionToInventoryControlRole("inventorycontrol");
        }

        private async Task CreateRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                role = new ApplicationRole
                {
                    Name = roleName
                };
                var result = await _roleManager.CreateAsync(role);

                if (result.Succeeded)
                {
                    _context.SaveChanges();
                }
            }
        }

        private async Task CreateUser(string email, string fullName, string roleName = null)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    Email = email,
                    UserName = email,
                    EmailConfirmed = true,
                    FullName = fullName,
                    IsActive = true
                };
                var result = await _userManager.CreateAsync(user, "1234Abcd.");

                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(roleName))
                    {
                        await _userManager.AddToRoleAsync(user, roleName);
                    }
                    _context.SaveChanges();
                }
            }
        }
    }
}