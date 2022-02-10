// основной файл маршрутов который объеденяет их проще говоря связующее звено

const Router = require('express') // получаем роутер из експресса

const router = new Router() // создаем объект этого роутера
const deviceRouter = require('./deviceRouter') // экспортирует маршруты
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
//брэнд, тайм, юзер , девайс будут являться подроутерами
router.use('/user', userRouter) // первый парамет это url по которому тот роутер будет отрабатывать
router.use('/type', typeRouter) // второй парамет сам маршрут
router.use('/brand', brandRouter)
router.use('/device',deviceRouter)
// на данном этапе мы объеденили все роутеры в один
module.exports = router // этот роутер экспортируем из этого файла