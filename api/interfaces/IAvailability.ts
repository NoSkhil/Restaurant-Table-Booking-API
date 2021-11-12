export interface IAvailabilityDTO {
  seats: number;
  start: Date;
  end: Date;
  location?: "OUTDOOR" | "INDOOR";
}
