import db from '../models/index';



const getTopDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.user.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.allcodes, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.allcodes, as: 'genderData', attributes: ['valueVi', 'valueEn'] }
                ],
                limit: limit,
                order: [['createdAt', 'DESC']],
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


module.exports = {
    getTopDoctors,
}