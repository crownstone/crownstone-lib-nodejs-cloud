import got from "got";
const LOG = require('debug-level')('crownstone-cloud-requests')
const verboseLOG = require('debug-level')('crownstone-verbose-cloud-requests')

type requestType = "POST" | "GET" | "DELETE" | "PUT" | "PATCH"



export async function req(type: requestType, url: string, options) : Promise<any> {
  let token = Math.floor(Math.random()*1e8).toString(36);
  logRequest(type, url, options, token);
  let result;
  try {
    switch (type) {
      case "POST":
        result = await got.post(url, options); break;
      case "GET":
        result = await got.get(url, options); break;
      case "DELETE":
        result = await got.delete(url, options); break;
      case "PUT":
        result = await got.put(url, options); break;
      case "PATCH":
        result = await got.patch(url, options); break;
    }
    verboseLOG.debug("Request result", result, token)
    return result;
  }
  catch (err) {
    if (err.response) {
      // response error
      let statusCode = err.response.statusCode;
      let body = err.response.body;
      let messageInBody = err.response.body?.err?.message;
      let codeInBody = err.response.body?.err?.code;

      let error = {statusCode, body, message: messageInBody, code: codeInBody};
      LOG.error("Something went wrong with request", token, error);
      throw error;
    }
    else if (err.request) {
      // error during request

    }
    LOG.error("Something went wrong with request", token, err);
    throw err;
  }
}


function logRequest(type: requestType, url: string, options, token: string) {
  let headers = options.headers || null;
  let queryParams = options.searchParams || null;
  let bodyParams = options.json || null;
  let responseType = options.responseType;

  LOG.info("sending", type, "request to", url, 'headers:', headers, 'queryParams:', queryParams, 'bodyParams:', bodyParams, 'responseType', responseType, token);
}