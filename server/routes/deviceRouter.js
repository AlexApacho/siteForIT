//  файл маршрута device 
const Router = require('express') // получаем роутер из експресса
const router = new Router() // создаем объект этого роутера
const deviceController = require('../controllers/deviceController')
router.post('/',deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getOne) // получение отдельно взятого девайся после того как мы перешли на страницу подробной информации
module.exports = router // этот роутер экспортируем из этого файла