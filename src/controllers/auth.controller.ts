import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "../services/auth.service";

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;
        const { user, token } = await loginService(username, password);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(StatusCodes.OK).json(user);
    } catch (error: any) {
        console.error(`Error while trying to get user with id: ${req.params.id} - message: ${error.message} - stack: ${error.stack}`);
        if (error.message?.toLowerCase().includes('invalid credentials')) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials');
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

export const AuthController = {
    login
}