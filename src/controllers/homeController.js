import db from '../models/index';



const getHomePage = async (req, res) => {
    try {
        const users = await db.User.findAll();
        
        return res.render('homepage.ejs', {
            data: JSON.stringify(users),
        });

    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    getHomePage,

}