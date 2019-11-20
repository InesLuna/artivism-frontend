import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true
    });
  }

  signup(user) {
    return this.auth
      .post("/auth/signup", user)
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then( (response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then( (response) => response.data);
  }

  getUser(userId) {
      return this.auth
        .get(`/${userId}`)
        .then((response) => response.data)
  }

  updateUser(user) {
    return this.auth
      .put("/auth/edit", user)
      .then(( response ) => response.data);
  }

  deleteUser(user) {
      return this.auth
        .delete('/auth/delete', user)
        .then((response) => response.data);
  }
}

const authService = new Auth();

export default authService;
