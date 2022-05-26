using System;
using System.Collections.Generic;
using System.Linq;
using AbaToday.Domain.EnviaShipping.Request;
using AbaToday.Domain.Packing;
using AbaToday.Helpers;
using AbaToday.Repos.Domain.Interfaces;
using AbaToday.Web.Dtos;

namespace AbaToday.Web.ClientHelpers
{
    public class AbaTodayIncClientHelpers : IAbaTodayIncClientHelpers
    {
        private readonly ISecurityRepo _securityRepo;

        public AbaTodayIncClientHelpers(
            ISecurityRepo securityRepo)
        {
            _securityRepo = securityRepo;
        }

        #region Private Methods

        #endregion
    }
}