import faker from '@faker-js/faker';
import { Hotel, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: 'jorge',
      image: 'http://',
    },
  });
}

export async function createIsIncludedHotelTrueTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}
