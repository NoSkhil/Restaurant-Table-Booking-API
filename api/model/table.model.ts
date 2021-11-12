import { getModelForClass, getName, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Table {

// The table number
  @prop({required:true, unique:true})
  public number: number;

// Seating capacity of the table
  @prop({required:true})
  public seats: number;

// Status of the table (open for reservations or blocked by the staff/admin).
  @prop({
    required: true,
    enum: ["OPEN", "BLOCKED"]})
  public status: string;

// Specifies whether the table is an indoor table or outdoor table.
  @prop({
    required: true,
    enum: ["INDOOR", "OUTDOOR"]})
  public location: string;
}

export const TableModel = getModelForClass(Table);
