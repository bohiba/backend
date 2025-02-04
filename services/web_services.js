const axios = require(`axios`);

const axios = require("axios");

class ApiService {
  // static baseURL = "https://vehicle-information-india.p.rapidapi.com";
  // static headers = {
  //   "X-RapidAPI-Key": "57d19e2aa2mshe46efe4ca88d9d2p189fa5jsn465ca88e94a2",
  //   "X-RapidAPI-Host": "vehicle-information-india.p.rapidapi.com",
  // };

  // Generic API request handler
  static async request({ method, url, headers = {}, body = {}, params = {} }) {
    try {
      const response = await axios({
        method,
        url: url,
        headers: headers,
        data: body,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // GET Request
  static async get({ url, params = {}}) {
    return await this.request("GET", url, {}, params);
  }

  // POST Request
  static async post({url, body = {}}) {
    return await this.request("POST", url, body);
  }

  // PUT Request
  static async put({ url, body = {} }) {
    return await this.request("PUT", url, body);
  }
  // DELETE Request
  static async delete({ url }) {
    return await this.request("DELETE", url);
  }

  // Handle API Errors
  static handleError(error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : error.message);
  }
}

module.exports = ApiService;
