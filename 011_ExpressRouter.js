var express = require('express');
var app = express();

var fs = require('fs');
var path = 'logger.txt';

app.use(function(request, response,next){
    var data = `Address : ${request.ip}; Time: ${new Date().toLocaleString()}; URL : ${request.url}\n`;

    fs.appendFile(path, data, function(err){
        console.log('data wrote');
    });
    next();
});


// Класс Router позволяет определить маршрут, в пределах которого можно создавать подмаршруты и задавать им обработчики
var router = express.Router();
var router2 = express.Router();


router.route("/")
            .get(function(req, res){     


                fs.readFile('products.txt', {encoding : 'utf-8'}, function(err, data){
                    if(err){
                        console.log(err);
                        response.send('<h1>404</h1>');
                        return;
                    }
                    const products = [];
    
                    data.split('\n').forEach(line => {
                        if (line) {
                            products.push(JSON.parse(line));
                           
                        }
                    });
                    res.send(products.map(product => `name: ${product.name}, description: ${product.description}, price: ${product.price}`).join('<br>'));
                });


            })

router.route("/:name")
            .get(function(req, res){     
           

                fs.readFile('products.txt', {encoding : 'utf-8'}, function(err, data){
                    if(err){
                        console.log(err);
                        res.send('<h1>404</h1>');
                        return;
                    }
                    const products = [];
    
                    data.split('\n').forEach(line => {
                        if (line) {
                            products.push(JSON.parse(line));
                           
                        }
                    });
                   
                    let product;

                    for (let i = 0; i < products.length; i++) {
                        if (products[i].name=== req.params.name) {
                            product = products[i];
                            break; 
                        }
                    }
        
                    if (product) {
                        res.send(`name: ${product.name}, description: ${product.description}, price: ${product.price}`);
                    } else {
                        res.send('<h1>404</h1>');
                    }
                });

            })


           





            router2.route("/")
            .get(function(req, res){     


                fs.readFile('categories.txt', {encoding : 'utf-8'}, function(err, data){
                    if(err){
                        console.log(err);
                        response.send('<h1>404</h1>');
                        return;
                    }
                    const categories = [];
    
                    data.split('\n').forEach(line => {
                        if (line) {
                            categories.push(JSON.parse(line));
                           
                        }
                    });
                    res.send(categories.map(category => `${category.index}. ${category.name}`).join('<br>'));
                });


            })










            router2.route("/:id")
            .get(function(req, res){     
           

                fs.readFile('categories.txt', {encoding : 'utf-8'}, function(err, data){
                    if(err){
                        console.log(err);
                        res.send('<h1>404</h1>');
                        return;
                    }
                    const categories = [];
    
                    data.split('\n').forEach(line => {
                        if (line) {
                            categories.push(JSON.parse(line));
                           
                        }
                    });
                   
                    let category;

                    for (let i = 0; i < categories.length; i++) {
                        if (categories[i].index=== req.params.id) {
                            category = categories[i];
                            break; 
                        }
                    }
        
                    if (category) {
                        res.send(`name: ${category.name},  ${category.index}`);
                    } else {
                        res.send('<h1>404</h1>');
                    }
                });

            })





app.use("/products", router);
app.use("/categories", router2);




app.get("/", function(req, res){     
    res.send("Главная страница");
});




app.listen(8080, function(){
    console.log('Server start')
});

