import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.getHotel();
    return res.status(httpStatus.OK).send(hotels);
  } catch (e) {
    next(e);
  }
}
