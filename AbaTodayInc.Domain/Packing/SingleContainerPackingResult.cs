using System;

namespace AbaToday.Domain.Packing
{
    public class SingleContainerPackingResult
    {
        public Guid ContainerId { get; set; }
        public string ContainerCode { get; set; }
        public Vector3 ContainerDimensions { get; set; }
        public PackingItem[] PackedItems { get; set; }
        public PackingItem[] UnpackedItems { get; set; }
        public double ContainerPercentageUsed { get; set; }
        public double ContainerWeight { get; set; }
        public double ItemsPackedPercentage { get; set; }
    }
}
