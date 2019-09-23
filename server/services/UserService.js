import db from '../models';

const User = db.User;

class UserService {
    
    static async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error) {
            throw error;
        }
    }


    static async addUser(newUser) {
        try {
            return await User.findOrCreate({
                where: {
                    email: newUser.email
                },
                defaults: newUser
            });
        } catch(error) {
            throw error;
        }
    }

    static async updateUser(id, updateUser) {
        try {
            const userToUpdate = await User.findOne({
                where: {
                    id: Number(id)
                }
            });

            if(userToUpdate) {
                await User.update(updateUser, { 
                    where: {
                        id: Number(id)
                    }
                });

                return updateUser;
            }
            
            return null;
        } catch(error) {
            throw error;
        }
    }


    static async getAUser(id) {
        try {
            const user = await User.findOne({
                where: {
                    id: Number(id)
                }
            });

            return user;
        } catch(error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const userToDelete = await User.findOne({
                where: {
                    id: Number(id)
                }
            });

            if(userToDelete) {
                const deletedUser = await User.destroy({
                    where: {
                        id: Number(id)
                    }
                });

                return deletedUser;
            }

            return null;
        } catch(error) {
            throw error;
        }
    }
}


export default UserService;