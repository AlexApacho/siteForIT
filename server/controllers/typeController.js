const {Type} = require('../models/models') // Импортирует модель типа 
const ApiError = require('../error/ApiError')
//создаем класс
class TypeController{
    //создаем функции
    
    //функция создания
    async create (req,res){
        const {name} = req.body
        const type = await Type.create({name}) // функция асинхронная поэтому добавляем await 
        return res.json(type)
    }
     
    //функция получения
    async getAll (req,res){
        const types = await Type.findAll()
        return res.json(types)
    }  
     
    } 
    module.exports = new TypeController() // на выходе новый объект созданный из этого класса    