import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

import { NFTProvider } from "../context/NFTContext";
import { Navbar, Footer } from "../components";
const App = ({ Component, pageProps }) => {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

      </ThemeProvider>
    </NFTProvider>
  );
};
export default App;
