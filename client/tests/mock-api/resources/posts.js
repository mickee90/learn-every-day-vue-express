module.exports = {
  posts: [
    {
      id: 1,
      user_id: 2,
      title: "First post",
      published_date: "2020-01-01 20:00:00",
      content: "First post of the year"
    },
    {
      id: 2,
      user_id: 2,
      title: "Second post",
      published_date: "2020-01-01 20:00:00",
      content: "Second post of the year"
    },
    {
      id: 3,
      user_id: 2,
      title: "Third post",
      published_date: "2020-01-01 20:00:00",
      content: "Third post of the year"
    },
    {
      id: 4,
      user_id: 3,
      title: "Fourth post",
      published_date: "2020-01-01 20:00:00",
      content: "Fourth post of the year"
    }
  ],
  findByUserId(user_id) {
    const posts = this.posts.find(post => post.user_id === parseInt(user_id));

    return posts || [];
  },
  findByUserId(post_id) {
    const post = this.posts.find(post => post.id === parseInt(post_id));

    return post || {};
  }
};
