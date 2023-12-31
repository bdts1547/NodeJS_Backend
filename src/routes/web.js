import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/create-user', homeController.createUser);
    router.post('/handle-create-crud', homeController.handleCreateUser);
    router.get('/list-user', homeController.listUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/handle-edit-user', homeController.handleEditUser);
    router.get('/delete-user/:id', homeController.deletUser);

    // admin
    router.post('/api/login', userController.handleUserLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.get('/api/allcode', userController.handleGetAllCode);

    // doctor
    router.get('/api/get-all-doctors', doctorController.hanldeGetAllDoctors);
    router.get('/api/get-one-doctor', doctorController.handleGetOneDoctor);
    router.post('/api/create-detail-doctor', doctorController.handleCreateDetailDoctor);
    router.put('/api/edit-detail-doctor', doctorController.handleEditDetailDoctor);
    router.get('/api/detail-doctor/:id', doctorController.handleGetOneDoctor);
    router.post('/api/bulk-create-schedule', doctorController.handleBulkCreateSchedule); // todo


    // home
    router.get('/api/top-doctors-home', doctorController.handleGetTopDoctors); // todo
    router.get('/api/get-schedule-by-date', doctorController.handleGetScheduleByDate); // todo



    return app.use('', router);
}


export default initWebRoutes;
