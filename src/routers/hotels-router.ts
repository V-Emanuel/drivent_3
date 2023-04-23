import { Router } from 'express';
import { getHotels, getHotelRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotels).get('/:hotelId', getHotelRooms);

export { hotelsRouter };
