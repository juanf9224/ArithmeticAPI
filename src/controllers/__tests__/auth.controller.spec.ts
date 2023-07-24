import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from "../../factories";
import { User } from "../../models";
import { config } from '../../config';
import { hashPassword } from '../../helpers/passwords';
import { jwt } from '../../setupTests';
import { verifyToken } from '../../helpers/jwt';
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
            .post(`/${config.apiVersion}/auth/login`)
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
            .get(`/${config.apiVersion}/auth/refresh-token`)
            .set('Cookie', [`refreshToken=${jwt}`]);
            const decoded = (await verifyToken(jwt) as JwtPayload);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.username).toBe(decoded.user.username);
        });
    })
});