export const postsListSelector = state => state.posts.posts;

export const postsListIsLoadingSelector = state => state.posts.isPostsFetching;

export const postsSelectedPostDetailSelector = state =>
  state.posts.selectedPost;

export const postsSelectedPostIsLoadingSelector = state =>
  state.posts.selectedPostLoading;

export const postsSelectedPostCommentsSelector = state =>
  state.posts.selectedPostComments;

export const postsSelectedPostCommentsIsLoadingSelector = state =>
  state.posts.selectedPostCommentsLoading;

export const postsDeletePostIsLoadingSelector = state =>
  state.posts.deletePostLoading;

export const postDeletePostSuccessSelector = state =>
  state.posts.deletePostSuccess;

export const postApprovePostIsLoadingSelector = state =>
  state.posts.approvalPostLoading;

export const postCreatePostIsLoadingSelector = state =>
  state.posts.createPostLoading;

export const postCreatePostSuccessSelector = state =>
  state.posts.createPostSuccess;
