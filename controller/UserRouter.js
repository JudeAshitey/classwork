const express = require("express");
const UserModel = require("../models/UserSchema");

const router = express.Router();
// Render the Signin Form
router.get('/signin', (req, res) => {
  res.render('Users/Signin')
})


// Add Privacy to this router or routes
// router.use((req,res,next) =>{
//    if(req.session.loggedIn){
//     next()
//    } else{
//     res.redirect('/user/signin')
//    }
// })




router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({}); //Retrieves documents related to backend
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(403).send("Cannot GET");
  }
});


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


// Signin an User
// router.post('/signin', async (req, res) => {
//   try {
//     // find user by email in db
//     const user = await UserModel.findOne({email: req.body.email})
//     if (!user) return res.send('Please check your email and password!')
//     // checks if passwords match
//     const decodedPassword = await bcrypt.compare(req.body.password, user.password)
//     if (!decodedPassword) return res.send('Please check your email and password!')
//     // redirect to /blogs
//     res.redirect('/blog')

//     // set the user session
//     //create a new username in the session obj using the user info from db
//     req.session.username = user.username;
//     req.session.loggedIn = true;
//   } catch (error) {
//     console.log(error);
//     res.status(403).send("Cannot POST"); 
//   }
// })


//Signout User and destroy session

router.get('/signout', (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
})







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
    try {//Updates the data and returns the updated version
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body,  {'returnDocument' :"after"})
        res.send(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(403).send("Cannot PUT user by id");
    }
})




// Delete user
router.delete('/:id', async (req, res) => {
    try { //Deletes the user and returns the results
        const deletedUser = await UserModel.findByIdAndRemove(req.params.id)
        res.send(deletedUser)
    } catch (error) {
        console.log(error);
        res.status(403).send("Cannot DELETE user by id");
    }
})



module.exports = router;