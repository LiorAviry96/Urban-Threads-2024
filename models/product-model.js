const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  stock: {
    type: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };

const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Nike T-Shirt",
    price: 19.99,
    image:
      "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/486409s.jpg",
    description: "A comfortable and versatile classic T-shirt.",
    stock: [
      {
        color: "White",
        size: "XL",
        quantity: 10,
      },
      {
        color: "White",
        size: "L",
        quantity: 5,
      },
      {
        color: "White",
        size: "M",
        quantity: 15,
      },
      {
        color: "White",
        size: "S",
        quantity: 13,
      },
      {
        color: "Black",
        size: "XL",
        quantity: 22,
      },
      {
        color: "Black",
        size: "S",
        quantity: 12,
      },
      {
        color: "Black",
        size: "M",
        quantity: 20,
      },
      {
        color: "Black",
        size: "L",
        quantity: 2,
      },
      {
        color: "Red",
        size: "L",
        quantity: 9,
      },
      {
        color: "Red",
        size: "S",
        quantity: 15,
      },
    ],
  },
  {
    id: "p2",
    name: "Flare Jeans",
    price: 39.99,
    image: "https://is4.revolveassets.com/images/p4/n/uv/CITI-WJ1687_V1.jpg",
    description: "Stylish and comfortable flare jeans for any occasion.",
    stock: [
      {
        color: "Blue",
        size: "32",
        quantity: 10,
      },
      {
        color: "Blue",
        size: "34",
        quantity: 20,
      },
      {
        color: "Blue",
        size: "36",
        quantity: 15,
      },
      {
        color: "Blue",
        size: "38",
        quantity: 3,
      },
      {
        color: "Black",
        size: "34",
        quantity: 17,
      },
      {
        color: "Black",
        size: "38",
        quantity: 4,
      },
      {
        color: "Light Blue",
        size: "32",
        quantity: 14,
      },
      {
        color: "Light Blue",
        size: "34",
        quantity: 18,
      },
      {
        color: "Light Blue",
        size: "36",
        quantity: 19,
      },
    ],
  },

  {
    id: "p3",
    name: "Short Shirt",
    price: 49.99,
    image: "https://is4.revolveassets.com/images/p4/n/uv/OASR-MS9_V1.jpg",
    description: "Slim and comfortable Shirt in few colors",
    stock: [
      {
        color: "Purple",
        size: "XL",
        quantity: 10,
      },
      {
        color: "Purple",
        size: "L",
        quantity: 11,
      },
      {
        color: "White",
        size: "M",
        quantity: 16,
      },
      {
        color: "White",
        size: "S",
        quantity: 10,
      },
      {
        color: "Green",
        size: "XL",
        quantity: 10,
      },
      {
        color: "Green",
        size: "L",
        quantity: 15,
      },
      {
        color: "Green",
        size: "M",
        quantity: 30,
      },
    ],
  },
  {
    id: "p4",
    name: "501 Skinny Jeans",
    price: 99.99,
    image: "https://is4.revolveassets.com/images/p4/n/uv/LEIV-WJ112_V1.jpg",
    description: "Levis 501 Skinny Jeans",
    stock: [
      {
        color: "Light Blue",
        size: "34",
        quantity: 10,
      },
      {
        color: "Light Blue",
        size: "36",
        quantity: 22,
      },
      {
        color: "Light Blue",
        size: "38",
        quantity: 16,
      },
      {
        color: "Light Blue",
        size: "40",
        quantity: 2,
      },
    ],
  },
  {
    id: "p5",
    name: "Mini black dress",
    price: 49.99,
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W8208R_01_b1_s1_a1_1_m18_750x.jpg?v=1706828987",
    description: "Alo Yoga Black mini dress",
    stock: [
      {
        color: "Black",
        size: "XS",
        quantity: 30,
      },
      {
        color: "Black",
        size: "S",
        quantity: 29,
      },
      {
        color: "Black",
        size: "M",
        quantity: 16,
      },
      {
        color: "Black",
        size: "L",
        quantity: 12,
      },
    ],
  },
  {
    id: "p6",
    name: "Vans T Shirt",
    price: 29.99,
    image:
      "https://www.jeanjail.com.au/cdn/shop/products/GlobalRoots50_50ShortSleeveTeeDustyKhaki1_800x.jpg?v=1644293140",
    description: "Classic Vans T-shirt in Green or Black",
    stock: [
      {
        color: "Green",
        size: "XS",
        quantity: 20,
      },
      {
        color: "Green",
        size: "S",
        quantity: 19,
      },
      {
        color: "Black",
        size: "XS",
        quantity: 16,
      },
      {
        color: "Black",
        size: "M",
        quantity: 17,
      },
      {
        color: "Black",
        size: "L",
        quantity: 25,
      },
    ],
  },
];

async function initDb() {
  //await ProductModel.deleteMany({}).exec();
  const products = await ProductModel.find();
  if (products.length === 0) {
    for (const product of MOCK_PRODUCTS) {
      const newProduct = new ProductModel(product);
      await newProduct.save();
    }
  }
}

initDb();
