import { Service } from 'typedi';
import { ReservationModel } from '../../model/reservation.model';
import { TableModel } from '../../model/table.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { IReservationDTO } from '../../interfaces/IReservation';
import { IBlockDTO } from '../../interfaces/IBlock';
import { IAvailabilityDTO } from '../../interfaces/IAvailability';

@Service('reservation.service')
class ReservationService {
  private reservationModel: ReturnModelType<typeof ReservationModel>;
  private tableModel: ReturnModelType<typeof TableModel>;
  constructor() {
    this.reservationModel = ReservationModel;
    this.tableModel = TableModel;
  }


/*
 Request the user to select - 
 1) number of seats required.
 2) desired starting time of reservation
 3) desired end time of the reservation
 4) OPTIONAL - location of table (indoor or outdoor table)
*/ 

  fetchAvailableTables = async (availabilityDTO: IAvailabilityDTO) => {
    let bookedTableIds : any[] = [];

  // Find all existing reservations between the requested time slots.
    const reservations = await this.reservationModel.find({ $or: [
    { start: { $gte: availabilityDTO.start, $lte : availabilityDTO.end } },
    { end: { $lte: availabilityDTO.end , $gte : availabilityDTO.start }}
    ]});
    reservations.map(reservation => {
    bookedTableIds.push(reservation.table);
    }); 

  /* 
    Find all the available tables by excluding
    -the reserved tables for the chosen timeframe
    -tables without enough seats
    -tables in an undesired location. (If location preference is given by the user)
  */
    let searchFilter = availabilityDTO.location 
                    ? {location: availabilityDTO.location,seats: {$gte : availabilityDTO.seats} ,_id: { $not: {$in: bookedTableIds}}} 
                    : {seats: {$gte : availabilityDTO.seats} ,_id: { $not: {$in: bookedTableIds}}};
    return await this.tableModel.find(searchFilter);  
  }

  reserveTable = async (reservationDTO: IReservationDTO) => {
  // Check if the table was blocked by an admin during the booking session of the user.
    const table = await this.tableModel.findOne({_id:reservationDTO.table});
    if (!table) throw new Error("Invalid table selected!"); 
    else if (table.status != "OPEN") throw new Error("The table has been blocked by staff during the booking session!");
    
  // Check if a different user has booked the same table within the same timeframe during the booking session of the user.
    const checkReservation = await this.reservationModel.findOne({_id: reservationDTO.table, $or: [
      { start: { $gte: reservationDTO.start, $lte : reservationDTO.end } },
      { end: { $lte: reservationDTO.end , $gte : reservationDTO.start }}
      ]});
    if (checkReservation) throw new Error("A reservation has been made within this time slot during the booking session!");
    return await this.reservationModel.create(reservationDTO);
  }

  fetchAllTableInfo = async () => {
    return await this.tableModel.find();
  }

  fetchAllReservationInfo = async () => {
    return await this.reservationModel.find();
  }

  blockTable = async (blockDTO: IBlockDTO) => {
    return await this.tableModel.updateOne({_id:blockDTO.tableId},{ $set: { status: blockDTO.status } });
  }

}

export default ReservationService;
