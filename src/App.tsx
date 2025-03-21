import React, { useState } from "react";
import "./App.css";
import Router from "./routers/Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DisplayContext } from "./context/DisplayContext";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { DynamicFilterProvider } from "./context/DynamicFilterContext";

function App() {
  const [isItem, setIsItem] = useState(true);

  return (
    <>
      <AuthProvider>
        <DisplayContext.Provider value={{ isItem, setIsItem }}>
          <DynamicFilterProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </DynamicFilterProvider>
        </DisplayContext.Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </>
  );
}

export default App;
