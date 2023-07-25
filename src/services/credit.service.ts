import { Credit } from "../models";


/**
 * Get the credit balance by user ID.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Promise<number>} A promise that resolves to the user's balance.
 * @throws {Error} If no record is found for the user ID, and the balance cannot be retrieved.
 */
export const getCreditBalanceByUserId = async (userId: number): Promise<Credit | undefined> => await Credit.query().findOne({ user_id: userId });

/**
 * Update the credit balance for a specific user by their ID.
 *
 * @param {number} id - The ID of the user whose credit balance will be updated.
 * @param {number} newBalance - The new credit balance for the user.
 * @returns {Promise<number>} A promise that resolves to the updated credit object.
 * @throws {Error} If an error occurs while updating the credit balance.
 */
export const updateCreditByUserId = async (id: number, newBalance: number): Promise<number> => await Credit.query().findOne({id}).update({ balance: newBalance })