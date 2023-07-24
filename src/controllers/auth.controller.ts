import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "../services/auth.service";
import { serialize } from 'cookie';
import { NodeEnv, config } from "../config";
import { jwtSign, verifyToken } from "../helpers/jwt";
import jwtDecode from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;
        const { user, token, refreshToken } = await loginService(username, password);
        
        const serialized = serialize('token', token, {
            httpOnly: true,
            secure: config.env === NodeEnv.PRODUCTION,
            sameSite: 'strict',
            maxAge: config.tokenExpiresIn,
            path: '/'
        })

        const serializedRefreshToken = serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.env === NodeEnv.PRODUCTION,
            sameSite: 'strict',
            maxAge: config.refreshTokenExpiresIn,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized);
        res.setHeader('Refresh-Token', serializedRefreshToken);
        return res.status(StatusCodes.OK).json(user);
    } catch (error: any) {
        console.error(`Error while trying to get user with id: ${req.params.id} - message: ${error.message} - stack: ${error.stack}`);
        if (error.message?.toLowerCase().includes('invalid credentials')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials');
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

const logout = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cookies } = req;

        const jwt = cookies.token;

        if (!jwt) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                status: 'error',
                error: 'Unauthorized'
            })
        }
        const serialized = serialize('token', '', {
            httpOnly: true,
            secure: config.env === NodeEnv.PRODUCTION,
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
        })
        const serializedRefreshToken = serialize('refreshToken', '', {
            httpOnly: true,
            secure: config.env === NodeEnv.PRODUCTION,
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
        })
        res.setHeader('Authorization', serialized);
        res.setHeader('Refresh-Token', serializedRefreshToken);
        return res.status(StatusCodes.OK).send({
            status: 'success',
            message: 'Logged out'
        });
    } catch (error: any) {
        console.error(`Error while trying to get user with id: ${req.params.id} - message: ${error.message} - stack: ${error.stack}`);
        if (error.message?.toLowerCase().includes('invalid credentials')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials');
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cookies } = req;
        const refreshToken = cookies['refreshToken'];

        const decoded = (await verifyToken(refreshToken)) as JwtPayload;
        const accessToken = jwtSign(decoded.user);

        const serialized = serialize('token', accessToken, {
            httpOnly: true,
            secure: config.env === NodeEnv.PRODUCTION,
            sameSite: 'strict',
            maxAge: config.tokenExpiresIn,
            path: '/'
        });
        res.setHeader('Authorization', serialized);        
        return res.status(StatusCodes.OK).send(decoded.user);
    } catch (error: any) {
        console.error(`Error while trying to get user with id: ${req.params.id} - message: ${error.message} - stack: ${error.stack}`);
        if (error.message?.toLowerCase().includes('invalid credentials')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials');
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

export const AuthController = {
    login,
    logout,
    refreshToken
}   