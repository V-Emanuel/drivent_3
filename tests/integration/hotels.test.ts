import supertest from 'supertest';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { cleanDb, generateValidToken } from '../helpers';
import { createEnrollmentWithAddress, createUser, createTicketType, createTicket } from '../factories';
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
describe('Quando o token é válido', () => {
  it('Retorna 200 se o token é válido', async () => {
    const token = await generateValidToken();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });
  it('Retorna um array vazio quando não há hotéis', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.body).toEqual([]);
  });
});

{
  /*
    expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        );
*/
}
