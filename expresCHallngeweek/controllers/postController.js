const posts = require("../post.json");
const fs = require("fs");

function save_data() {
    const js_str = JSON.stringify(posts, null, 2);
    fs.writeFileSync("./post.json", js_str);
}

exports.gitAll = (req, res) => {
    res.send(posts);
};

exports.gitID = (req, res) => {
    const idP = req.params.id;
    const post = posts.find((postI) => postI.id === parseInt(idP));
    res.status(200).send(post);
};

exports.addPost = (req, res) => {
    const { post } = req.body;
    const id = posts.length + 1;
    const newPost = { id, post };
    posts.push(newPost);

    save_data();
    res.send('Post added successfully');
};

exports.UpdatePost = (req, res) => {
    const idP = req.params.id;
    const Upost = req.body.name;
    const index = posts.findIndex((post) => post.id === parseInt(idP));
    posts[index].name = Upost;
    save_data();
    res.send('update');
};

exports.searchP = (req, res) => {
    const postName = req.query.name;

    const searchResult = posts.find(post => post.name === postName);
    res.send(searchResult);
};


exports.DeleteP = (req, res) => {
    const idP = req.params.id;
    const index = posts.findIndex((post) => post.id === parseInt(idP));
        posts.splice(index, 1);
        save_data();
        res.send('Post deleted successfully');
  
};

