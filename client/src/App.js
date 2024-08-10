import "./App.scss";
import React, { createContext, useState, useEffect } from "react";
import HeaderBar from "./components/Header";
import { Row } from "@carbon/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./components/Chat.js";
import Onboard from "./components/Onboard.js";

export const AppContext = createContext();

function App() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [customerName, setCustomerName] = useState("wxflows");

  useEffect(() => {
    try {
      const userProps = JSON.parse(localStorage.getItem("userProps") || "{}");

      setColor(userProps.color || { r: 0, g: 0, b: 0, a: 1 });
      setCustomerName(userProps.customerName || "wxFlows");
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      // Fallback to default values if there's an error
      setColor({ r: 0, g: 0, b: 0, a: 1 });
      setCustomerName("wxFlows");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <AppContext.Provider
          value={{ color, setColor, customerName, setCustomerName }}
        >
          <HeaderBar />
          <Row>
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/onboard" element={<Onboard />} />
            </Routes>
          </Row>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
