using System;
using System.Collections.Generic;
using System.Linq;
using AbaToday.DataAccess;
using AbaToday.Domain.Data;
using AbaToday.Repos.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AbaToday.Repos.Domain.Implementations
{
    public class SecurityRepo : ISecurityRepo
    {
        private readonly ApplicationDbContext _context;

        public SecurityRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<string> GetModules()
        {
            var actions = _context.ApplicationActions.Select(a => a.ModuleName).Distinct();
            return actions;
        }

        public IEnumerable<RoleAction> GetActionsByRoleId(Guid roleId)
        {
            if (roleId.ToString() != "undefined")
            {
                var actions = _context.RoleActions
                .Where(a => a.ApplicationRoleId == roleId)
                .Include(b => b.ApplicationAction);
                return actions;
            }
            return null;
        }

        public IEnumerable<RoleAction> GetActionsByRole(string moduleName, string roleId)
        {
            if (roleId.ToString() == "undefined")
            {
                return null;
            }

            var actions = _context.RoleActions
                .Include(b => b.ApplicationAction)
                .Where(a => a.ApplicationRoleId == new Guid(roleId) && a.ApplicationAction.ModuleName == moduleName);
            return actions;
        }

        public bool IsActionAssignedToRoles(IEnumerable<string> roleIds, string actionId)
        {
            return _context.RoleActions
                .Include(a => a.ApplicationRole)
                .Any(a => roleIds.Contains(a.ApplicationRole.Name) && a.ApplicationActionId == actionId);
        }

        public IEnumerable<ApplicationAction> GetActionsByModuleName(string moduleName, string roleId)
        {
            if (roleId == "undefined")
            {
                return null;
            }

            var actionsRole = _context.RoleActions.Where(a => a.ApplicationRoleId == new Guid(roleId)).Select(b => b.ApplicationActionId);
            var actions =
                _context.ApplicationActions.Where(a => !actionsRole.Contains(a.Id) && a.ModuleName.ToLower() == moduleName.ToLower());
            return actions;

        }

        public void DeleteActionsModuleByRoleId(string applicationId, Guid roleId)
        {
            if (string.IsNullOrEmpty(applicationId))
            {
                var roleActions = _context.RoleActions.Where(a => a.ApplicationRoleId == roleId);
                _context.RoleActions.RemoveRange(roleActions);
            }
            else
            {
                var roleActions = _context.RoleActions.FirstOrDefault(a =>
                    a.ApplicationActionId == applicationId && a.ApplicationRoleId == roleId);
                
                if (roleActions != null)
                {
                    _context.RoleActions.RemoveRange(roleActions);
                }
            }
        }

        public void DeleteActionsModuleByModuleName(string moduleName, Guid roleId)
        {
            var actionsId = _context.ApplicationActions.Where(a => a.ModuleName == moduleName).Select(b => b.Id);
            var roleActions = _context.RoleActions.Where(a =>
                actionsId.Contains(a.ApplicationActionId) && a.ApplicationRoleId == roleId);
            if (roleActions.Any())
            {
                _context.RoleActions.RemoveRange(roleActions);
            }
        }

        public RoleAction AddActionsModuleByRoleId(RoleAction roleAction)
        {
            return _context.RoleActions.Add(roleAction).Entity;
        }

        public string GetActionIdByActionName(string moduleName, string actionName)
        {
            return _context.ApplicationActions
                .FirstOrDefault(a => a.ModuleName == moduleName && a.ActionName == actionName)?.Id;
        }

        public Subscription AddSubscription(Subscription subscription)
        {
            return _context.Subscriptions.Add(subscription).Entity;
        }

        public IEnumerable<SubscriptionType> GetAllSubscriptionTypes()
        {
            return _context.SubscriptionTypes
                .Include(a => a.Subscriptions)
                .OrderBy(a => a.Name);
        }

        public bool SubscriptionHasRelatedData(Guid id)
        {
            var subscription = _context.SubscriptionTypes
                .Include(a => a.Subscriptions)
                .FirstOrDefault(a => a.Id == id);
            return subscription != null && subscription.Subscriptions.Any();
        }
        public MenuItem GetMenuItemsById(string id)
        {
            return _context.MenuItems.Find(id);
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _context.Users;
        }

        #region Subscriptions

        public IEnumerable<MenuItem> GetParentMenuItems(Guid subscriptionId, string parentMenuItemId = null)
        {
            return _context.SubscriptionTypeMenuItems
                .Include(a => a.MenuItem)
                .Include(a => a.SubscriptionType).ThenInclude(a => a.Subscriptions)
                .Where(a => a.SubscriptionType.Subscriptions.Select(b => b.Id).Contains(subscriptionId) 
                            && a.MenuItem.ParentMenuItemId == null)
                .OrderBy(a => a.MenuItem.Order)
                .Select(a => a.MenuItem);
        }

        public IEnumerable<MenuItem> GetMenuItemsForSubscriptionByParentId(Guid subscriptionId, string id)
        {
            var subscriptionMenuItemIds = _context.SubscriptionTypeMenuItems
                .Include(a => a.MenuItem)
                .Include(a => a.SubscriptionType).ThenInclude(a => a.Subscriptions)
                .Where(a => a.SubscriptionType.Subscriptions.Select(b => b.Id).Contains(subscriptionId))
                .Select(a => a.MenuItemId)
                .ToList();
            // return _context.SubscriptionTypeMenuItems
            //     .Include(a => a.MenuItem)
            //     .Where(a => a.SubscriptionTypeId == subscriptionId)
            //     .Select(a => a.MenuItem)
            //     .Where(a => a.ParentMenuItemId == id)
            //     .OrderBy(a => a.Order);
            
            return _context.MenuItems
                .Where(a => a.ParentMenuItemId == id && subscriptionMenuItemIds.Contains(a.Id))
                .OrderBy(a => a.Order);
        }

        public IEnumerable<MenuItem> GetSelectedMenuItemsBySubscriptionType(Guid id)
        {
            var menuItemsWithChildren = _context.MenuItems
                .Where(a => !string.IsNullOrEmpty(a.ParentMenuItemId))
                .Select(a => a.ParentMenuItemId);
            
            return _context.SubscriptionTypeMenuItems
                .Include(a => a.MenuItem)
                .Where(a => !menuItemsWithChildren.Contains(a.MenuItemId) && a.SubscriptionTypeId == id)
                .Select(a => a.MenuItem)
                .OrderBy(a => a.Order);
        }

        public IEnumerable<MenuItem> GetAvailableMenuItemsBySubscriptionType(Guid id)
        {
            var subscriptionMenuItemIds = _context.SubscriptionTypeMenuItems
                .Include(a => a.MenuItem)
                .Where(a => a.SubscriptionTypeId == id)
                .Select(a => a.MenuItemId);
            var menuItemsWithChildren = _context.MenuItems
                .Where(a => !string.IsNullOrEmpty(a.ParentMenuItemId))
                .Select(a => a.ParentMenuItemId);
            
            return _context.MenuItems
                .Where(a => !menuItemsWithChildren.Contains(a.Id) && !subscriptionMenuItemIds.Contains(a.Id))
                .OrderBy(a => a.Order);
        }

        public void DeleteMenuItemsBySubscriptionId(Guid id)
        {
            var menuItems = _context.SubscriptionTypeMenuItems.Where(a => a.SubscriptionTypeId == id);
            if (menuItems.Any())
            {
                _context.SubscriptionTypeMenuItems.RemoveRange(menuItems);
            }
        }

        public SubscriptionTypeMenuItem AddASubscriptionTypeMenuItem(SubscriptionTypeMenuItem menuItem)
        {
            return _context.SubscriptionTypeMenuItems.Add(menuItem).Entity;
        }

        public SubscriptionType GetSubscriptionTypeId(Guid id)
        {
            return _context.SubscriptionTypes.Find(id);
        }

        public SubscriptionType AddSubscriptionType(SubscriptionType subscription)
        {
            return _context.SubscriptionTypes.Add(subscription).Entity;
        }

        public void DeleteSubscriptionType(Guid id)
        {
            var item = _context.SubscriptionTypes.Find(id);
            if (item != null)
            {
                _context.SubscriptionTypes.Remove(item);
            }
        }

        #endregion

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}