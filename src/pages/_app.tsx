import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "@/components/Header";
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
