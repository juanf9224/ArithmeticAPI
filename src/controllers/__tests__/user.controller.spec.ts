import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import factories from '../../factories';
import { User } from '../../models';
import { Status } from '../../constants/user.constant';
import { config } from '../../config';
import { jwt } from '../../setupTests';

const server = app.listen();
const username = 'test@username.com';

afterAll(() => server.close());

describe('UserController', () => {
  describe('CRUD Operations', () => {
    test('should list all users', async () => {
      const sampleSize = 3;
      const users = factories.user.buildList(sampleSize);
      await Promise.all(
        users.map(async (data) => (await User.query().insert(data)).id)
      );

      const response = await request(server)
      .get(`/${config.apiVersion}/user`)
      .set('Cookie', [`token=${jwt}`])
      .send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
    test('should get one user', async () => {
      const user = factories.user.build();
      
      const newUser = await User.query().insert(user);

      const response = await request(server)
      .get(`/${config.apiVersion}/user/${newUser.id}`)
      .set('Cookie', [`token=${jwt}`])
      .send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.username).toBe(user.username);
    });
    test('should create a user', async () => {
      const user = factories.user.build();

      const response = await request(server).post(`/${config.apiVersion}/user`)
            .set('Cookie', [`token=${jwt}`])
            .send(user);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.username).toBe(user.username);
    });
    test('should update a user', async () => {
      const user = factories.user.build();
      
      const newUser = await User.query().insert(user);
      
      const newStatus = newUser.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE;
      const response = await request(server).put(`/${config.apiVersion}/user/${newUser.id}`)
            .set('Cookie', [`token=${jwt}`])
            .send({
              status: newStatus
            });

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.status).toBe(newStatus);
    });
    test('should delete a user', async () => {
      const user = factories.user.build();
      
      const newUser = await User.query().insert(user);

      const response = await request(server)
      .delete((`/${config.apiVersion}/user/${newUser.id}`))
      .set('Cookie', [`token=${jwt}`])
      .send();

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });
  });
});
