var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dataBase = mongoose.connect('mongodb://localhost/cacad-website');

var Product = require('./model/product');
var RecipeList = require('./model/recipelist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  product.save(function(err, savedProduct) {
    if(err) {
      response.status(500).send({error: "Could not save product"});
    } else {
      response.send(savedProduct);
    }
  });
});

app.get('/product', function(request, response) {
   Product.find({}, function(err, products) {
     if(err) {
       response.status(500).send({error: "Could not get products"});
     }
     else {
       response.send(products);
     }
   });
});

app.get('/recipelist', function(request, response) {
  RecipeList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, recipeLists) {
    if(err) {
      response.status(500).send({error: "Could not find recipe list."});
    } else {
      response.status(200).send(recipeLists);
    }
  });
});


app.post('/recipelist', function(request, response) {
  var recipeList = new RecipeList();
  wishList.title = request.body.title;

  recipeList.save(function(err, newRecipeList) {
    if(err) {
      response.status(500).send({error: "Could not create recipe list"});
    } else {
      response.send(newRecipeList);
    }
  });
});

app.put('/recipelist/recipe/add', function(request, response) {
  Product.findOne({_id: request.body.productId}, function(err, product) {
    if(err) {
      response.status(500).send({error: "Could not add recipe to list."});
    } else {
      RecipeList.update({_id: request.body.recipeListId}, {$addToSet:
        {products: product._id}}, function(err, recipeList) {
        if(err) {
          response.status(500).send({error: "Could not add recipe to list."});
        } else {
          response.send(recipeList);
        }
      })
    }
  });
})
app.listen(3000, function() {
  console.log("CACAD API running on port 3000.");
});
