export enum HttpVerb {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  USE = "USE",
}

export const routes = {
  ProductRoutes: {
    ROOT: '/',
    INFO: '/:id',
    PURCHASE: '/:id/purchase'
  },
  ReservationRoutes: {
    ROOT: '/',
    FETCH_AVAILABLE_TABLES: '/availability',
    RESERVE_TABLE: '/reserve',
    ADMIN_FETCH_ALL_TABLE_INFO: '/info',
    ADMIN_FETCH_ALL_RESERVATION_INFO: '/reservations/info',
    ADMIN_BLOCK_TABLE: '/block'
  }
};
