import { Container, Inject, Service } from 'typedi';
import BaseRouter from './base.router';
import { IRoute } from '../interfaces/IRoute';
import ReservationController from '../controller/reservation.controller';
import { routes } from './constants'
import { HttpVerb } from './constants';
import { Router } from 'express';
import { CorsMiddleware, ErrorMiddleware } from '../middlewares';

const { ReservationRoutes } = routes;

@Service('reservation.router')
class ReservationRouter extends BaseRouter {
  constructor(public router: Router) {
    super(router);
  }

  get routes(): Array<IRoute> {
    const reservationController = Container.get<ReservationController>(ReservationController);
    const routes: Array<IRoute> = [];

    // Using middlewares
    routes.push({
      httpVerb: HttpVerb.USE,
      handlers: [CorsMiddleware]
    });

    routes.push({
      httpVerb: HttpVerb.POST,
      path: ReservationRoutes.FETCH_AVAILABLE_TABLES,
      handlers: [reservationController.fetchAvailableTables]
    });

    routes.push({
      httpVerb: HttpVerb.POST,
      path: ReservationRoutes.RESERVE_TABLE,
      handlers: [reservationController.reserveTable]
    });

    routes.push({
      httpVerb: HttpVerb.GET,
      path: ReservationRoutes.ADMIN_FETCH_ALL_TABLE_INFO,
      handlers: [reservationController.fetchAllTableInfo]
    });

    routes.push({
      httpVerb: HttpVerb.GET,
      path: ReservationRoutes.ADMIN_FETCH_ALL_RESERVATION_INFO,
      handlers: [reservationController.fetchAllReservationInfo]
    });

    routes.push({
      httpVerb: HttpVerb.POST,
      path: ReservationRoutes.ADMIN_BLOCK_TABLE,
      handlers: [reservationController.blockTable]
    });

    // Error Handler for Http Exceptions
    routes.push({
      httpVerb: HttpVerb.USE,
      handlers: [ErrorMiddleware],
    });

    return routes;
  }
}

export default ReservationRouter;
