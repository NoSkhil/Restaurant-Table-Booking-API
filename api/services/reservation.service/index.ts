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

  fetchAvailableTables = async (availabilityDTO: IAvailabilityDTO) => {
  
  // Find all existing reservations between the requested time slots.
   const bookedTables = await this.reservationModel.find({ $or: [
    { start: { $gte: availabilityDTO.start, $lte : availabilityDTO.end } },
    { end: { $lte: availabilityDTO.end , $gte : availabilityDTO.start }}
]});
   return bookedTables;
  }
  reserveTable = async (reservationDTO: IReservationDTO) => {
    return await this.reservationModel.create(reservationDTO);
  }

  fetchAllTableInfo = async () => {
    return await this.tableModel.find();
  }

  fetchAllReservationInfo = async () => {
    return await this.reservationModel.find();
  }

  blockTable = async (blockDTO: IBlockDTO) => {
    console.log(blockDTO);
    return await this.tableModel.updateOne({_id:blockDTO.tableId},{ $set: { status: blockDTO.status } });
  }

}

export default ReservationService;
