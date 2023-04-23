import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const hotels = await hotelsService.getHotel();
    return res.status(httpStatus.OK).send(hotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelRooms(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const hotelId = +req.params.hotelId as number;
  try {
    const hotelandRooms = await hotelsService.getHotelsWIthRooms(hotelId);
    return res.status(httpStatus.OK).send(hotelandRooms);
  } catch (e) {
    next(e);
  }
}
