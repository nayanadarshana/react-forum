import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import RooterRouter from "./modules/main/RootRouter";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RooterRouter />
      </BrowserRouter>
    </Provider>
  );
}
