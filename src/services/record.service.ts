import { IMeta } from "../constants/api.constant";
import { Operation } from "../models";
import { Record } from "../models/record.model";


export const getUserBalanceByUserId = async (userId: number) => {
    try {
         const record = await Record.query().where({
            user_id: userId
         }).orderBy('id', 'desc').first();

        if (!record) {
            throw new Error(`No record found for user id: ${userId}, balance cannot be retrieved`);
        }

        return record.userBalance;
    } catch (error: any) {
        throw error;
    }
}

export const listAllRecords = async (userId: number, meta: IMeta) => {
    try {
        const page = await Record.query().where({
            user_id: userId
        }).orderBy(
            meta.orderBy || 'id',
            meta.sortBy || 'desc'
        ).page(meta.page, meta.itemsPerPage);
        return page;
    } catch (error: any) {

    }
}

export const getRecordByUserIdAndRecordId = async (userId: number, id: number) => await Record.query().findOne({
    user_id: userId,
    id
});

export const storeNewOperationRecord = async (result: string  | number, op: Operation, userId: number, userBalance: number) => await Record.query().insert({
    user_id: userId,
    operation_id: Number(op.id),
    operationResponse: result,
    amount: op.cost,
    userBalance: userBalance - op.cost
})