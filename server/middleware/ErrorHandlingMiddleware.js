const ApiError = require('../error/ApiError')
// экспортируем фукнцию (в данном случае функция и есть middleware)
module.exports = function(err, req, res, next){ // параметры err - ошибка , req - запрос , res - ответ, next - передает управление следующему 
                                                //в цепочки middleware
if(err instanceof ApiError){
    return res.status(err.status).json({message: err.message})
}
res.status(500).json({message: "Непредвиденная ошибка"})
}