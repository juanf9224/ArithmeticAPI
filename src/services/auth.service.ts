import { config } from "../config";
import { jwtSign } from "../helpers/jwt";
import { isCorrectPassword } from "../helpers/passwords";
import { User } from "../models"

export const loginService = async (username: string, password: string) => {
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
            refreshToken: jwtSign({ id, username: user.username, status: user.status }, config.tokenExpiresIn * 2)
        }
    } catch (error: any) {
        throw error;
    }
}