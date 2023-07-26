import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TokenExpiredError } from 'jsonwebtoken';
import { verifyToken } from "../../helpers/jwt.helper";
import Joi from "joi";
import { validateRequest } from "../../helpers/validate.helper";

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cookies } = req;
        const token = cookies.token;
        if (!token) {
            throw new Error('Unauthorized');
        }
        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error('Unauthorized');
        }
        next();
    } catch (error: any) {
        console.error(`Could not validate authorization token - message: ${error.message} - stack: ${error.stack}`);
        if (error.message.includes('Unauthorized') || error.message.includes('Error verifying token')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
        } 
        if (error instanceof TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).send(error.message);
        }
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
    }
};

export const refreshTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cookies } = req;
        const token = cookies.refreshToken;
        if (!token) {
            throw new Error('Unauthorized');
        }
        next();
    } catch (error: any) {
        console.error(`Could not validate refresh token - message: ${error.message} - stack: ${error.stack}`);
        if (error.message.includes('Unauthorized') || error.message.includes('Error verifying token')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
        } 
        return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
    }
};

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required().min(6),
        })
    });
    validateRequest(req, res, next, schema);
}