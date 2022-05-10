import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import NGOHome from "./components/NGOHome";
import DonorHome from "./components/DonorHome";
import DonorPost from "./components/DonorPost";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              {/* <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/ngohome" element={<ProtectedRoute><NGOHome /></ProtectedRoute>} />
              <Route path="/donorhome" element={<ProtectedRoute><DonorHome /></ProtectedRoute>} />
              <Route path="/donorpost" element={<ProtectedRoute><DonorPost /></ProtectedRoute>} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;