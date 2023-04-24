import { Hotel } from '@prisma/client';
import hotelsRepository from '@/repositories/hotels-repository';
import { notFoundError } from '@/errors';

async function getHotel(userId: number): Promise<Hotel[]> {
  const hotels: Hotel[] = await hotelsRepository.findHotels();
  return hotels;
}

async function getHotelsWIthRooms(id: number) {
  const hotelRooms = await hotelsRepository.findHotelWithRoomsById(id);
  if (!hotelRooms) throw notFoundError();
  return hotelRooms;
}

const hotelsService = { getHotel, getHotelsWIthRooms };

export default hotelsService;
