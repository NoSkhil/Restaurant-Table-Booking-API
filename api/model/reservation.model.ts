import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Table } from './table.model';
import { Types } from 'mongoose';

export class Reservation {
// The table being reserved
  @prop({ type: Types.ObjectId, ref: getName(Table) })
  public table: Ref<Table>;

// Starting time of the reservation
  @prop({required: true})
  public start: Date;

// End time of the reservation
  @prop({required: true})
  public end: Date;
}

export const ReservationModel = getModelForClass(Reservation);
