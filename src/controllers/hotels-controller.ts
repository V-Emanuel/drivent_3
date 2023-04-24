import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const userId = req.userId as number;
  try {
    const hotels = await hotelsService.getHotel(userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const hotelId = +req.params.hotelId as number;
  try {
    const hotelandRooms = await hotelsService.getHotelsWIthRooms(hotelId);
    return res.status(httpStatus.OK).send(hotelandRooms);
  } catch (e) {
    next(e);
  }
}
