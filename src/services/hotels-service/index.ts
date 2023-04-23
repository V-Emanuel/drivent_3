import { Hotel } from '@prisma/client';
import hotelsRepository from '@/repositories/hotels-repository';
import { notFoundError } from '@/errors';

async function getHotel(): Promise<Hotel[]> {
  const hotels: Hotel[] = await hotelsRepository.findHotels();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelsWIthRooms(id: number) {
  const hotelRooms = await hotelsRepository.findHotelWithRoomsById(id);
  if (!hotelRooms) throw notFoundError();

  return hotelRooms;
}

const hotelsService = { getHotel, getHotelsWIthRooms };

export default hotelsService;
