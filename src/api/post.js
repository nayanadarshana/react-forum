import Request from "./Request";

const POSTS_ENDPOINT = "/posts";

const PostsAPI = {
  getPosts: new Request(POSTS_ENDPOINT).get,
  getPost: postId => new Request(`${POSTS_ENDPOINT}/${postId}`).get,
  createPost: new Request(POSTS_ENDPOINT).post,
  getPostComments: postId =>
    new Request(`${POSTS_ENDPOINT}/${postId}/comments`).get,
  postApproval: postId =>
    new Request(`${POSTS_ENDPOINT}/approval/${postId}`).post,
  deletePost: postId => new Request(`${POSTS_ENDPOINT}/${postId}`).delete,
};

export default PostsAPI;
