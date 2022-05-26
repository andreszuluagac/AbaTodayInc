using System;
using System.Collections.Generic;

namespace AbaToday.Domain.Packing
{

    public class PackedCartonStock
    {
        public Guid ContainerId { get; set; }
        public string ContainerCode { get; set; }
        public Vector3 ContainerDimensions { get; set; }
        public double ContainerPercentageUsed { get; set; }
        public double ContainerWeight { get; set; }
        public double ItemsPackedPercentage { get; set; }
        public IEnumerable<PackingItem> PackedItems { get; set; }
    }
}
