namespace AbaToday.Domain.EnviaShipping.Response
{
    //TODO Julián: This need to be fully integrated into the Carriers admin page.
    public class EnviaCarrier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Endpoint { get; set; }
        public string CountryCode { get; set; }
        public string TrackUrl { get; set; }
        public string Logo { get; set; }
        public int BoxWeightLimit { get; set; }
        public int? PalletWeightLimit { get; set; }
        public int PickupSameDay { get; set; }
        public int? PickupStartTime { get; set; }
        public int? PickupEndTime { get; set; }
        public int? PickupSpanTime { get; set; }
        public int? PickupSameDayLimitTime { get; set; }
    }
}