import { jwtSign } from "../helpers/jwt";
import { isCorrectPassword } from "../helpers/passwords";
import { User } from "../models"

export const loginService = async (username: string, password: string) => {
    try {
        const user = await User.query().findOne({ username });
        if (!user || !(await isCorrectPassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        return {
            user,
            token: jwtSign({ username: user.username, status: user.status })
        }
    } catch (error: any) {
        throw error;
    }
}