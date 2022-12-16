const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).sort({datePosted:-1}).populate('userid');
  
    res.render('allposts', {
        blogposts
    })
}; 