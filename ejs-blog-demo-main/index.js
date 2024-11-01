import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
];

app.get('/', (req, res) => {
  res.render('partials/index.ejs', { blogs: blogs, selectedBlog: null });
});

app.post('/submit', (req, res) => {
  const blogBody = req.body['content'];
  const blogTitle = req.body['title'];
  const blogId = req.body['id'];
  if (blogId) {
    const blog = blogs.find((b) => b.id === parseInt(blogId));
    if (blog) {
      blog.title = blogTitle;
      blog.content = blogBody;
    }
  } else {
    const newBlog = {
      id: blogs.length + 1,
      title: blogTitle,
      content: blogBody,
    };
    blogs.push(newBlog);
  }
  res.render('partials/index.ejs', {
    blogs: blogs,
    selectedBlog: null,
  });
});

app.get('/edit/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const selectedBlog = blogs.find((b) => b.id === blogId);
  if (selectedBlog) {
    res.render('partials/index.ejs', {
      blogs: blogs,
      selectedBlog: selectedBlog,
    });
  } else {
    res.status(404).send('Blog not found');
  }
});

app.post('/delete/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
    res.redirect('/');
  } else {
    res.status(404).send('Blog not found');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
