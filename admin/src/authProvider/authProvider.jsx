// in src/authProvider.ts
export const authProvider = {
  // called when the user attempts to log in
  login: ({ email, password }) => {
    const request = new Request(`${process.env.REACT_APP_URL}api/account/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(async ({ data }) => {
        const request1 = new Request(`${process.env.REACT_APP_URL}api/account`, {
          method: "GET",
          body: null,
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${data}`,
          }),
        });
        const response = await fetch(request1);
        const json = await response.json();
        const role = json.data.role;
        if (role !== "Admin") {
          throw new Error("No access");
        } else {
          localStorage.setItem("permissions", role);
          localStorage.setItem("token", data);
        }
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  getIdentity: () =>
  Promise.resolve(null),

  getPermissions: () => {
    // const role = localStorage.getItem("permissions");
    // return role ? Promise.resolve(role) : Promise.reject();
    const token = localStorage.getItem("token");
    const request = new Request(`${process.env.REACT_APP_URL}api/account`, {
      method: "GET",
      body: null,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const role = json.data.role;
        if (role !== "Admin") {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");
          throw new Error("No access");
        } 
        else {
          return role ? Promise.resolve(role) : Promise.reject();
        }
      }).catch(() => {
        throw new Error("Network error");
      });
  },
};
