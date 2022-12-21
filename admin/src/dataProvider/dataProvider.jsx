import { Filter } from "react-admin";

const apiUrl = process.env.REACT_APP_URL;
const token = localStorage.getItem("token");

export const dataProvider = {
  getList: (resource, params) => {
    let query = `/admin/get`;
    if (resource === "food") {
      query = ``;
    } else {
      query = `/admin/get`;
    }
    let request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (params.filter.type && params.filter.type.length >= 1) {
      query = `/find?type=${params.filter.type}`;
      request = new Request(apiUrl + `api/` + resource + query, {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (
      resource === "account" &&
      params.filter.email &&
      params.filter.email.length >= 1
    ) {
      query = `/admin/get?email=${params.filter.email}`;
      request = new Request(apiUrl + `api/` + resource + query, {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (
      (resource === "account-food" ||
        resource === "record" ||
        resource === "menu") &&
      params.filter._id &&
      params.filter._id.length >= 1
    ) {
      query = `/admin/get?account_id=${params.filter._id}`;
      request = new Request(apiUrl + `api/` + resource + query, {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i]._id;
          delete data[i]._id;
        }
        return { data: data, total: data.length };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  getOne: async (resource, params) => {
    let query = "";
    if (resource === "account") {
      query = `/admin/find?_id=${params.id}`;
    } else {
      query = `/find?_id=${params.id}`;
    }
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"][0];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  update: async (resource, params) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = "";
    let body = {};
    if (resource === "account") {
      query = "/admin/update/role";
      body = { _id: params.id, role: params.data.role };
    } else {
      query = "/update";
      body = {
        _id: params.id,
        name: params.data.name,
        presize_equiv: params.data.presize_equiv,
        relative_equiv: params.data.relative_equiv,
        presize_equiv_unit: params.data.presize_equiv_unit,
        relative_equiv_unit: params.data.relative_equiv_unit,
        presize_equiv_gCHO: params.data.presize_equiv_gCHO,
        relative_equiv_gCHO: params.data.relative_equiv_gCHO,
        type: params.data.type,
      };
    }
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "PUT",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  create: (resource, params) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let query = "";
    let body = {};
    query = "/create";
    body = {
      _id: params.id,
      name: params.data.name,
      presize_equiv: params.data.presize_equiv,
      relative_equiv: params.data.relative_equiv,
      presize_equiv_unit: params.data.presize_equiv_unit,
      relative_equiv_unit: params.data.relative_equiv_unit,
      presize_equiv_gCHO: params.data.presize_equiv_gCHO,
      relative_equiv_gCHO: params.data.relative_equiv_gCHO,
      type: params.data.type,
    };
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "POST",
      body: body,
      headers: headers,
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  delete: async (resource, params) => {
    let query = "/admin/delete";
    if (resource === "food") {
      query = "/delete";
    } else {
      query = "/admin/delete";
    }
    let body = { _id: params.id };
    body = JSON.stringify(body);
    const request = new Request(apiUrl + `api/` + resource + query, {
      method: "DELETE",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        const data = json["data"];
        data.id = data._id;
        delete data._id;
        return { data: data };
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  deleteMany: async (resource, params) => {
    let query = "/admin/delete";
    if (resource === "food") {
      query = "/delete";
    } else {
      query = "/admin/delete";
    }
    const _ids = [];
    const response = await Promise.all(
      params.ids.map(async (id) => {
        let body = { _id: id };
        body = JSON.stringify(body);
        const request = new Request(apiUrl + `api/` + resource + query, {
          method: "DELETE",
          body: body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        await fetch(request)
          .then(async (response) => {
            if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
            }
            const json = await response.json();
            _ids.push(json["data"]._id);
          })
          .catch(() => {
            throw new Error("Network error");
          });
      })
    );
    return { data: _ids };
  },
};
