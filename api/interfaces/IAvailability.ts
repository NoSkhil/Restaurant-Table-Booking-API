export interface IAvailabilityDTO {
  seats: number;
  start: Date;
  end: Date;
  type?: "OUTDOOR" | "INDOOR";
}
