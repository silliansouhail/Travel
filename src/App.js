import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import WelcomesPage from "./pages/WelcomesPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./client_agency/Dashboard";
import Transaction from "./client_agency/Transaction";
import Setting from "./client_agency/Setting";
import Drafting from "./client_agency/Drafting";

function App() {
  const state = useSelector((state) => state.users);
  const agencyUser = useSelector((state) => state.offers.userAgency);

  const user = state.user;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomesPage />} />
        <Route path="/home" element={user ? <HomePage /> : <WelcomesPage />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <WelcomesPage />}
        />
        {agencyUser && (
          <Route
            path="/drafting"
            element={user ? <Drafting /> : <WelcomesPage />}
          />
        )}
        <Route
          path="/transaction"
          element={user ? <Transaction /> : <WelcomesPage />}
        />
        <Route
          path="/setting"
          element={user ? <Setting /> : <WelcomesPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
