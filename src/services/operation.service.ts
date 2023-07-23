import { config } from "../config";
import { MathOperation, OperationData, OperationType } from "../constants/operation.constant";
import { Operation } from "../models";

export const findOperationByType = async (type: OperationType) => {
    try {
        const op = await Operation.query().findOne({ type });      
        
        if (!op) {
            throw new Error('Operation Not Found');
        }

        return op;
    } catch (error) {
        throw error;
    }
}

export const executeOperation = async (type: OperationType, data: OperationData<number> | MathOperation) => {
    try {
        switch (type) {
            case OperationType.ADDITION: {
                return sum(data as MathOperation);
            }
            case OperationType.SUBSTRACTION: {
                return substract(data as MathOperation);
            }
            case OperationType.MULTIPLICATION: {
                return multiply(data as MathOperation);
            }
            case OperationType.DIVISION: {
                return divide(data as MathOperation);
            }
            case OperationType.SQUARE_ROOT: {
                return getSquareRoot(data);
            }
            case OperationType.RANDOM_STRING: {
                return await generateRandomString(data);
            }
            default: throw new Error('Invalid operation requested');
        }
    } catch (error) {
        throw error;
    }
}

export const sum = (data: MathOperation) => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Addition operation requieres two values to work')
    return Number(data.valueA) + Number(data.valueB);
}

export const substract = (data: MathOperation) => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Substraction operation requieres two values to work')
    return Number(data.valueA) - Number(data.valueB);
}

export const multiply = (data: MathOperation) => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Multiplication operation requieres two values to work')
    return Number(data.valueA) *  Number(data.valueB);
}

export const divide = (data: MathOperation) => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Division operation requieres two values to work')
    return Number(data.valueA) /  Number(data.valueB)
}

export const getSquareRoot = (data: OperationData<number>) => {
    if (!data || !data.valueA) throw new Error('Square Root operation value cannot be undefined')
    return Math.sqrt(Number(data.valueA));
}

export const generateRandomString = async (data: OperationData<number>) => {
    try {
        const response = await fetch(
            `${config.randomApi}/strings/?num=1&len=${data.valueA}&digits=on&upperalpha=on&loweralpha=on&unique=off&format=plain&rnd=new`
        ).then(response => response.text());
        return response.replace(/\n/, '');
    } catch (error: any) {
        console.error(`Error trying to generate new random string - message: ${error.message} - stack: ${error.stack}`);
        throw error;
    } 
}

export const listAllOperations = async () => await Operation.query();