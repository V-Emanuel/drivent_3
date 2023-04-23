import { Hotel } from '@prisma/client';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotel(): Promise<Hotel[]> {
  const hotels: Hotel[] = await hotelsRepository.findHotels();
  return hotels;
}

const hotelsService = { getHotel };

export default hotelsService;
