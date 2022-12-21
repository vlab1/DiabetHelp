import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import Loader from "./components/layout/loader/Loader.jsx";
import { useRoutes } from "./routes";

const App = () => {
  const { token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
  
  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isAuthenticated,
        }}
      >
        <BrowserRouter>
          {/* {!isLogin && <Header />}
          <div>{routes}</div>
          {!isLogin && <Footer />} */}
          <Header />
          <div>{routes}</div>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
