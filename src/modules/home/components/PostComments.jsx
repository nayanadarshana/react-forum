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
import { useSelector } from "react-redux";

import {
  postsSelectedPostCommentsIsLoadingSelector,
  postsSelectedPostCommentsSelector,
} from "../store/PostsSelector";

const Container = styled(List)`
  width: 100%;
`;

export default function PostComments() {
  const commentsList = useSelector(postsSelectedPostCommentsSelector);
  const isLoading = useSelector(postsSelectedPostCommentsIsLoadingSelector);

  return (
    <Container>
      {isLoading && (
        <ListItem alignItems="flex-start">
          <Box>
            <CircularProgress />
          </Box>
        </ListItem>
      )}

      {commentsList.map(({ id, comment, commentedBy, created }) => (
        <React.Fragment key={id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={""}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment}...
                  </Typography>
                  {` - ${commentedBy.name}`}
                  {` - ${created}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </Container>
  );
}
