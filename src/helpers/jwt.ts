import {
    JwtPayload, sign, TokenExpiredError, verify
} from 'jsonwebtoken';
import { config } from '../config';
import dayjs from 'dayjs';

/** 
 * @param user - User object
 * @param expirationTime - expiration time in milliseconds
 **/
export const jwtSign = <T>(data: Partial<T>, expirationTime?: number) => {
    try {
        const secret = Buffer.from(config.appSecret, 'base64');
        return sign(
                    {
                        user: data,
                        expiresIn: expirationTime || Number(config.tokenExpiresIn)
                    },
                    secret,
                    {
                        algorithm: 'HS256',
                    }
                );
    } catch (error: any) {
        console.error(`Could not sign payload - stack: ${error.message}`);
        throw error;
    }
};

export const validatePayloadExpiration = (payload: any) => {
};

export const verifyToken = async (token: string): Promise<string | JwtPayload> => {
    try {
        let payload: any | JwtPayload;
        const secret = Buffer.from(config.appSecret, 'base64');
        payload = verify(token, secret);
        const tokenExpDate = dayjs.unix(payload.iat + Number(payload.expiresIn));
        if (tokenExpDate.isBefore(dayjs())) {
            throw new TokenExpiredError('Token expired', tokenExpDate.toDate());
        }
        return payload;
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            console.error(`Token expired at: ${dayjs(error.expiredAt).format('YYYY-MM-DDTHH:mm:ssZ[Z]')} - message: ${error.message} - stack: ${error.stack}`);
            throw error;
        } else {
            console.error(`[Error verifying token - message: ${error.message} - stack ${error.stack}`);
            throw new Error('Could not verify token');
        }
    }
};