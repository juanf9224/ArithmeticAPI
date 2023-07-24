import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getRecordByUserIdAndRecordId, listAllRecords } from "../services/record.service";
import { OrderByDirection } from "objection";

 /**
   * @swagger
   *
   * /login:
   *   post:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   */
const list = async (req: Request, res: Response): Promise<Response> => {
  try {
      const { userId } = req.params;
      const { page, itemsPerPage, orderBy, sortBy, search } = req.query;
      const recordsPage = await listAllRecords(Number(userId), {
          page: Number(page),
          itemsPerPage: Number(itemsPerPage),
          orderBy: String(orderBy),
          sortBy: String(sortBy) as OrderByDirection,
          search: String(search)
      });
      return res.status(StatusCodes.OK).send(recordsPage);
  } catch (error: any) {
      console.error(`Error while trying to get records - message: ${error.message} - stack: ${error.stack}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

/**
 * @swagger
 * /getRecord/{userId}/{id}:
 *   get:
 *     summary: Get Record
 *     description: Get a single record for the specified user by record ID.
 *     tags:
 *       - Records
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get the record for.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the record to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Record successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       '404':
 *         description: Not Found. Record not found.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Record not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const getRecord = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, id } = req.params;
    const record = await getRecordByUserIdAndRecordId(Number(userId), Number(id));
    return res.status(StatusCodes.OK).send(record);
  } catch (error: any) {
    console.error(`Error while trying to get record with user id: ${req.params.userId} - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

export const RecordController = {
    list,
    getRecord,
}