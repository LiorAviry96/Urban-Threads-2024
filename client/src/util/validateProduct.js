export function validateProduct(formData) {
  const errors = {};

  if (formData.name === "") {
    errors.name = "Product Name is Required";
  }

  if (formData.price === "") {
    errors.price = "Price is Required";
  }

  if (formData.image === "") {
    errors.image = "Image is Required";
  }
  if (formData.description === "") {
    errors.description = "Description is Required";
  }

  for (const version of formData.versions) {
    if (version.size === "") {
      errors.size = "Size is Required";
    }
    if (version.color === "") {
      errors.color = "Color is Required";
    }
    if (version.stock === "") {
      errors.stock = "Stock Code is Required";
    }
  }

  return errors;
}
