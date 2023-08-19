import db from '../models/index';
import userService from '../services/userService';


const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;

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
    const id = req.body.id;
    
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
        user: dataUser
    })
}


module.exports = {
    handleUserLogin,
    handleGetAllUsers,
}