// require('dotenv').config();
// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');



// const app = express();

// const PORT = 3000;

// app.use('/blog',require('./controller/BlogRouter'))
// app.use('/user',require('./controller/UserRouter'))

// app.use(morgan('dev'))
// app.use(express.json())
// app.get('/', (req,res)=>{
//     res.send("Hello !")
// })

// app.listen(PORT,()=>
// { console.log(`Server is running on port: ${PORT}`);}
// )


// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   mongoose.connection.once("open", () => {
//     console.log("connected to mongo");
//   });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const PORT = 3000;
const MongoStore = require('connect-mongo');


app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session(
  {
    
    secret : process.env.SECRET,
    store : MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    resave: false,
    saveUninitialized : true
  }));



// App settings  View Engine
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static('public'));

//Extra Routes
app.use('/blog', require('./controller/BlogRouter'))
app.use('/user', require('./controller/UserRouter'))


// app.get('/', (req, res) => {
//     res.send('Hello')
// })
app.get('/', (req, res) => {
    res.render('pages/HomePage')
})




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

    // connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // confirm that we have a connection to MongoDB
      mongoose.connection.once("open", () => {
        console.log("connected to mongo");
      });
})