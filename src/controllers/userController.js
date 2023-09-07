import db from '../models/index';
import userService from '../services/userService';


const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    // Check email || password empty
    if (!email || !password) {
        return res.status(500).json({
            errCode: '1',
            errMessage: 'Missing parameters'
        })
    }

    const loginInfo = await userService.getUserLogin(email, password);

    return res.status(200).json({
        ...loginInfo
    })
}

const handleGetAllUsers = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing parameters"
        })
    }

    const dataUser = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users: dataUser
    })
}

const handleCreateNewUser = async (req, res) => {
    const userData = req.body.data;

    const info = await userService.createNewUser(userData);
    return res.status(200).json({
        ...info
    })

}

const handleDeleteUser = async (req, res) => {
    const id = req.body.id;
    const info = await userService.deleteUserById(id);

    return res.status(200).json({
        ...info
    })
}

const handleEditUser = async (req, res) => {
    const data = req.body.data;
    const info = await userService.updateUser(data);
    return res.status(200).json({
        ...info
    })
}

const handleGetAllCode = async (req, res) => {
    try {
        const info = await userService.getAllCode(req.query.type);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}



module.exports = {
    handleUserLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleDeleteUser,
    handleEditUser,
    handleGetAllCode,
}