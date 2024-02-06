const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filter-state.helper");

// [GET] /admin/products/
module.exports.index = async(req, res) => {
  // Status Filter
  const filterState = filterStatusHelper(req.query);
  // End Status Filter

  // console.log(filterState);

  const find = {
    deleted: false
  }

  if(req.query.status) {
    find.status = req.query.status;
  }

  // Search
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End Search

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterState: filterState,
    keyword: req.query.keyword
  });
}