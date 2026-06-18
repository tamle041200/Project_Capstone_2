class Filter {
  constructor() {
    this.arrList = [];
  }
  addProduct(product) {
    this.arrList.push(product);
  }
  filterList(type) {
    if (type === "all") {
      return this.arrList;
    }
    let arrFilter = [];
    for (let i = 0; i < this.arrList.length; i++) {
      if (this.arrList[i].type === type) {
        arrFilter.push(this.arrList[i]);
      }
    }
    return arrFilter;
  }
  sortPrice(type, arr) {
    const arrSort = [...arr];

    if (type === "tang") {
      arrSort.sort((a, b) => a.price - b.price);
    }

    if (type === "giam") {
      arrSort.sort((a, b) => b.price - a.price);
    }

    return arrSort;
  }
}
export default Filter;
