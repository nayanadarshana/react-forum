import * as React from "react";

import { useNavigate } from "react-router-dom";
import {
  styled,
  IconButton,
  Button,
  Typography,
  Box,
  Toolbar,
  AppBar,
  InputBase,
  Menu as MenuIcon,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  mainHasUserProfileSelector,
  mainUserIsLoggingOutSelector,
} from "../../main/store/MainSelector";
import { getPosts } from "../store/PostsSlice";
import { logoutUser } from "../../main/store/MainSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const CreateButton = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
`;

export default function ButtonAppBar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasUserProfile = useSelector(mainHasUserProfileSelector);
  const isLogoutLoading = useSelector(mainUserIsLoggingOutSelector);

  function handleSearchQueryChange({ target }) {
    setSearchQuery(target.value);
  }

  function handleLogout() {
    dispatch(logoutUser());
  }

  React.useEffect(() => {
    dispatch(getPosts(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Forum
          </Typography>

          {hasUserProfile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={handleSearchQueryChange}
                placeholder="Search…"
                value={searchQuery}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          {hasUserProfile && (
            <>
              <CreateButton
                color="success"
                variant="contained"
                onClick={() => navigate("/post/create")}
              >
                Create
              </CreateButton>
              <Button color="inherit" onClick={() => navigate("/home")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                disabled={isLogoutLoading}
              >
                Logout
              </Button>
            </>
          )}
          {!hasUserProfile && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
