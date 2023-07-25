import bcrypt from 'bcrypt';

/**
 * Hash the provided password using bcrypt with the given salt rounds.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

/**
 * Check if the provided password matches the stored hash using bcrypt.
 *
 * @param {string} password - The password to check.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the password matches the hash, false otherwise.
 */
export const isCorrectPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
