import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postCreatePostIsLoadingSelector,
  postCreatePostSuccessSelector,
} from "../store/PostsSelector";
import { usePrevious } from "../../../hooks/usePrevious";
import { createPost } from "../store/PostsSlice";

const PageContainer = styled(Container)`
  padding: 10px;
`;

const HeaderContainer = styled(Container)`
  margin-top: 20px;
`;

const TitleInput = styled(TextField)`
  width: 500px;
  max-width: 100%;
  margin-bottom: 10px;
`;

const PostContainer = styled(Container)`
  margin-top: 40px;
  margin-bottom: 40px;
  line-height: 30px;
`;

const StyledCommentTextArea = styled(TextareaAutosize)`
  width: 1000px;
  max-width: 100%;
  min-height: 200px;
  padding: 10px;
`;

const ActionContainer = styled(Container)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0px !important;

  button {
    margin-right: 10px;
  }
`;

export default function CreatePostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isLoading = useSelector(postCreatePostIsLoadingSelector);
  const isCreateSuccess = useSelector(postCreatePostSuccessSelector);
  const preIsLoading = usePrevious(isLoading);

  function handleCreatePost() {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length > 0 && trimmedContent.length > 0) {
      dispatch(
        createPost({
          title: trimmedTitle,
          post_content: trimmedContent,
        })
      );
    }
  }

  useEffect(() => {
    if (preIsLoading && !isLoading && isCreateSuccess) {
      navigate("/home");
    }
  }, [preIsLoading, isLoading, isCreateSuccess, navigate]);

  return (
    <PageContainer>
      <HeaderContainer>
        <Typography variant="h5">Create New Post</Typography>
        <TitleInput
          type="text"
          placeholder="Enter post title here..."
          onChange={({ target }) => setTitle(target.value)}
        />
        <Divider />
      </HeaderContainer>

      <PostContainer>
        <StyledCommentTextArea
          value={content}
          onChange={({ target }) => setContent(target.value)}
          aria-label="empty textarea"
          placeholder="Enter post content here..."
        />
      </PostContainer>

      <ActionContainer>
        <Button
          disabled={isLoading}
          variant="contained"
          color="success"
          onClick={handleCreatePost}
        >
          Create Post
        </Button>

        <Button
          disabled={isLoading}
          variant="contained"
          color="error"
          onClick={() => {
            navigate("/home");
          }}
        >
          Cancel
        </Button>
      </ActionContainer>
    </PageContainer>
  );
}
