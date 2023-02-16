import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Dashboard } from "./components/Dashboard";
import { PageNotFound } from "./components/PageNotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UpdateEmail } from "./components/UpdateEmail";
import { UpdatePassword } from "./components/UpdatePassword";
import * as ROUTES from "./routes/routes";
import { ForgotPassword } from "./components/ForgotPassword";
import { useUserAuth } from "./context/userAuthContext";
import { Spinner } from "./components/Spinner";
import "./App.css";

const App = () => {
  const [showSignInMessage, setShowSignInMessage] = useState(false);
  const { loading } = useUserAuth();

  return (
    <div className="app">
      {loading && <div className="overflow"></div>}
      {loading && <Spinner />}
      {showSignInMessage && (
        <p className="message">Log in with your credentials</p>
      )}
      <Routes>
        <Route
          index
          path={ROUTES.SIGN_UP}
          element={<SignUp setMessage={setShowSignInMessage} />}
        />
        <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
        <Route
          path={ROUTES.SIGN_IN}
          element={<SignIn setMessage={setShowSignInMessage} />}
        />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard setMessage={setShowSignInMessage} />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.UPDATE_EMAIL}
          element={
            <ProtectedRoute>
              <UpdateEmail />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.UPDATE_PASSWORD}
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
