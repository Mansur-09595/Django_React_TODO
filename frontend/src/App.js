import React, { useState } from "react";
import {BrowserRouter as  Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";
import TodosList from "./component/todo-list";
import AddTodo from "./component/add-todo";
import Login from "./component/login";
import Signup from "./component/signup";
import TodoDataService from "./services/todos";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  console.log(user);

  const login = async (user = null) => {
    // default user to null
    TodoDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((e) => {
        console.log("login", e);
        setError(e.toString());
      });
  };

  const logout = async () => {
    setToken("");
    setUser("");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  };

  const signup = async (user = null) => {
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
      })
      .catch((e) => {
        console.log(e);
        setError(e.toString());
      });
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link class="nav-link" to={"/todos"}>
                Todos
              </Link>
              {user ? (
                <Link class="nav-link" onClick={logout}>
                  Logout ({user})
                </Link>
              ) : (
                <>
                  <Link class="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <Link class="nav-link" to={"/signup"}>
                    Sign Up
                  </Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className="container mt-4">
        <div className="container mt-4">
          <Routes>
            <Route
              exact
              path={["/", "/todos"]}
              render={(props) => <TodosList {...props} token={token} />}
            ></Route>
            {/* <Route
              path="/todos/create"
              render={(props) => <AddTodo {...props} token={token} />}
            ></Route> */}
            <Route
              exact
              path={["/todos/:id/", "/todos/create"]}
              render={(props) => <AddTodo {...props} token={token} />}
            ></Route>
            <Route
              path="/login"
              render={(props) => <Login {...props} login={login} />}
            ></Route>
            <Route
              path="/signup"
              render={(props) => <Signup {...props} signup={signup} />}
            ></Route>
          </Routes>
        </div>
        <footer
          className="text-center text-lg-start
        bg-light text-muted mt-4"
        >
          <div className="text-center p-4">
            © Copyright
            <a
              target="_blank"
              className="text-reset fw-bold text-decoration-none"
              href="https://github.com/Mansur-09595"
              rel="noreferrer"
            >
              {" "}
              Mansur Musaev
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
