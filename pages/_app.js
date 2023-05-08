import "../styles/globals.css";

import { NFTProvider } from "../context/NFTContext";
import { Navbar, Footer } from "../components";
const App = ({ Component, pageProps }) => {
  return (
    <NFTProvider>
      <div className="bg-nft-dark min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </NFTProvider>
  );
};
export default App;
