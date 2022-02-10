const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
//создаем класс
class BrandController{
    //создаем функции
    
    //функция создания
    async create (req,res){
        const {name} = req.body
        const brand  = await Brand.create({name})
        return res.json(brand)
    }
    
    //функция получения
    async getAll (req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    
    }
    
    module.exports = new BrandController() // на выходе новый объект созданный из этого класса