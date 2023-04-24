import supertest from 'supertest';
import faker from '@faker-js/faker';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('Retorna 200 se o teken é válido', async () => {
    const token = await generateValidToken();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
  });
  it('Retorna 200 se o objeto está com o formato correto', async () => {
    const token = await generateValidToken();
    const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
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
