import userService from '../services/userService.js';

let handleLogin = async(req, res) => {
    try {
        let {username, password} = req.body;
        let response = await userService.handleLogin(username, password);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

export default {
    handleLogin
}