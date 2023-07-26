import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateRequest } from "../../helpers/validate.helper";
import { OperationType } from "../../constants/operation.constant";

const validateValue = (value: any, helper: Joi.CustomHelpers, type: string) => {
    try {
        let coercedValue = null;
        switch(type) {
            case 'number': {
                return coercedValue = Number(value);
            }
            case 'string': {
                return coercedValue = String(value)
            }
            case 'boolean': {
                return coercedValue =- Boolean(value);
            }
        }
        if (!coercedValue || typeof coercedValue !== type) {
            return helper.error('any.invalid')
        }
        return value;
    } catch (error: any) {
        console.error(`Could not validate value - message: ${error.message} - stack: ${error.stack}`);
        return helper.error('any.invalid');
    }
}

const validateField = (value: any, helper: Joi.CustomHelpers, type: string) => {
    switch (type) {
        case OperationType.ADDITION:
        case OperationType.SUBSTRACTION:
        case OperationType.MULTIPLICATION:
        case OperationType.DIVISION:
        case OperationType.SQUARE_ROOT:
        case OperationType.RANDOM_STRING: {
            return validateValue(value, helper, 'number');
        }
        default: return helper.error('any.invalid');
    }
}

export const calculateValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        params: Joi.object({
            userId: Joi.number().required()
        }),
        body: Joi.object({
            type: Joi.string().required().valid(...Object.values(OperationType)),
            data: Joi.object({
                valueA: Joi.custom((value, helper) => {
                    return validateField(value, helper, req.body.type)
                }).required(),
                valueB: Joi.custom((value, helper) => {
                    if (req.body.type === OperationType.RANDOM_STRING || req.body.type === OperationType.SQUARE_ROOT) {
                        return value;
                    }
                    return validateField(value, helper, req.body.type)
                })
            }).required(),
        }).required()
    });
    validateRequest(req, res, next, schema);
}