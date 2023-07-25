import { Page } from "objection";
import { IMeta } from "../constants/api.constant";
import { Operation } from "../models";
import { Record } from "../models/record.model";

/**
 * List all records for a user based on provided metadata.
 *
 * @param {number} userId - The ID of the user.
 * @param {IMeta} meta - Metadata containing search, pagination, and sorting options.
 * @returns {Promise<Page<Record>>} A promise that resolves to the list of records based on the provided metadata.
 * @throws {Error} If an error occurs while querying the records.
 */
export const listAllRecords = async (userId: number, meta: IMeta): Promise<Page<Record>> => {
    try {
        if (meta?.search) {
            if (Number(meta.search)) {
                return await Record.query()
                .where({
                    user_id: userId,
                    deleted: false
                })
                .andWhere({
                    operationResponse: `${meta.search}`
                })
                .orWhere({
                    operation_id: meta.search
                })
                .orWhere({
                    amount: meta.search
                })
                .orWhere({
                    userBalance: meta.search
                })
                .orderBy( meta.orderBy || 'id', meta.sortBy || 'desc')
                .page(meta.page, meta.itemsPerPage);
            }
            return await Record.query()
            .where({
                user_id: userId,
                deleted: false
            })
            .andWhere("operationResponse", 'ilike', `%${meta.search}%`)
            .orderBy( meta.orderBy || 'id', meta.sortBy || 'desc')
            .page(meta.page, meta.itemsPerPage);
        }
         
        return await Record.query()
        .where({ user_id: userId, deleted: false })
        .orderBy(meta.orderBy || 'id', meta.sortBy || 'desc')
        .page(meta.page, meta.itemsPerPage);
    } catch (error: any) {
        console.error(`Error while trying to fetch records - message: ${error.message} - stack: ${error.stack}`);
        throw error;
    }
}

/**
 * Get a record by user ID and record ID.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} id - The ID of the record.
 * @returns {Promise<Record | undefined>} A promise that resolves to the found record.
 */
export const getRecordByUserIdAndRecordId = async (userId: number, id: number): Promise<Record | undefined> => await Record.query().findOne({
    user_id: userId,
    id,
    deleted: false
});

/**
 * Store a new operation record for a user.
 *
 * @param {string | number} result - The result of the operation.
 * @param {Operation} op - The operation object.
 * @param {number} userId - The ID of the user.
 * @param {number} userBalance - The user's balance.
 * @returns {Promise<Record>} A promise that resolves when the new record is stored.
 */
export const storeNewOperationRecord = async (result: string  | number, op: Operation, userId: number, userBalance: number): Promise<Record> => await Record.query().insert({
    user_id: userId,
    operation_id: Number(op.id),
    operationResponse: result,
    amount: op.cost,
    userBalance: userBalance - op.cost
});

 /**
 * Soft deletes a record by its ID from the database.
 *
 * @param {number} id - The ID of the record to remove.
 * @returns {Promise<number>} A promise that resolves to the number of deleted records (usually 0 or 1).
 * @throws {Error} If an error occurs while deleting the record.
 */
export const removeRecordById = async (id: number): Promise<number> => await Record.query().findOne({id}).update({ deleted: true });