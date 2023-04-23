import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelWithRoomsById(id: number) {
  return await prisma.hotel.findUnique({
    where: { id: id },
    include: { Rooms: true },
  });
}

export default {
  findHotels,
  findHotelWithRoomsById,
};
