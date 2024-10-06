// при получении запроса от клиента, запрос передается в конвеер обработки запросов.
// Конвеер обработки состоит из компонентов, которые в терминологии express называются Middleware

var express = require('express');

var app = express();
// для регистрации middleware используется функция use, all, app.METHOD()
    // 1. request - данные запроса
    // 2. response - объект для управления ответом
    // 3. next - следующая в конвейере обработки функция
app.use('/', function(request, response, next){
    console.log('Prehandler...');
    // передаем управление следующему обработчику
    next();
});
app.use('/about', function(request, response, next){
    console.log('ABOUT Prehandler...');
    // передаем управление следующему обработчику
    next();
});
app.get('/', function(request, response,next){
    console.log('Main handler');
    // завершаем ответ от сервера
    //response.end();
    next();
});

app.get('/about', function(request, response){
    console.log('About handler');
    // завершаем ответ от сервера
    response.end();
});
app.all('*', function(request, response){
    console.log('All handler!!!');
    // завершаем ответ от сервера
    response.end();
});



app.listen(8080, function(){
    console.log('Server start')
});