import UserService from '../services/UserService';
import ResHandler from '../middlewares/resHandler';


const resHandler = new ResHandler();

class UserController {

    //Get all Users
    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();
            if(allUsers.lenght > 0) {
                resHandler.setSuccess(200, 'Users retrieved', allUsers);
            } else {
                resHandler.setSuccess(200, 'No Users found');
            }

            return resHandler.send(res);

        } catch (error) {
            console.log(error);
            ResHandler.setError(400, error.message);
            return ResHandler.send(res);
        }
    }

    // Add a new User
    static async addUser(req, res) {
        
        if(!req.body.email) {
            resHandler.setError(400, 'Please provide complete details');
            return resHandler.send(res);
        }
        
        const newUser = req.body;

        try {
            const createdUser = await UserService.addUser(newUser);
            resHandler.setSuccess(201, 'User Added!', createdUser);
            return resHandler.send(res); 
        } catch(error) {
            resHandler.setError(400, error.message);
            return resHandler.send(res);
        }
    }


    
    static async updateUser(req, res) {
        const alteredUser = req.body;
        const { id } = req.params;
        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const updatedUser = await UserService.updateUser(id, alteredUser);
            
            if(!updatedUser) {
                resHandler.setError(404, `Cannot find user with id: ${id}`)
            } else {
                resHandler.setSuccess(200, 'User updated', updatedUser);
            }

            return resHandler.send(res);

        } catch(error) {
            resHandler.setError(404, error.message);
            return resHandler.send(res);
        }
    }


    static async getAUser(req, res) {
       const { id } = req.params;

        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const user = await UserService.getAUser(id);

            if(!user) {
                resHandler.setError(404, `Cannot find user with id: ${id}`);
            } else {
                resHandler.setSuccess(200, 'User found', user);
            }

            return resHandler.send(res);
        } catch(error) {
            resHandler.setError(404, error.message);
            return res.send(res);
        }
 
    }


    static async deleteUser(req, res) {
        const { id } = req.params;

        if(!Number(id)) {
            resHandler.setError(400, 'Please provide a valid numeric value');
            return resHandler.send(res);
        }

        try {
            const userToDelete = await UserService.deleteUser(id);

            if(userToDelete) {
                resHandler.setSuccess(200, 'User deleted');
            } else {
                resHandler.setError(404, `Cannot find user with id: ${id}`);
            }

            return resHandler.send(res);
        } catch(error) {
            resHandler.setError(400, error.message);
            return resHandler.send(res);
        }
    }

}

export default UserController;