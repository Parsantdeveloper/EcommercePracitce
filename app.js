
import express from 'express';
const morgan = require("morgan");
const fs = require("fs");
const categoryRouter=require("./src/controllers/category")
const productRouter=require("./src/controllers/product")



// Create an Express application
const app = express();

// Setup logging using Morgan
app.use(morgan('common', { stream: fs.createWriteStream('./app.log') }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Set views and view engine
app.set('views', './src/views');
app.set("view engine", "ejs");


app.get('/', function(req, res) {
  res.render('index',); 
});

//router setup
app.use("/category",categoryRouter);
app.use("/product",productRouter);
// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(error) {
  if (error) {
    console.error("Failed to start server:", error);
  } else {
    console.log("App listening on port", PORT);
  }
});
