require('dotenv').config()
const express = require('express');
const expressSession = require('express-session');
const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
mongoose.connect(process.env.DBSTR, { useNewUrlParser: true })


const ejs = new require('ejs');

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const allPostsController = require('./controllers/getAllPosts.js')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
global.loggedIn = null;
//middleware
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'keyboard cat', resave: true,
    saveUninitialized: true
}));
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})
app.use('/posts/store', validateMiddleWare);
app.get('/', homeController);
app.get('/posts', allPostsController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);
app.post("/posts/store", authMiddleware, storePostController);
app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);
app.post("/users/login", redirectIfAuthenticatedMiddleware, loginUserController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/logout", logoutController);
app.use((req, res) => res.render('notfound'))

let port=process.env.PORT;
if(port==null || port==""){
    port=4000;
}
app.listen(port, () => {
    console.log('App is listening in port 4000')
})