import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/create-user', homeController.createUser);
    router.post('/handle-create-crud', homeController.handleCreateUser);
    router.get('/list-user', homeController.listUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/handle-edit-user', homeController.handleEditUser);
    router.get('/delete-user/:id', homeController.deletUser);

    router.post('/api/login', userController.handleUserLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    return app.use('', router);
}


export default initWebRoutes;
