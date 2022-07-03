import React from "react";
import { Container, styled } from "@mui/material";
import PostsTable from "../components/PostsTable";

const PageContainer = styled(Container)`
  margin-top: 20px;
`;

export default function PostsPage() {
  return (
    <PageContainer>
      <PostsTable />
    </PageContainer>
  );
}
