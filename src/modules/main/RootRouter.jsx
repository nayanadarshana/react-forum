import { Box, CircularProgress, Container, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import PostPage from "../home/pages/PostPage";
import PostsPage from "../home/pages/PostsPage";
import {
  mainIsProfileLoadingSelector,
  mainUserSelector,
} from "./store/MainSelector";
import { getUserProfile } from "./store/MainSlice";
import Header from "../home/components/Header";
import CreatePostPage from "../home/pages/CreatePostPage";

const LoaderContainer = styled(Container)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default function RooterRouter() {
  const dispatch = useDispatch();
  const isProfileLoading = useSelector(mainIsProfileLoadingSelector);
  const userProfile = useSelector(mainUserSelector);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (isProfileLoading)
    return (
      <LoaderContainer>
        <Box>
          <CircularProgress />
        </Box>
      </LoaderContainer>
    );

  return (
    <>
      <Header />
      <Routes>
        {!userProfile && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        {userProfile && (
          <>
            <Route path="/home" element={<PostsPage />} />
            <Route path="/post/create" element={<CreatePostPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
    </>
  );
}
