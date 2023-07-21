import { User } from "../models";

export const listAllUsers = async () => await User.query();

export const findUser = async (id: number) => {
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

export const createUser = async (data: User) => await User.query().insert(data);

export const updateUser = async (id: number, data: Partial<User>) => await User.query().patchAndFetchById(id, data);
export const deleteUser = async (id: number): Promise<void> => {
    await User.query().deleteById(id);
}