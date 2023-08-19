import db from '../models/index';
import bcrypt from 'bcryptjs';



const getUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            const loginInfo = {};
            const user = await db.user.findOne({
                attributes: ['email', 'roleId', 'password'],
                where: {
                    email: email
                },
                raw: true
            })

            if (user) {
                // Check password
                const isPassword = bcrypt.compareSync(password, user.password);

                if (isPassword) {
                    loginInfo.errCode = 0;
                    loginInfo.errMessage = 'OK';

                    delete user.password;
                    loginInfo.user = user;
                } else {
                    loginInfo.errCode = 3;
                    loginInfo.errMessage = 'Wrong password';
                }
            } else {
                loginInfo.errCode = 2;
                loginInfo.errMessage = "Email isn't exist."
            }

            resolve(loginInfo);
        } catch (e) {
            reject(e);
        }
    })
}

const getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let dataUser;
            if (userId === "all") {
                dataUser = await db.user.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } else {
                dataUser = await db.user.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(dataUser);

            
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getUserLogin,
    getAllUsers,
}