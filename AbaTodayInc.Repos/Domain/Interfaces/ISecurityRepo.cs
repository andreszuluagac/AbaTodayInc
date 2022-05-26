using System;
using System.Collections.Generic;
using AbaToday.Domain.Data;

namespace AbaToday.Repos.Domain.Interfaces
{
    public interface ISecurityRepo
    {
        IEnumerable<string> GetModules();
        public IEnumerable<RoleAction> GetActionsByRole(string moduleName, string roleId);
        public IEnumerable<RoleAction> GetActionsByRoleId(Guid roleId);
        bool IsActionAssignedToRoles(IEnumerable<string> roleIds, string actionId);
        IEnumerable<ApplicationAction> GetActionsByModuleName(string moduleName, string roleId);
        public void DeleteActionsModuleByRoleId(string applicationId, Guid roleId);
        public void DeleteActionsModuleByModuleName(string moduleName, Guid roleId);
        public string GetActionIdByActionName(string moduleName, string actionName);
        public RoleAction AddActionsModuleByRoleId(RoleAction roleAction);
        public Subscription AddSubscription(Subscription subscription);
        public void SaveChanges();

        #region Subscriptions
        
        IEnumerable<SubscriptionType> GetAllSubscriptionTypes();
        bool SubscriptionHasRelatedData(Guid id);
        MenuItem GetMenuItemsById(string id);
        IEnumerable<MenuItem> GetParentMenuItems(Guid subscriptionId, string parentMenuItemId = null);
        IEnumerable<MenuItem> GetMenuItemsForSubscriptionByParentId(Guid subscriptionId, string parentId);
        IEnumerable<MenuItem> GetSelectedMenuItemsBySubscriptionType(Guid id);
        IEnumerable<MenuItem> GetAvailableMenuItemsBySubscriptionType(Guid id);
        void DeleteMenuItemsBySubscriptionId(Guid id);
        SubscriptionTypeMenuItem AddASubscriptionTypeMenuItem(SubscriptionTypeMenuItem menuItem);
        SubscriptionType GetSubscriptionTypeId(Guid id);
        SubscriptionType AddSubscriptionType(SubscriptionType subscription);
        void DeleteSubscriptionType(Guid id);

        #endregion

    }
}