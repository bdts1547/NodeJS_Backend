import express from "express";
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/create-user', homeController.createUser);
    router.post('/handle-create-crud', homeController.handleCreateUser);
    router.get('/list-user', homeController.listUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/handle-edit-user', homeController.handleEditUser);
    router.get('/delete-user/:id', homeController.deletUser);

    return app.use('', router);
}


export default initWebRoutes;
