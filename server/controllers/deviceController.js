//создаем класс
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid') // Генерирует случайные уникальные имена id
const path = require('path') // Модуль для выбора пути
class DeviceController{
    //создаем функции
    
    //функция создания
async create (req,res,next){
    try {
        let {name,price,brandId, typeId,info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpeg"
        img.mv(path.resolve(__dirname, '..', 'static',fileName)) // Сервер отдает файлы как статику что бы мы могли эти файлы через браузер получать
                               // что бы переместить файл в папку вызываем функцию mv()
                               //path.resolve() - адаптирует указанный путь к операционной системе 1. __dirname - путь до текущей папки
                               // '..' - вернуться на директорию назад 
        const device = await Device.create({name,price,brandId,typeId,img:fileName})

        if(info){
            info = JSON.parse(info) // парсим массив
            info.forEach(i => {     // пробегаемся по массиву
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            });
        }                       
        
        return res.json(device)
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }


}
    
    //функция получения
    async getAll (req,res){
        let {brandId, typeId ,limit, page} = req.query // если типо и брендов небольшое количество по страничный вывод делать не разумно
                                            //можно воспользоваться конструкцией  const {brandId, typeId} = req.query
                                            // но если большое количество то воспользуемся следующей конструкцией с постаничным выводом
                                            // let {brandId, typeId,limit,page} = req.query
                                            // limit - кол-во девайсов отображающихся на одной странице, page - страницы
        page = page || 1 
        limit = limit || 9
        let offset = page*limit - limit // отступ завиист от кол-во товаров                                                       
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit,offset}) // Чтобы посчитать количество страниц на фронте нужно знать общее кол-во товаров
                                                           // которое вернеться нам по заданному запросу findAndCountAll
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId},limit,offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId},limit,offset}) // С базы вернуть только объекты у когорых заданы typeId
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{brandId,typeId},limit,offset})
        }
        return res.json(devices)
    }

    //функция получения одного девайся по айди
    async getOne (req,res){
    const {id} = req.params
    const device = await Device.findOne(
        {   
            where: {id}, //Условие по которомоу девайс искать
            include: [{model: DeviceInfo, as: 'info'}] // помимо устройства необходимо получить модель характеристик
        }

        )
        return res.json(device)
    }
     
    }
    module.exports = new DeviceController() // на выходе новый объект созданный из этого класса