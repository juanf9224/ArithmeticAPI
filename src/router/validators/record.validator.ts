import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateRequest } from "../../helpers/validate-request";

export const listRecordsValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            userId: Joi.string().required(),
        }),
        query: Joi.object({
            page: Joi.number().optional(),
            itemsPerPage: Joi.number().optional(),
            orderBy: Joi.string().optional(),
            sortBy: Joi.string().optional(),
        }),        
    })

    validateRequest(req, res, next, schema);
}

export const getRecordValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            userId: Joi.string().required(),
            id: Joi.string().required()
        })       
    })

    validateRequest(req, res, next, schema);
}