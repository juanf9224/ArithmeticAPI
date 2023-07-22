import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getRecordByUserIdAndRecordId, listAllRecords } from "../services/record.service";
import { OrderByDirection } from "objection";

const list = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const { page, itemsPerPage, orderBy, sortBy } = req.query;
        console.log(userId, page, itemsPerPage, sortBy, orderBy);
        const recordsPage = await listAllRecords(Number(userId), {
            page: Number(page),
            itemsPerPage: Number(itemsPerPage),
            orderBy: String(orderBy),
            sortBy: String(sortBy) as OrderByDirection
        });
        return res.status(StatusCodes.OK).send(recordsPage);
    } catch (error: any) {
        console.error(`Error while trying to get records - message: ${error.message} - stack: ${error.stack}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  };

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