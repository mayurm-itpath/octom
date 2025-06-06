import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/index.js";
import { PersistGate } from "redux-persist/integration/react";
import SearchTasksProvider from "./context/SearchTasksProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <SearchTasksProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </SearchTasksProvider>
  </>
);
