import { configureStore } from "@reduxjs/toolkit";

import postsSlice from "../modules/home/store/PostsSlice";
import mainSlice from "../modules/main/store/MainSlice";

export default configureStore({
  reducer: {
    main: mainSlice,
    posts: postsSlice,
  },
});
