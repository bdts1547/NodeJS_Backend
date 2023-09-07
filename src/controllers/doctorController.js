import doctorService from '../services/doctorService';


const handleGetTopDoctors = async (req, res) => {
    const limit = req.query.limit;
    if (!limit) limit = 10;
    
    const info = await doctorService.getTopDoctors(+limit) // Parse to int

    return res.status(200).json({
        ...info
    })
}

const hanldeGetAllDoctors = async (req, res) => {
    try {
        const info = await doctorService.getAllDoctors();
        return res.status(200).json(info)
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}

const handleCreateDetailDoctor = async (req, res) => {
    try {
        const data = req.body.data;
        console.log(data)
        const info = await doctorService.createDetailInforDoctor(data);

        return res.status(200).json({
            ...info
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
        
    }
}


module.exports = {
    handleGetTopDoctors,
    hanldeGetAllDoctors,
    handleCreateDetailDoctor,

}