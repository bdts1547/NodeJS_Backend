import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const isExistEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await db.user.findOne({
                where: {email: email}
            })
            if (user) {
                resolve(true);
            } 
            resolve(false);
        } catch (error) {
            reject(error)
        }
        
    })
}

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

const createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const _isExistEmail = await isExistEmail(data.email);
            if (_isExistEmail) {
                resolve({
                    errCode: 1,
                    message: "Your email exists"
                })
            } else {
                const hashPassword = await bcrypt.hashSync(data.password, salt);
                const newUser = await db.user.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                })
    
                resolve({
                    errCode: 0,
                    message: "User is created!"
                });

            }

        } catch (error) {
            reject(error);
        }
    })
}

const deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const isDelete = await db.user.destroy({
                where: {id: userId}
            })
            if (isDelete) {
                resolve({
                    errCode: 0,
                    message: "User is deleted!"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "User's not found!"
                });
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                const user = await db.user.findOne({
                    where: {id: data.id},
                    raw: false
                })

                if (!user) {
                    resolve({
                        errCode: 2,
                        message: "User's not found"
                    })
                } else {
                    user.email = data.email;
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;

                    user.save();
                    resolve({
                        errCode: 0,
                        message: "User is updated!"
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    getUserLogin,
    getAllUsers,
    createNewUser,
    deleteUserById,
    updateUser,
}