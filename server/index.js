require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express();
app.use(cors()) // передаем корс в апп что бы передавать запросы с браузера
app.use(express.json()) // для того что бы наше приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname,'static'))) // что бы раздавать файлы из папки статик явно
app.use(fileUpload({})) // для того что бы наше приложение могло загружать файлы
app.use('/api', router) // первый параметр url по которому роутер должен обрабатываться, второй параметр сам роутер

app.use(errorHandler) // middleware который работает с ошибками должен регистрироваться в самом конце он замыкающий

//Функция для подключения к базе данных
//Функция асинхронная потому что все операции с базой данных 
// являются осинхронными 
const start = async ()=> {
// все это обернем в блок try/catch что бы отлавливать потенциально возможные ошибки
// и что бы наше приложение не падало
try { 
    
    await sequelize.authenticate() // с помощью нее установливается подключение 
                                  //к базе данных(функция ассинхронная) поэтому вызываем await
    await sequelize.sync() // функция сверяет состояние базы данных со схемой данных
    app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
} catch (err) {
    console.log(err) 
} 
}
   
start()
 
 


