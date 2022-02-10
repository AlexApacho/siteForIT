//  файл маршрута user 
const Router = require('express') // получаем роутер из експресса
const router = new Router() // создаем объект этого роутера
const userController = require('../controllers/userController')

router.post('/registration', userController.registration) // без скопок мы ее не вызываем а передаем как объект
router.post('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router // этот роутер экспортируем из этого файла