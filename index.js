const express=require('express');
const path=require('path');
const app=new express();
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/Blog_Db',{useNewUrlParser:true})
app.use(express.static('public'));
const ejs=new require('ejs');
app.set('view engine','ejs');
app.get("/", (req,res)=> {
        // res.sendFile(path.resolve(__dirname,'pages/index.html'))
    res.render('index');
    }
);
app.get("/about", (req,res)=> {
    // res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
}
);
app.get("/contact", (req,res)=> {
    // res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
}
);
app.get("/post", (req,res)=> {
    // res.sendFile(path.resolve(__dirname,'pages/post.html'))
    res.render('post');
}
);
app.listen(4000,()=>{
    console.log('App is listening in port 4000')
})