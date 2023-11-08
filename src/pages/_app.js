import rootReducer from "@/store";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Toaster } from "react-hot-toast";

const Store = createStore(rootReducer);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </Provider>
  );
}
