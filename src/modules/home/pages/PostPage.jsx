import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  ListItem,
  styled,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";

import { PostApprovalType, PostStatus } from "../../../constants/posts";
import { usePrevious } from "../../../hooks/usePrevious";
import {
  mainUserIdSelector,
  mainUserIsAdminSelector,
} from "../../main/store/MainSelector";
import PostComments from "../components/PostComments";
import {
  postApprovePostIsLoadingSelector,
  postDeletePostSuccessSelector,
  postsDeletePostIsLoadingSelector,
  postsSelectedPostDetailSelector,
  postsSelectedPostIsLoadingSelector,
} from "../store/PostsSelector";
import {
  approvePost,
  deletePost,
  getPostComments,
  getPostDetails,
} from "../store/PostsSlice";

const PageContainer = styled(Container)`
  width: 100%;
`;

const HeaderContainer = styled(Container)`
  margin-top: 20px;
`;

const PostContainer = styled(Container)`
  margin-top: 40px;
  margin-bottom: 40px;
  line-height: 30px;
`;

const CommentsContainer = styled(Container)`
  margin-top: 40px;
  line-height: 30px;
  padding-top: 10px;
`;

const StyledCommentTextArea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 80px;
  margin-top: 10px;
  padding: 10px;
`;

const CommentsListContainer = styled(Container)`
  margin-top: 20px;
`;

const ActionContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0px !important;
`;

const ActionButton = styled(Button)`
  margin-right: 10px;
`;

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(mainUserIdSelector);
  const isPostLoading = useSelector(postsSelectedPostIsLoadingSelector);
  const deletePostLoading = useSelector(postsDeletePostIsLoadingSelector);
  const deleteSuccess = useSelector(postDeletePostSuccessSelector);
  const post = useSelector(postsSelectedPostDetailSelector);
  const isApprovalLoading = useSelector(postApprovePostIsLoadingSelector);
  const isAdmin = useSelector(mainUserIsAdminSelector);
  const preDeletePostLoading = usePrevious(deletePostLoading);
  const params = useParams();

  const allowDelete = !!post && (isAdmin || userId === post?.user.id);
  const allowApproval =
    !!post && isAdmin && post?.status === PostStatus.PENDING_APPROVAL;

  function handleDeletePost() {
    dispatch(deletePost(params.postId));
  }

  function handleApprove() {
    dispatch(approvePost(params.postId, PostApprovalType.APPROVED));
  }

  function handleReject() {
    dispatch(approvePost(params.postId, PostApprovalType.REJECTED));
  }

  useEffect(() => {
    if (!deletePostLoading && preDeletePostLoading && deleteSuccess) {
      navigate("/home");
    }
  }, [deletePostLoading, preDeletePostLoading, deleteSuccess, navigate]);

  useEffect(() => {
    dispatch(getPostDetails(params.postId));
    dispatch(getPostComments(params.postId));
  }, [dispatch]);

  return (
    <PageContainer>
      <HeaderContainer>
        <Typography variant="h5">{post?.title || "Loading..."}</Typography>
        <Typography variant="subtitle1">{post?.user.name || "-"}</Typography>
        <Typography variant="subtitle2">
          Posted on:{" "}
          {post?.created_time
            ? moment(post.created_time).format("DD MMM YYYY hh:mm a")
            : "-"}
        </Typography>

        <ActionContainer>
          {allowApproval && (
            <>
              <ActionButton
                disabled={isApprovalLoading || deletePostLoading}
                variant="contained"
                color="success"
                onClick={handleApprove}
              >
                Approve
              </ActionButton>
              <ActionButton
                disabled={isApprovalLoading || deletePostLoading}
                variant="outlined"
                color="error"
                onClick={handleReject}
              >
                Reject
              </ActionButton>
            </>
          )}

          {allowDelete && (
            <Button
              disabled={isApprovalLoading || deletePostLoading}
              variant="contained"
              color="error"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          )}
        </ActionContainer>

        <Divider />
      </HeaderContainer>

      <PostContainer>
        {isPostLoading && (
          <ListItem alignItems="flex-start">
            <Box>
              <CircularProgress />
            </Box>
          </ListItem>
        )}
        {post?.content || ""}
      </PostContainer>
      <CommentsContainer>
        <Typography variant="subtitle1">Comments</Typography>
        <StyledCommentTextArea
          aria-label="empty textarea"
          placeholder="Comment here..."
        />
        <Button variant="contained" size="large">
          Post Comment
        </Button>

        <CommentsListContainer>
          <Typography variant="subtitle1">Previous comments</Typography>
          <PostComments />
        </CommentsListContainer>
      </CommentsContainer>
    </PageContainer>
  );
}
