import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);



const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password);
            await db.user.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            })
            

            resolve('ok created')

        } catch (e) {
            reject(e);
        }
    })

}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

const getListUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const allUsers = db.user.findAll({
                raw: true,
            });
            resolve(allUsers);
        } catch (error) {
            reject(error);
        }
    })
}

const getUserById = (userId) => {
    const user = db.user.findOne({
        where: {
            id: userId
        },
        raw: true,
    })
    return user;
}

const updateUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.user.findOne({
                where: {
                    id: data.userId
                }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
    
                await user.save();
                
                return resolve(user);
            } else {
                return resolve();
            }

        } catch (error) {
            reject(error);
        }
    })
}

const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.user.destroy({
                where: {
                  id: userId,
                },
              });
            
            resolve();

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser,
    getListUser,
    getUserById,
    updateUserInfo,
    deleteUserById,
}