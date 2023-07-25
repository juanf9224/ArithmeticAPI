import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "../services/auth.service";
import { serialize } from 'cookie';
import { config } from "../config";
import { jwtSign, verifyToken } from "../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user with username and password
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe@mail.com
 *               password: Password.123
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Invalid Credentials.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid Credentials
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;
        const { user, token, refreshToken } = await loginService(username, password);

        const serialized = serialize('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.tokenExpiresIn,
            path: '/api/v1',
            domain: req.get('host')
        })

        const serializedRefreshToken = serialize('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.tokenExpiresIn,
            path: '/api/v1',
            domain: req.get('host')
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

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Log out the currently authenticated user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *               example:
 *                 status: success
 *                 message: Logged out
 *       401:
 *         description: Unauthorized. No valid token found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 *               example:
 *                 status: error
 *                 error: Unauthorized
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
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
            secure: true,
            sameSite: 'none',
            maxAge: config.tokenExpiresIn,
            path: '/api/v1',
            domain: req.get('host')
        })
        const serializedRefreshToken = serialize('refreshToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.tokenExpiresIn,
            path: '/api/v1',
            domain: req.get('host')
        })
        res.setHeader('Set-Cookie', serialized);
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

/**
 * @swagger
 * /api/v1/auth/refreshToken:
 *   post:
 *     summary: Refresh Access Token
 *     description: Refresh the access token using the provided refresh token
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access token successfully refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid or expired refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 error:
 *                   type: string
 *               example:
 *                 status: error
 *                 error: Unauthorized
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cookies } = req;
        const refreshToken = cookies['refreshToken'];

        const decoded = (await verifyToken(refreshToken)) as JwtPayload;
        const accessToken = jwtSign(decoded.user);

        const serialized = serialize('token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: config.tokenExpiresIn,
            path: '/api/v1',
            domain: req.get('host')           
        });
        res.setHeader('Set-Cookie', serialized);        
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