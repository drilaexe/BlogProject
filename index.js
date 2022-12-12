const express = require('express');

const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost:27017/Blog_Db', { useNewUrlParser: true })


const ejs = new require('ejs');

const newPostController=require('./controllers/newPost')
const homeController=require('./controllers/home')
const getPostController=require('./controllers/getPost')
const storePostController=require('./controllers/storePost')
const newUserController=require('./controllers/newUser')
const storeUserController=require('./controllers/storeUser');
const loginController=require('./controllers/login');
const loginUserController=require('./controllers/loginUser');

//middleware
const validateMiddleWare=require('./middleware/validationMiddleware')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts/store', validateMiddleWare);
app.get('/',homeController);
app.get("/post/:id",getPostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", storePostController);
app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);
app.get("/auth/register", newUserController);
app.get("/auth/login", loginController);

app.listen(4000, () => {
    console.log('App is listening in port 4000')
})