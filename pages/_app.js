import "@/styles/globals.css";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

import { Navbar, Footer } from "@/components";
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Script
        src="https://kit.fontawesome.com/39c9d22d07.js"
        crossorigin="anonymous"
      />
    </ThemeProvider>
  );
};
export default App;
