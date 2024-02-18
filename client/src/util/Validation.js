export function validateCheckoutForm(formData) {
  const errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formData.fullName === "") {
    errors.fullName = "Full Name is Required";
  }
  if (formData.email === "") {
    errors.email = "Email Adress is Required";
  }
  if (!email_pattern.test(formData.email)) {
    errors.email = "Email Adress is not valid";
  }

  if (formData.phoneNumber === "") {
    errors.phoneNumber = "Phone Number is Required";
  }
  if (formData.phoneNumber.length !== 10) {
    errors.phoneNumber = "Phone Number should be 10 numbers";
  }
  if (formData.street === "") {
    errors.street = "Street is Required";
  }
  if (formData.houseNumber === "") {
    errors.houseNumber = "House Number is Required";
  }
  if (formData.city === "") {
    errors.city = "City is Required";
  }
  if (formData.country === "") {
    errors.country = "Country is Required";
  }
  if (formData.zipCode === "") {
    errors.zipCode = "Zip Code is Required";
  }
  if (formData.cardNumber === "") {
    errors.cardNumber = "Card Number is Required";
  }
  if (formData.cardNumber.length !== 16) {
    errors.cardNumber = "Card Number should be 16 numbers";
  }

  if (formData.id === "") {
    errors.id = "ID is Required";
  }
  if (formData.id.length !== 9) {
    errors.id = "ID should be 9 numbers";
  }
  if (formData.cvv === "") {
    errors.cvv = "CVV is Required";
  }

  return errors;
}
