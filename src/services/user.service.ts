import { User } from "../models";

/**
 * List all users.
 *
 * @returns {Promise<User[]>} A promise that resolves to the list of all users.
 * @throws {Error} If an error occurs while querying the users.
 */
export const listAllUsers = async (): Promise<User[]> => await User.query();

/**
 * Find a user by ID.
 *
 * @param {number} id - The ID of the user to find.
 * @returns {Promise<User>} A promise that resolves to the found user.
 * @throws {Error} If no user is found with the provided ID.
 */ 
export const findUser = async (id: number): Promise<User> => {
    try {
        const user = await User.query().findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch(error) {
        throw error;
    }
}

/**
 * Create a new user.
 *
 * @param {User} data - The data of the user to create.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export const createUser = async (data: User): Promise<User> => await User.query().insert(data);

/**
 * Update a user by ID.
 *
 * @param {number} id - The ID of the user to update.
 * @param {Partial<User>} data - The partial data of the user to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export const updateUser = async (id: number, data: Partial<User>): Promise<User> => await User.query().patchAndFetchById(id, data);

/**
 * Delete a user by ID.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (id: number): Promise<void> => {
    await User.query().deleteById(id);
}