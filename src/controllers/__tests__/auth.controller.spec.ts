import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from "../../factories";
import { User } from "../../models";
import { config } from '../../config';
import { hashPassword } from '../../helpers/passwords.helper';
import { jwt } from '../../setupTests';
import { verifyToken } from '../../helpers/jwt.helper';
import { JwtPayload } from 'jsonwebtoken';

const server = app.listen();

afterAll(() => server.close());

describe('AuthController', () => {
    describe('Login', () => {
        test('should login successfully', async () => {
            const user = factories.user.build();
            
            const withHashedPassword = {
                ...user,
                password: await hashPassword(user.password)
            }
            await User.query().insert(withHashedPassword);
    
            const response = await request(server)
            .post(`/api/${config.apiVersion}/auth/login`)
            .send({
                username: user.username,
                password: user.password
            });
    
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.username).toBe(user.username);
        });
    })
    describe('Refresh Token', () => {

        test('should refresh token successfully', async () => {    
            const response = await request(server)
            .post(`/api/${config.apiVersion}/auth/refresh-token`)
            .set('Cookie', [`refreshToken=${jwt}`])
            .send();
            const decoded = (await verifyToken(jwt) as JwtPayload);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.username).toBe(decoded.user.username);
        });
    })
});