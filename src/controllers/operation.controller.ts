import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { executeOperation, findOperationByType } from '../services/operation.service';
import { findUser } from '../services/user.service';
import { Status } from '../constants/user.constant';

const calculate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { type, data } = req.body;
    const user = await findUser(Number(userId));

    if (user.status === Status.INACTIVE) {
      throw new Error('Inactive user');
    }
    const op = await findOperationByType(type);

    const result = await executeOperation(op.type, data);

    return res.status(StatusCodes.OK).json({ data: result });

  } catch (error: any) {
    console.log(`Error while trying to get user with id: ${req.params.userId} - message: ${error.message} - stack: ${error.stack}`);
    if (error.message.includes('Operation Not Found')){
      return res.status(StatusCodes.NOT_FOUND).send(error.message);
    }

    if (error.message.includes('User not found')){
      return res.status(StatusCodes.NOT_FOUND).send(error.message);
    }

    if (error.message.includes('Inactive user')){
      return res.status(StatusCodes.UNAUTHORIZED).send('User not allowed to access this resource');
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const OperationController = {
  calculate,
};
