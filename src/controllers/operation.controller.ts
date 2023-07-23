import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { executeOperation, findOperationByType, listAllOperations } from '../services/operation.service';
import { findUser } from '../services/user.service';
import { Status } from '../constants/user.constant';
import { getUserBalanceByUserId, storeNewOperationRecord } from '../services/record.service';

const calculate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { type, data } = req.body;
    const user = await findUser(Number(userId));
    if (user.status === Status.INACTIVE) {
      throw new Error('Inactive user');
    }
    const op = await findOperationByType(type);

    const userBalance = await getUserBalanceByUserId(Number(userId));

    if (userBalance < op.cost) {
      throw new Error("User doesn't have enough balance for this request");
    }

    const result = await executeOperation(op.type, data);

    await storeNewOperationRecord(result, op, Number(userId), userBalance);

    return res.status(StatusCodes.OK).json({ data: result });

  } catch (error: any) {
    console.log(`Error while trying to calculate operation for user id: ${req.params.userId} - message: ${error.message} - stack: ${error.stack}`);
    if (error.message.includes('Operation Not Found')){
      return res.status(StatusCodes.NOT_FOUND).send(error.message);
    }

    if (error.message.includes('User not found')){
      return res.status(StatusCodes.NOT_FOUND).send(error.message);
    }

    if (error.message.includes('Inactive user')){
      return res.status(StatusCodes.UNAUTHORIZED).send('User not allowed to access this resource');
    }
    
    if (error.message.includes("User doesn't have enough balance for this request")){
      return res.status(StatusCodes.FORBIDDEN).send("User doesn't have enough balance for this request");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const list = async (req: Request, res: Response): Promise<Response> => {
  try {
    const operations = await listAllOperations();
  return res.status(StatusCodes.OK).send(operations);
  } catch (error: any) {
    console.error(`Error while trying to get operations - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

export const OperationController = {
  calculate,
  list
};
