class Services {
  getListProductAPI() {
    const url = "https://6a183c621878294b597ca1e4.mockapi.io/api/Product";

    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  }
}
export default Services;
