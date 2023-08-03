import services from '../services/CRUDService'


const getHomePage = (req, res) => {
    return res.send('home')
}

const createUser = async (req, res) => {
    return res.render('createUser.ejs');
}

const listUser = async (req, res) => {
    const data = await services.getListUser();

    return res.render("listUser.ejs", { data: data })
}

const handleCreateUser = async (req, res) => {
    let message = await services.createNewUser(req.body);
    console.log(message);
    return res.status(200).json({
        stata: 200,
        message: "success",
    })
}

const editUser = async (req, res) => {
    const userId = req.params.id;
    if (userId) {
        const user = await services.getUserById(userId);
        return res.render('editUser.ejs', { user: user})
    }

    return res.send('Not found user');
}

const handleEditUser = async (req, res) => {
    const data = req.body;
    const user = await services.updateUserInfo(data);
    const allUsers = await  services.getListUser();
    return res.render('listUser.ejs', { data: allUsers})
}

const deletUser = async (req, res) => {
    const id = req.params.id;
    await services.deleteUserById(id);
    return res.send('Delete successful')
}

module.exports = {
    getHomePage,
    createUser,
    handleCreateUser,
    listUser,
    editUser,
    handleEditUser,
    deletUser,
}