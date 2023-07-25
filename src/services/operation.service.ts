import { Status } from "../constants/user.constant";
import { config } from "../config";
import { MathOperation, OperationData, OperationType } from "../constants/operation.constant";
import { Operation } from "../models";
import { findUser } from "./user.service";
import { getCreditBalanceByUserId, updateCreditByUserId } from "./credit.service";
import { storeNewOperationRecord } from "./record.service";

/**
 * Find an operation by its type.
 *
 * @param {OperationType} type - The type of the operation to find.
 * @returns {Promise<Operation>} A promise that resolves to the found operation.
 * @throws {Error} If the operation with the specified type is not found.
 */
export const findOperationByType = async (type: OperationType): Promise<Operation> => {
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

/**
 * Execute a math operation based on its type and data.
 *
 * @param {OperationType} type - The type of the operation to execute.
 * @param {OperationData<number> | MathOperation} data - The data for the operation.
 * @returns {Promise<string | number>} A promise that resolves to the result of the operation.
 * @throws {Error} If the operation type is invalid or an error occurs during execution.
 */
export const executeOperation = async (type: OperationType, data: OperationData<number> | MathOperation): Promise<string | number> => {
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

/**
 * Perform addition operation on the given data.
 *
 * @param {MathOperation} data - The data for the addition operation.
 * @returns {number} The result of the addition operation.
 * @throws {Error} If the data or required values are missing for the operation.
 */
export const sum = (data: MathOperation): number => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Addition operation requieres two values to work')
    return Number(data.valueA) + Number(data.valueB);
}

/**
 * Perform subtraction operation on the given data.
 *
 * @param {MathOperation} data - The data for the subtraction operation.
 * @returns {number} The result of the subtraction operation.
 * @throws {Error} If the data or required values are missing for the operation.
 */
export const substract = (data: MathOperation): number => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Substraction operation requieres two values to work')
    return Number(data.valueA) - Number(data.valueB);
}

/**
 * Perform multiplication operation on the given data.
 *
 * @param {MathOperation} data - The data for the multiplication operation.
 * @returns {number} The result of the multiplication operation.
 * @throws {Error} If the data or required values are missing for the operation.
 */
export const multiply = (data: MathOperation): number => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Multiplication operation requieres two values to work')
    return Number(data.valueA) *  Number(data.valueB);
}

/**
 * Perform division operation on the given data.
 *
 * @param {MathOperation} data - The data for the division operation.
 * @returns {number} The result of the division operation.
 * @throws {Error} If the data or required values are missing for the operation.
 */
export const divide = (data: MathOperation): number => {
    if (!data || !data.valueA || !data.valueB) throw new Error('Division operation requieres two values to work')
    return Number(data.valueA) /  Number(data.valueB)
}

/**
 * Calculate the square root of the given data.
 *
 * @param {OperationData<number>} data - The data for the square root operation.
 * @returns {number} The square root of the value.
 * @throws {Error} If the data or required values are missing for the operation.
 */
export const getSquareRoot = (data: OperationData<number>): number => {
    if (!data || !data.valueA) throw new Error('Square Root operation value cannot be undefined')
    return Math.sqrt(Number(data.valueA));
}

/**
 * Generate a random string based on the given data.
 *
 * @param {OperationData<number>} data - The data for generating the random string.
 * @returns {Promise<string>} A promise that resolves to the generated random string.
 * @throws {Error} If an error occurs while generating the random string.
 */
export const generateRandomString = async (data: OperationData<number>): Promise<string> => {
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

/**
 * List all operations.
 *
 * @returns {Promise<Operation[]>} A promise that resolves to an array of all operations.
 */
export const listAllOperations = async (): Promise<Operation[]> => await Operation.query();


/**
 * Run a calculation for a specific user based on the operation type and data.
 *
 * @param {number} userId - The ID of the user to run the calculation for.
 * @param {OperationType} type - The type of the operation to perform.
 * @param {OperationData<number> | MathOperation} data - The data for the operation.
 * @returns {Promise<string | number>} A promise that resolves to the result of the calculation.
 * @throws {Error} If the user is inactive, doesn't have enough balance, or an error occurs during the calculation.
 */
export const runCalculation = async (userId: number, type: OperationType, data: OperationData<number> | MathOperation): Promise<string | number> => {
    try {
        const user = await findUser(userId);

        if (user.status === Status.INACTIVE) {
        throw new Error('Inactive user');
        }
        const op = await findOperationByType(type);

        const credit = await getCreditBalanceByUserId(userId);

        if (!credit || credit.balance < op.cost) {
            throw new Error("User doesn't have enough balance for this request");
        }

        const result = await executeOperation(op.type, data);

        await updateCreditByUserId(userId, credit.balance - op.cost);
        
        await storeNewOperationRecord(result, op, userId, credit.balance);
        return result;
    } catch (error: any) {
        console.error(`Error trying to run the calculation - message: ${error.message} - stack: ${error.stack}`);
        throw error;
    }
}