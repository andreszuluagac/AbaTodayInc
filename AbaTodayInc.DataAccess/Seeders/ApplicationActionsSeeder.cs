using System.Threading.Tasks;
using AbaToday.Domain.Data;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.DataAccess.Seeders
{
    public class ApplicationActionsSeeder
    {
        private readonly ApplicationDbContext _context;

        public ApplicationActionsSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedActions()
        {
            //Users
            await CreateApplicationAction("USRLIST", "Manage Users", "List");
            await CreateApplicationAction("USRCREA", "Manage Users", "Create");
            await CreateApplicationAction("USREDIT", "Manage Users", "Edit");
            await CreateApplicationAction("USRDEL", "Manage Users", "Delete");
            //Roles
            await CreateApplicationAction("ROLLIST", "Manage Roles", "List");
            await CreateApplicationAction("ROLCREA", "Manage Roles", "Create");
            await CreateApplicationAction("ROLEDIT", "Manage Roles", "Edit");
            await CreateApplicationAction("ROLDEL", "Manage Roles", "Delete");

        }

        private async Task CreateApplicationAction(string id, string moduleName, string actionName)
        {
            var appAction = await _context.ApplicationActions.FirstOrDefaultAsync(a => a.Id == id);
            if (appAction == null)
            {
                appAction = new ApplicationAction
                {
                    Id = id,
                    ModuleName = moduleName,
                    ActionName = actionName
                };
                await _context.ApplicationActions.AddAsync(appAction);
                await _context.SaveChangesAsync();
            }
        }

    }
}