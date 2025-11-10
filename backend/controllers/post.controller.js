import PostModel from '../models/post.model.js'

export const getAllPosts = async (req, res) => {
  const filter = req.query.filter || '';
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  PostModel.getAll(filter, page, pageSize, (err, rows) => {
    if (err) return res.status(500).json(err);

    PostModel.getCount(filter, (err2, countRow) => {
      if (err2) return res.status(500).json(err2);

      const posts = rows.map(post => ({...post, imageUrl: JSON.parse(post.imageUrl)}));

      res.json({
        data: posts,
        total: countRow.total,
        page,
        pageSize
      });
    });
  });
}

export const createPost = async (req, res) => {
  PostModel.add(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).send({ sucess: true });
  });
}

export const toggleLikePost = async (req, res) => {
  const postId = req.params.id
  PostModel.like(postId, (err) => {
    if (err) return res.status(500).json(err);
    res.send({ sucess: true });
  });
}

export const deletePost = async (req, res) => {
  PostModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.send({ sucess: true });
  });
}