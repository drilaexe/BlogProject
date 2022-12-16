const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).sort({datePosted:-1}).limit(6).populate('userid');

    res.render('index', {
        blogposts
    })
}; 