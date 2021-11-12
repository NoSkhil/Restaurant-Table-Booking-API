import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


/* 
  Authorization for admin actions such as blocking a table,
  adding new tables, etc. 
  Disabled because it would require the admin to login in order to perform actions. (Not in scope of MVP)
*/
function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //const token: string = request.headers['authorization']?.split(' ')[1] ?? '';
  try {
   // let decoded = verify(token, `${process.env.JWT_SECRET}`);
    next();
  } catch (err) {
    response.status(500).json({ err , data: null });
  }
}

export default authMiddleware;
