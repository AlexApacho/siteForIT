//  файл маршрута type 
const Router = require('express') // получаем роутер из експресса
const router = new Router() // создаем объект этого роутера
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)

module.exports = router // этот роутер экспортируем из этого файла