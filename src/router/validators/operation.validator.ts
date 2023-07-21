import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateRequest } from "../../helpers/validate-request";
import { OperationType } from "../../constants/operation.constant";

const validateValue = (value: any, helper: Joi.CustomHelpers, type: string, isRequired = true) => {
    if (!isRequired && !value) return value;
    
    if ( (isRequired && !value) || typeof value !== type) {
        return helper.error('any.invalid')
    }
    return value;
}

const validateField = (value: any, helper: Joi.CustomHelpers, type: string, isOptionalField = false) => {
    switch (type) {
        case OperationType.ADDITION:
        case OperationType.SUBSTRACTION:
        case OperationType.MULTIPLICATION:
        case OperationType.DIVISION:
            return validateValue(value, helper, 'number');
        case OperationType.SQUARE_ROOT: {
            return validateValue(value, helper, 'number', !isOptionalField);
        }
        case OperationType.RANDOM_STRING: {
            return validateValue(value, helper, 'string', !isOptionalField);
        }
        default: return helper.error('any.invalid');
    }
}

export const calculateValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        body: Joi.object({
            type: Joi.string().required().equal(Object.values(OperationType)),
            data: Joi.object({
                valueA: Joi.custom((value, helper) => {
                    return validateField(value, helper, req.body.type)
                }).required(),
                valueB: Joi.custom((value, helper) => {
                    return validateField(value, helper, req.body.type, true)
                })
            }).required(),
        }).required()
    });
    validateRequest(req, res, next, schema);
}