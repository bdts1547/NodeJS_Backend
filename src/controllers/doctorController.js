import doctorService from '../services/doctorService';


const handleGetTopDoctors = async (req, res) => {
    const limit = req.query.limit;
    if (!limit) limit = 10;
    
    const info = await doctorService.getTopDoctors(+limit) // Parse to int

    return res.status(200).json({
        ...info
    })
}


module.exports = {
    handleGetTopDoctors,
}