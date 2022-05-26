using System;

namespace AbaToday.Web.Dtos
{
    public class RoleDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool HasRelatedData { get; set; }
    }
}