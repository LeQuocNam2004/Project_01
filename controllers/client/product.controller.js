const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

// [GET] /products/
module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({
        position: "desc"
    });

    for (const item of products) {
        item.priceNew = item.price * (1 - item.discountPercentage/100);
        item.priceNew = item.priceNew.toFixed(0);
    }

    // console.log(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory  = req.params.slugCategory;

  const category = await ProductCategory.findOne({
    slug: slugCategory,
    status: "active",
    deleted: false
  });

  const products = await Product.find({
    product_category_id: category.id,
    status: "active",
    deleted: false
  }).sort({ position: "desc" });

  for (const item of products) {
    item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
  }

  console.log(products);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products
  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
      const slug = req.params.slug;
  
      const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
      });
  
      // console.log(product);
  
      res.render("client/pages/products/detail", {
        pageTitle: product.title,
        product: product
      });
    } catch (error) {
      res.redirect("/");
    }
}