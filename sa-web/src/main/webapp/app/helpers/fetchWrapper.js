/* eslint-disable */
import * as qs from "qs";
import $ from "jquery";
/*
 * This is a wrapper class around fetch api.
 */
export function initFetch() {
  function ajaxSetup(type, withCredentials) {
    $.ajaxSetup({
      contentType: type,
      dataType: "json",
      // $FlowFixMe: suppressing this error until we can refactor
      xhrFields: {
        withCredentials: withCredentials
      }
    });
  }

  function done(data: any, textStatus: string, jqXHR: JQueryXHR) {
    if (textStatus == "error") {
      return $.Deferred().reject("Unable to handle the request. Please contact Adminstrator");
    }
    if (data.success) {
      return data;
    } else {
      return $.Deferred().reject(data && data.errMsg);
    }
  }

  window.$formPost = function(url, data) {
    ajaxSetup("application/x-www-form-urlencoded; charset=UTF-8", true);
    return $.post(url, qs.stringify(data)).then(done);
  };

  window.$get = function(url): JQueryPromise<any> {
    ajaxSetup("application/json", true);
    return $.get(url).then(done);
  };

  window.$post = function(url, data) {
    ajaxSetup("application/json", !(url.indexOf("forgetPass") > -1 || url.indexOf("register") > -1));
    return $.post(url, JSON.stringify(data)).then(done);
  };

  window.$put = function(url, data) {
    ajaxSetup("application/json", true);
    return $.ajax({
      url: url,
      type: "PUT",
      data: JSON.stringify(data)
    }).then(done);
  };

  window.$put = function(url, data) {
    ajaxSetup("application/json", true);
    return $.ajax({
      url: url,
      type: "PUT",
      data: JSON.stringify(data)
    }).then(done);
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
        window.$get(url).then(done);
      }
      poll(1000);
    });
  };
}
