import { createSlice } from "@reduxjs/toolkit";

import PostsAPI from "../../../api/post";
import { PostApprovalType } from "../../../constants/posts";

const handleGetPostsStart = state => {
  state.posts = [];
  state.isPostsFetching = true;
};

const handleGetPostsSuccess = (state, action) => {
  state.posts = action.payload;
  state.isPostsFetching = false;
};

const handleGetPostsFailed = state => {
  state.posts = [];
  state.isPostsFetching = false;
};

const handleGetPostDetailStart = state => {
  state.selectedPost = undefined;
  state.selectedPostLoading = true;
};

const handleGetPostDetailSuccess = (state, action) => {
  state.selectedPost = action.payload;
  state.selectedPostLoading = false;
};

const handleGetPostDetailFailed = state => {
  state.selectedPost = undefined;
  state.selectedPostLoading = false;
};

const handleGetPostCommentsStart = state => {
  state.selectedPostComments = [];
  state.selectedPostCommentsLoading = true;
};

const handleGetPostCommentsSuccess = (state, action) => {
  state.selectedPostComments = action.payload;
  state.selectedPostCommentsLoading = false;
};

const handleGetPostCommentsFailed = state => {
  state.selectedPost = undefined;
  state.selectedPostCommentsLoading = false;
};

const handleDeletePostStart = state => {
  state.deletePostSuccess = undefined;
  state.deletePostLoading = true;
};

const handleDeletePostSuccess = state => {
  state.deletePostSuccess = true;
  state.deletePostLoading = false;
};

const handleDeletePostFailed = state => {
  state.deletePostLoading = false;
};

const handlePostApprovalStart = state => {
  state.approvalPostLoading = true;
};

const handlePostApprovalSuccess = state => {
  state.approvalPostLoading = false;
};

const handlePostApprovalFailed = state => {
  state.approvalPostLoading = false;
};

const handleCreatePostStart = state => {
  state.createPostSuccess = undefined;
  state.createPostLoading = true;
};

const handleCreatePostSuccess = state => {
  state.createPostSuccess = true;
  state.createPostLoading = false;
};

const handleCreatePostFailed = state => {
  state.createPostSuccess = false;
  state.createPostLoading = false;
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isPostsFetching: false,
    posts: [],
    selectedPost: undefined,
    selectedPostLoading: false,
    selectedPostComments: [],
    selectedPostCommentsLoading: false,
    deletePostSuccess: undefined,
    deletePostLoading: false,
    approvalPostLoading: false,
    createPostLoading: false,
    createPostSuccess: undefined,
  },
  reducers: {
    getPostsStart: handleGetPostsStart,
    getPostsSuccess: handleGetPostsSuccess,
    getPostsFailed: handleGetPostsFailed,
    getPostDetailsStart: handleGetPostDetailStart,
    getPostDetailsSuccess: handleGetPostDetailSuccess,
    getPostDetailsFailed: handleGetPostDetailFailed,
    getPostCommentsStart: handleGetPostCommentsStart,
    getPostCommentsSuccess: handleGetPostCommentsSuccess,
    getPostCommentsFailed: handleGetPostCommentsFailed,
    deletePostStart: handleDeletePostStart,
    deletePostSuccess: handleDeletePostSuccess,
    deletePostFailed: handleDeletePostFailed,
    approvalPostStart: handlePostApprovalStart,
    approvalPostSuccess: handlePostApprovalSuccess,
    approvalPostFailed: handlePostApprovalFailed,
    createPostStart: handleCreatePostStart,
    createPostSuccess: handleCreatePostSuccess,
    createPostFailed: handleCreatePostFailed,
  },
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailed,
  getPostDetailsStart,
  getPostDetailsSuccess,
  getPostDetailsFailed,
  getPostCommentsStart,
  getPostCommentsSuccess,
  getPostCommentsFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  approvalPostStart,
  approvalPostSuccess,
  approvalPostFailed,
  createPostStart,
  createPostSuccess,
  createPostFailed,
} = postsSlice.actions;

export function getPosts(query = "") {
  return async dispatch => {
    try {
      dispatch(getPostsStart());

      const response = await PostsAPI.getPosts({ query });

      dispatch(getPostsSuccess(response.data));
    } catch (err) {
      dispatch(getPostsFailed());
    }
  };
}

export function getPostDetails(postId) {
  return async dispatch => {
    try {
      dispatch(getPostDetailsStart());

      const results = await PostsAPI.getPost(postId)();

      dispatch(getPostDetailsSuccess(results.data));
    } catch (err) {
      dispatch(getPostDetailsFailed());
    }
  };
}

export function getPostComments(postId) {
  return async dispatch => {
    try {
      dispatch(getPostCommentsStart());

      const results = await PostsAPI.getPostComments(postId)();

      dispatch(getPostCommentsSuccess(results.data));
    } catch (err) {
      dispatch(getPostCommentsFailed());
    }
  };
}

export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      dispatch(deletePostStart());

      await PostsAPI.deletePost(postId)();

      dispatch(deletePostSuccess());
    } catch (err) {
      dispatch(deletePostFailed());
    }
  };
}

export function approvePost(postId, approvalType = PostApprovalType.APPROVED) {
  return async dispatch => {
    try {
      dispatch(approvalPostStart());

      await PostsAPI.postApproval(postId)({ status: approvalType });

      await dispatch(getPostDetails(postId));
      dispatch(approvalPostSuccess());
    } catch (err) {
      dispatch(approvalPostFailed());
    }
  };
}

export function createPost(postData) {
  return async dispatch => {
    try {
      dispatch(createPostStart());

      await PostsAPI.createPost(postData);

      dispatch(createPostSuccess());
    } catch (err) {
      dispatch(createPostFailed());
    }
  };
}

export default postsSlice.reducer;
