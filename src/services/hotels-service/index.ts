import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, paymentRequiredError } from '@/errors';

async function getHotel(userId: number): Promise<Hotel[]> {
  const hotels: Hotel[] = await hotelsRepository.findHotels();
  if (!hotels) throw notFoundError();
  if (hotels.length == 0) throw notFoundError();

  const enrollment = await enrollmentRepository.findUserById(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);

  if (!enrollment || !ticket || !hotels) throw notFoundError();
  if (ticket.status !== 'PAID' || ticketType.includesHotel !== true || ticketType.isRemote === true) {
    throw paymentRequiredError();
  }
  return hotels;
}

async function getHotelsWIthRooms(id: number) {
  const hotelRooms = await hotelsRepository.findHotelWithRoomsById(id);
  if (!hotelRooms) throw notFoundError();
  return hotelRooms;
}

const hotelsService = { getHotel, getHotelsWIthRooms };

export default hotelsService;
