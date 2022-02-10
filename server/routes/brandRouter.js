//  файл маршрута брэнд 
const Router = require('express') // получаем роутер из експресса
const router = new Router() // создаем объект этого роутера
const brandController = require('../controllers/brandController')

router.post('/',brandController.create)
router.get('/',brandController.getAll)

module.exports = router // этот роутер экспортируем из этого файла