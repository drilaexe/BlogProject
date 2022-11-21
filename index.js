const express = require('express');
const path = require('path');
const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost:27017/Blog_Db', { useNewUrlParser: true })
const ejs = new require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const BlogPost = require('./models/BlogPost.js')

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
});
app.get("/about", (req, res) => {
    res.render('about');
});
app.get("/contact", (req, res) => {
    res.render('contact');
});
app.get("/post/:id", async (req, res) => {
    blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });
});
app.get("/posts/new", (req, res) => {
    res.render('create');
});
app.post("/posts/store", (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error) => {
        await BlogPost.create({...req.body,image:'/assets/img/'+image.name})
        res.redirect('/')
    })
});

app.listen(4000, () => {
    console.log('App is listening in port 4000')
})