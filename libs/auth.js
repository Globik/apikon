import Users from './../models/Users.js';

export default isAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const user = await Users.findOne({
            where: { token: req.headers.authorization.replace('Bearer ', '') }
        });
    
        if (!user) {
            return res.status(401).json({ error: true, message: 'Ошибка авторизации! Попробуйте зайти по новой.' });
        }
        user.password = undefined;
    
        res.json({ user: user })
    } else {
        return res.status(400).json({ error: true, message: 'Укажите API токен!' });
    }
}

