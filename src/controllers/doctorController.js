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
            message: "Error from the server"
        })
    }
}

const handleGetOneDoctor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing required parameters"
            })
        }

        const info = await doctorService.getOneDoctor(req.query.id);
        return res.status(200).json(info)
        
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from the server"
        })
    }
}

const handleCreateDetailDoctor = async (req, res) => {
    try {
        const data = req.body.data;
        const info = await doctorService.createDetailInforDoctor(data);

        return res.status(200).json({
            ...info
        })
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from the server"
        })
        
    }
}

const handleEditDetailDoctor = async (req, res) => {
    try {
        const data = req.body.data;
        const info = await doctorService.editDetailDoctor(data)
        return res.status(200).json(info)
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}


module.exports = {
    handleGetTopDoctors,
    hanldeGetAllDoctors,
    handleGetOneDoctor,
    handleCreateDetailDoctor,
    handleEditDetailDoctor,

}