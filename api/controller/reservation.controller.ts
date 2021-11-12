import "reflect-metadata";
import { Inject, Service } from 'typedi';
import ReservationService from '../services/reservation.service';
import { Request, Response, NextFunction } from 'express';
import { IAvailabilityDTO } from '../interfaces/IAvailability';
import { IReservationDTO } from '../interfaces/IReservation';
import { IBlockDTO } from '../interfaces/IBlock';
import HttpException from '../exceptions/http.exception';

@Service('reservation.controller')
class ReservationController {
  @Inject('reservation.service')
  reservationService: ReservationService;

  fetchAvailableTables = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const availabilityDTO: IAvailabilityDTO = request.body;
      const reservationsData = await this.reservationService.fetchAvailableTables(availabilityDTO);
      response.status(200).send(reservationsData);
    } catch (error) {
      console.log(error);
      next(new HttpException(error));
    }
  }

  reserveTable = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const reservationDTO: IReservationDTO = request.body;
      const reservationData = await this.reservationService.reserveTable(reservationDTO);
      response.status(200).send(reservationData);
    } catch (error) {
      console.log(error);
      next(new HttpException(error));
    }
  }

  fetchAllTableInfo = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const tablesData = await this.reservationService.fetchAllTableInfo();
      response.status(200).send(tablesData);
    } catch (error) {
      console.log(error);
      next(new HttpException(error));
    }
  }

  fetchAllReservationInfo = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const reservationsData = await this.reservationService.fetchAllReservationInfo();
      response.status(200).send(reservationsData);
    } catch (error) {
      console.log(error);
      next(new HttpException(error));
    }
  }

  blockTable = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const blockDTO : IBlockDTO = request.body;
      const tableData = await this.reservationService.blockTable(blockDTO);
      response.status(200).send(tableData);
    } catch (error) {
      console.log(error);
      next(new HttpException(error));
    }
  }
}

export default ReservationController;
