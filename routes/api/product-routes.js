const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Get all products
router.get("/", async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Tag,
          through: ProductTag,
          as: "tags",
        },
      ],
    });
    res.json(dbProductData);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get one product by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const dbProductData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        {
          model: Tag,
          through: ProductTag,
          as: "tags",
        },
      ],
    });

    if (!dbProductData) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(dbProductData);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// Create new product
router.post("/", async (req, res) => {
  const { product_name, price, stock, category_id, tagIds } = req.body;

  try {
    // Check if required fields are present
    if (!product_name || !price) {
      return res.status(400).json({ message: "Please provide a product name and price" });
    }

    // Create the product with the provided data
    const newProduct = await Product.create({ product_name, price, stock, category_id });

    // Handle associated tags
    if (tagIds && tagIds.length > 0) {
      const productTagIds = tagIds.map((tag_id) => ({ product_id: newProduct.id, tag_id }));
      await ProductTag.bulkCreate(productTagIds);
    }

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ message: "Failed to create product", error: err });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const { category_id, tagIds, ...productData } = req.body;

  try {
    // Check if category_id exists in the category table
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ message: "Invalid category_id" });
    }

    // Update product data
    await Product.update(productData, { where: { id: req.params.id } });

    // Update associated tags
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Create new associations
    const newProductTags = tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({ product_id: req.params.id, tag_id }));
    await ProductTag.bulkCreate(newProductTags);

    // Remove old associations
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !tagIds.includes(tag_id))
      .map(({ id }) => id);
    await ProductTag.destroy({ where: { id: productTagsToRemove } });

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(400).json({ message: "Failed to update product", error: err });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProductCount = await Product.destroy({ where: { id: req.params.id } });
    if (deletedProductCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product", error: err });
  }
});

module.exports = router;
