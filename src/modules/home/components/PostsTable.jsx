import * as React from "react";
import {
  Typography,
  ListItemText,
  Divider,
  ListItem,
  List,
  styled,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  postsListIsLoadingSelector,
  postsListSelector,
} from "../store/PostsSelector";

const Container = styled(List)`
  width: 100%;
`;

export default function PostsTable() {
  const isPostsLoading = useSelector(postsListIsLoadingSelector);
  const postsList = useSelector(postsListSelector);

  const navigate = useNavigate();

  return (
    <Container>
      {isPostsLoading && (
        <ListItem alignItems="flex-start">
          <Box>
            <CircularProgress />
          </Box>
        </ListItem>
      )}

      {postsList.map(({ title, content, user, id }) => (
        <>
          <ListItem
            key={id}
            alignItems="flex-start"
            onClick={() => {
              navigate(`/post/${id}`);
            }}
          >
            <ListItemText
              primary={title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {content}....
                  </Typography>
                  {` - ${user?.name}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </Container>
  );
}
