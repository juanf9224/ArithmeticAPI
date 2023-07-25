import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

/**
 * Validate the request payload against the specified schema.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @param {Joi.Schema} schema - The Joi schema to validate the request payload against.
 */
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema: Schema
) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error } = schema.validate(
        req,
        options
    );
    if (error) {
        res.status(StatusCodes.BAD_REQUEST)
            .send({
                message: 'validation_errors',
                errors: error.details.map(detail => ({
                    message: detail.message,
                    field: detail.path[0],
                    type: detail.type
                }))
            });
    } else {
        next();
    }
};