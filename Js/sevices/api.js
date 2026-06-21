class Services {
  getListProductAPI() {
    const url = `https://6a183c621878294b597ca1e4.mockapi.io/api/Product_phone`;

    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  }
  deleteProductApi(id) {
    const url = `https://6a183c621878294b597ca1e4.mockapi.io/api/Product_phone/${id}`;

    const promise = axios({
      url: url,
      method: "DELETE",
    });
    return promise;
  }
  addProductApi(product) {
    const url = `https://6a183c621878294b597ca1e4.mockapi.io/api/Product_phone`;

    const promise = axios({
      url: url,
      method: "POST",
      data: product,
    });
    return promise;
  }
}
export default Services;
