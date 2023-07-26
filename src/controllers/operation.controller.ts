import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { listAllOperations, runCalculation } from '../services/operation.service';

/**
 * @swagger
 * /api/v1/operations/calculate/{userId}:
 *   post:
 *     summary: Calculate Operation
 *     description: Calculate operation for the specified user.
 *     tags:
 *       - Operations
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to perform the operation for.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               data:
 *                 type: object
 *             example:
 *               type: addition
 *               data: { "valueA": 10, "valueB": 20 }
 *     responses:
 *       '200':
 *         description: Calculation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       '400':
 *         description: Bad Request. Invalid request data.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Bad Request
 *       '401':
 *         description: Unauthorized. User is inactive.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not allowed to access this resource
 *       '403':
 *         description: Forbidden. User doesn't have enough balance for this request.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User doesn't have enough balance for this request
 *       '404':
 *         description: Not Found. Operation or User not found.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Operation Not Found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const calculate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId: uId } = req.params;
    const { type, data } = req.body;
    const userId = Number(uId);

    const result = await runCalculation(userId, type, data);

    return res.status(StatusCodes.OK).json({ data: result });

  } catch (error: any) {
    console.error(`Error while trying to calculate operation for user id: ${req.params.userId} - message: ${error.message} - stack: ${error.stack}`);
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


/**
 * @swagger
 * /api/v1/operations:
 *   get:
 *     summary: List Operations
 *     description: Get a list of all operations.
 *     tags:
 *       - Operations
 *     responses:
 *       '200':
 *         description: List of operations successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
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
