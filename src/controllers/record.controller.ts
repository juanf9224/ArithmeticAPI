import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getRecordByUserIdAndRecordId, listAllRecords } from "../services/record.service";
import { OrderByDirection } from "objection";

/**
 * @swagger
 * /api/v1/records/{userId}:
 *   get:
 *     summary: Get records for a specific user
 *     description: | 
 *       Get paginated records for a specific user 
 *       based on the provided parameters.
 *     tags:
 *       - Records
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: |
 *           ID of the user to retrieve records for.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: |
 *           Page number for pagination (default: 1).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: itemsPerPage
 *         required: false
 *         description: |
 *           Number of items per page (default: 10).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderBy
 *         required: false
 *         description: |
 *           Field to sort the records by (default: 'id').
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: |
 *           Sort order ('asc' or 'desc', default: 'asc').
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         required: false
 *         description: |
 *           Search term to filter records.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with paginated records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Record' # Assuming you have a schema defined for the Record model
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 * /api/v1/records/{userId}/{id}:
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