export const handleResponse = response => {
  if (response.status === 403) {
    return response.json();
  } else if (response.status >= 400 && response.status < 500) {
    console.error("400+ err");
    throw new Error(response.statusText);
  } else if (response.status >= 500) {
    console.error("500+ err");
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
};

export class HttpError extends Error {
  code;
  name;
  status;

  constructor(source, code) {
    super(source.message || source);
    this.code = code || source.code || 500;

    for (const key in source) {
      if (source.hasOwnProperty(key) && key !== "message" && key !== "code") {
        this[key] = source[key];
      }
    }
  }
}

export class Http {
  request(method, path, body, query, token) {
    const requestId = ++this.requestId;
    if (body) {
      console.log(`${requestId} >>> ${method} ${path}`, body);
    } else {
      console.log(`${requestId} >>> ${method} ${path}`);
    }

    if (query) {
      const params = [];
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          params.push(
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(String(query[key]))
          );
        }
      }
      path += "?" + params.join("&");
    }

    const headers = {};

    // token = token || (this.sessionProvider.session && this.sessionProvider.session.access_token);
    if (token !== null) {
      headers.Authorization = "Bearer " + token;
    }

    const fetchOptions = { method: method.toUpperCase(), headers };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
      headers["content-type"] = "application/json";
    }

    return fetch(path, fetchOptions)
      .then(res => {
        return res.json().then(data => {
          if (res.status >= 400) {
            const err = new Error(data.message || res.statusText);
            Object.keys(data).forEach(key => {
              err[key] = data[key];
            });
            err.status = res.status;
            throw err;
          }

          console.log(
            `${requestId} <<< ${method} ${path}: ${res.status}`,
            data
          );

          return data;
        });
      })
      .catch(err => {
        if (err.message === "Failed to fetch") {
          // Presume this is a CORS error
          err = new HttpError("Server cannot be reached", 503);
          //notify electron
        }
        console.error(
          `${requestId} <<< ${method} ${path}: ${err.status}  ${err.message}`,
          err
        );
        throw err;
      });
  }

  get(path, token) {
    return this.request("GET", path, null, null, token);
  }

  post(path, body, query, token) {
    return this.request("POST", path, body, query, token);
  }

  put(path, body, query, token) {
    return this.request("PUT", path, body, query, token);
  }

  delete(path, body, query, token) {
    return this.request("DELETE", path, body, query, token);
  }
}
