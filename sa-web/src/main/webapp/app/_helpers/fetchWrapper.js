// import * as $ from 'jquery';
// import Cookies from 'universal-cookie';

export function initFetch() {
  let realFetch = window.fetch;
  function status(response) {
    if (response.ok) {
      return response;
    } else if (response.status === 401) {
      localStorage.removeItem("user");
      // location.push("/");
    } else {
      var data = response.data;
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  }

  function headers(options) {
    options = options || {};
    options.method = options.method || "GET";
    options.headers = options.headers || {};
    return options;
  }

  function credentials(options) {
    options = options || {};
    if (options.credentials == null) {
      options.credentials = "include";
    }
    return options;
  }

  function json(response) {
    return response.json();
  }

  function text(response) {
    return response.text();
  }

  window.$fetch = function(url, options) {
    options = headers(credentials(options));
    return realFetch(url, options).then(status);
  };

  window.$getText = function(url, options) {
    options = headers(credentials(options));
    return realFetch(url, options)
      .then(status)
      .then(text);
  };

  window.$getJSON = function(url, options) {
    options = headers(credentials(options));
    options.headers["Accept"] = "application/json";
    return realFetch(url, options)
      .then(status)
      .then(json);
  };

  window.$post = function(url, body) {
    const options = headers(credentials());
    options.method = "POST";
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
    return realFetch(url, options).then(status);
  };

  window.$put = function(url, body) {
    const options = headers(credentials());
    options.method = "PUT";
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
    return realFetch(url, options).then(status);
  };

  window.$delete = function(url, options) {
    options = headers(credentials(options));
    options.method = "DELETE";
    return realFetch(url, options).then(status);
  };

  window.$Poll = function(url, options) {
    return new Promise(function(resolve, reject) {
      function poll(wait) {
        function done(response) {
          switch (response.status) {
            case 200:
              resolve(response);
              break;
            case 202:
              setTimeout(poll, wait, wait * 1.5);
              break;
            default:
              var error = new Error(response.statusText || response.status);
              // error.response = response;
              reject(error);
              break;
          }
        }
        window.$get(url, options).then(done, reject);
      }
      poll(1000);
    });
  };
}
