import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createUser, deleteUser, findUser, listAllUsers, updateUser } from "../services/user.service";

const list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await listAllUsers();
    return res.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      console.error(`Error while trying to get users - message: ${error.message} - stack: ${error.stack}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  };

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const users = await findUser(Number(id));
    return res.status(StatusCodes.OK).json(users);
  } catch (error: any) {
    console.error(`Error while trying to get user with id: ${req.params.id} - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await createUser(req.body);
    return res.status(StatusCodes.CREATED).json(users);
  } catch (error: any) {
    console.error(`Error while trying to create user - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const users = await updateUser(Number(id), req.body);
    return res.status(StatusCodes.CREATED).json(users);
  } catch (error: any) {
    console.error(`Error while trying to update user - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await deleteUser(Number(id));
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error: any) {
    console.error(`Error while trying to delete user - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};
  
export const UserController = {
  list,
  getUser,
  create,
  update,
  remove
};