import db from '../models/index';



const getTopDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.user.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allcodes, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.allcodes, as: 'genderData', attributes: ['valueVi', 'valueEn'] }
                ],
                limit: limit,
                order: [['createdAt', 'ASC']],
                raw: true,
                nest: true,
            })

            resolve({
                errCode: 0,
                doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}

const getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.user.findAll({
                where: { roleId: 'R2'},
                attributes: {
                    exclude: ['password', 'image']
                },
            })    
            
            resolve({
                errCode: 0,
                doctors
            })

        } catch (error) {
            reject(error);
        }
    })
}

const createDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing required params",
                })
            } else {
                const doctor = await db.markdown.create({
                    ...data
                })
                
                resolve({
                    errCode: 0,
                    message: "Created successful"
                });          
            }
        

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctors, 
    getAllDoctors,
    createDetailInforDoctor,
}