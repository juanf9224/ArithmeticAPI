import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createUser, deleteUser, findUser, listAllUsers, updateUser } from "../services/user.service";

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List Users
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: List of users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await listAllUsers();
    return res.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      console.error(`Error while trying to get users - message: ${error.message} - stack: ${error.stack}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  };

/**
 * @swagger
 * /getUser/{id}:
 *   get:
 *     summary: Get User
 *     description: Get a single user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       '404':
 *         description: Not Found. User not found.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
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

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create User
 *     description: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await createUser(req.body);
    return res.status(StatusCodes.CREATED).json(users);
  } catch (error: any) {
    console.error(`Error while trying to create user - message: ${error.message} - stack: ${error.stack}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
};

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update User
 *     description: Update an existing user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: User object to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       '404':
 *         description: Not Found. User not found.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not found
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
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

/**
 * @swagger
 * /remove/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Delete an existing user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: User successfully deleted.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
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