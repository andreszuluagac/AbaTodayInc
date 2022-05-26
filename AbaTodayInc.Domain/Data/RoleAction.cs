using System;
using System.ComponentModel.DataAnnotations;

namespace AbaToday.Domain.Data
{
    public class RoleAction : BaseEntity
    {
        public Guid ApplicationRoleId { get; set; }
        public ApplicationRole ApplicationRole { get; set; }

        [Required]
        [MaxLength(8)]
        public string ApplicationActionId { get; set; }
        public ApplicationAction ApplicationAction { get; set; }
    }
}