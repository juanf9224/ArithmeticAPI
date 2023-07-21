import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TokenExpiredError } from 'jsonwebtoken';
import { verifyToken } from "../../helpers/jwt";
import Joi from "joi";
import { validateRequest } from "../../helpers/validate-request";

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1] || req.body?.token;
        const payload = await verifyToken(token);
        if (!payload) {
            throw new Error('Unauthorized');
        } else {
            next();
        }
    } catch (error: any) {
        if (error.includes('Unauthorized')) {
            res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
        } else if (error instanceof TokenExpiredError) {
            res.status(StatusCodes.UNAUTHORIZED).send(error.message);
        }
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