import supertest from 'supertest';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createEnrollmentWithAddress,
  createUser,
  createHotel,
  createTicket,
  createHotelTicketTypeTrue,
  createRemotTicketTypeTrue,
  createHotelTicketTypeFalse,
} from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('Retorna 401 se o token passado está incorreto', async () => {
    const token = faker.lorem.word();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('Retorna 401 se não foi passado token', async () => {
    const result = await server.get('/hotels');
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
describe('/hotels Quando o token é válido', () => {
  it('Retorna 200 se o token é válido', async () => {
    const user = await createUser();
    const createdEnrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createHotelTicketTypeTrue();
    await createTicket(createdEnrollment.id, ticketType.id, 'PAID');
    await createHotel();
    const token = await generateValidToken(user);
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(httpStatus.OK);
  });
});
describe('GET hotels/:hotelId', () => {
  it('Retorna 401 se o token passado está incorreto', async () => {
    const token = faker.lorem.word();
    const createdHotel = await createHotel();
    const result = await server.get(`/hotels/${String(createdHotel.id)}`).set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it('Retorna 401 se não foi passado token', async () => {
    const createdHotel = await createHotel();
    const result = await server.get(`/hotels/${String(createdHotel.id)}`);
    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
describe('hotels/:hotelId Quando o token é válido', () => {
  it('Retorna 200 se o token é válido', async () => {
    const token = await generateValidToken();
    const createdHotel = await createHotel();
    const result = await server.get(`/hotels/${String(createdHotel.id)}`).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(httpStatus.OK);
  });
});
describe('validações de ticketda rota /hotels', () => {
  it('Retorna 402 se o ticket não foi pago', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const createdEnrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createHotelTicketTypeTrue();
    await createTicket(createdEnrollment.id, ticketType.id, 'RESERVED');

    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });
  it('Retorna 402 se o tipo do ticket for remoto', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const createdEnrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createRemotTicketTypeTrue();
    await createTicket(createdEnrollment.id, ticketType.id, 'PAID');

    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });
  it('Retorna 402 se o tipo do ticket não inclui hotel', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const createdEnrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createHotelTicketTypeFalse();
    await createTicket(createdEnrollment.id, ticketType.id, 'PAID');

    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });
});
