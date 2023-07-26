import { config } from "../config";
import { jwtSign } from "../helpers/jwt.helper";
import { isCorrectPassword } from "../helpers/passwords.helper";
import { User } from "../models";

interface LoginResponse {
    user: Partial<User>,
    token: string;
    refreshToken: string;
}
/**
 * Authenticate the user and generate access and refresh tokens.
 *
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Promise<LoginResponse>} An object containing user details, access token, and refresh token.
 * @throws {Error} If the credentials are invalid or an error occurs during the authentication process.
 */
export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const user = await User.query().findOne({ username });

        if (!user || !(await isCorrectPassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const { id, username: userName, status } = user;

        return {
            user: {
                id,
                username: userName,
                status
            },
            token: jwtSign({ id, username: user.username, status: user.status }),
            refreshToken: jwtSign({ id, username: user.username, status: user.status }, config.refreshTokenExpiresIn)
        }
    } catch (error: any) {
        throw error;
    }
}