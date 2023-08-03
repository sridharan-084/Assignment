import React from "react";
import Test from "./component/Test";
import Login from "./component/Login";
import Registration from "./component/Registration";
import Details from "./component/Details";
import Home from "./component/Home";
import Payment from "./component/Payment";
import Protected from "./component/Protected";
import AfterLogin from "./component/AfterLoginProtected";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<AfterLogin Component={Login} />} />
          <Route
            path="/register"
            element={<AfterLogin Component={Registration} />}
          />
          <Route path="/subscribe" element={<Protected Component={Home} />} />
          <Route path="/payment" element={<Protected Component={Payment} />} />
          <Route path="/details" element={<Protected Component={Details} />} />
          <Route path="/test" element={<Test></Test>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
