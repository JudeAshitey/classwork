// const express = require('express');


// const router = express.Router();


// const UserModel = require('../models/UserSchema')


// // router.get('/',(req,res)=>{
// //     res.send('hello from blog router')
// // })

// router.get('/', async (req,res) =>{
//     try{
//         const blogs = await UserModel.find({})
//         res.send(blogs)
//     } catch(error) {
//         console.log(error);
//         res.status(403).send('Cannot get')
//     }
// })

// // GET Blog by ID
// router.get('/:id' , async(req,res) =>{
//     try {
//         const blog = await UserModel.findById(req.params.id)
//         res.send(blog)
//     } catch (error) {
//         console.log(error);
//         res.status(403).send('Cannot get')
//     }
// })




// // router.post('/',(req,res)=>{
// //       console.log(req.body)

// //       BlogModel.create()
// //     /*  res.send(req.body) */ 
// //       .then(data =>{
// //         console.log(data);
// //         res.send(data)
// //       })
// //       .catch(error =>{
// //         console.log(error);
// //         res.status(403).send('Cannot create')
// //       })
// // })

// router.post('/', async(req,res) =>{
//     try{
//         const newBlog = await UserModel.create(req.body)
//         res.send(newBlog)
//     } catch(error){
//         console.log(error);
//         res.status(403).send('Cannot create')
//     }
    
    
// })




// //PUT : Update By ID
// router.put('/:id', async(req,res) =>{
//     //
//     try {
//         const updateBlog = await UserModel.findByIdAndUpdate(req.params.id, req.body,{'returnDocument':"after"});
//     } catch (error) {
//         console.log(error);
//         res.status(403).send('Cannot create')
//     }
// })


// // DELETE
// router.delete('/:id', async(req,res) =>{
//     try {
//        const deletedBlog = await UserModel.findByIdAndRemove(req.params.id)
//        console.log(deletedBlog);
//        res.send('Blog Deleted');
//     } catch (error) {
//         console.log(error);
//         res.status(403).send('Cannot create')
//     }
// })
// module.exports = router;


const express = require("express");
const UserModel = require("../models/UserSchema");

const router = express.Router();
// Render the Signin Form
router.get('/signin', (req, res) => {
  res.render('Users/Signin')
})


// Add Privacy to this router or routes
router.use((req,res,next) =>{
   if(req.session.loggedIn){
    next()
   } else{
    res.redirect('/user/signin')
   }
})




router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(403).send("Cannot GET");
  }
});


// Signin an User
router.post('/signin', async (req, res) => {
  try {
    // find user by email in db
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) return res.send('Please check your email and password!')
    // checks if passwords match
    const decodedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!decodedPassword) return res.send('Please check your email and password!')
    // redirect to /blogs
    res.redirect('/blog')

    // set the user session
    //create a new username in the session obj using the user info from db
    req.session.username = user.username;
    req.session.loggedIn = true;
  } catch (error) {
    
  }
})


//Signout User and destroy session

router.get('/signout', (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
})




router.post("/", async (req, res) => {
  try {
    // check if user exist
    const userAlreadyExist = await UserModel.find({ email: req.body.email });

    // if there is a object inside of the array
    if (userAlreadyExist[0]) {
      return res.send("User Already exist!");
    }

    // Create a new user
    const user = await UserModel.create(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(403).send("Cannot POST");
  }
});


// Find user by id
router.get('/:id', async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(403).send("Cannot GET user by id");
      }
    
})

// PUT update a user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body,  {'returnDocument' :"after"})
        res.send(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(403).send("Cannot PUT user by id");
    }
})

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndRemove(req.params.id)
        res.send(deletedUser)
    } catch (error) {
        console.log(error);
        res.status(403).send("Cannot DELETE user by id");
    }
})

module.exports = router;

