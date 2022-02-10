const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
//Функция для генерации JWT токена
const generateJwt = (id, email, role)=>{
    return jwt.sign(// функция создания токена
        {id, email, role}, //1. аргумент - это информация для HEADER
        process.env.SECRET_KEY,               // 2. аргумент секретный ключ который выносим в .env
        {expiresIn: '24h'}                    // 3. аргумент отвечает за то сколько живет токен 
    )
}

//создаем класс
class UserController{
//создаем функции

//регистрации
async registration (req,res,next){
    const {email, password, role} = req.body
    if(!email||!password){                                  // проверяем коректно ли задан пароль и имэйл
        return next(ApiError.badRequest('Не корерктно задан имейл или пароль'))
    }
    const candidate = await User.findOne({where: {email}}) // проверяем есть ли такой зарегистрированный пользователь в БД по имэйлу
    if(candidate){
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hasPassword = await bcrypt.hash(password,5) // функция хэширование пароля 5 это сколько раз будем хэшировать
    const user = await User.create({email, role, password: hasPassword})
    const basket = await Basket.create({userId:user.id})
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
    } 

//аутентификация
async login (req,res, next){
    const {email, password} = req.body
    const user = await User.findOne({where:{email}})
    if(!user){
        return next(ApiError.internal('Такой пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password) // сравнение пароля введеного и который храниться в БД через хэш
    if(!comparePassword){
        return next(ApiError.internal('Не верно введен пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
}
 
//проверка авторизован ли пользователь или нет
async check (req,res,next){

}

}

module.exports = new UserController() // на выходе новый объект созданный из этого класса