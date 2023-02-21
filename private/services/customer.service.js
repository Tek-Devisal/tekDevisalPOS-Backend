const Customer = require("../schemas/Customers");

// Create new customer
async function createCustomer({ req }) {
  try {
    const doesexist = await Customer.findOne({ email: req.body.email });
    if (doesexist) {
      return { message: "Customer with same email already exists" };
    } else {
      const result = await Customer.create({
        ...req.body,
      });
      if (result != null) {
        return { message: "success", data: result };
      }
      return { message: "failed to add new Customer, please try again." };
    }
  } catch (error) {
    return { message: "an error occurred, please try again ", error };
  }
}

// Fetch customers information
async function fetchCustomers({ shop_id }) {
  try {
    const result = await Customer.find({ shop_id });
    return { message: "success", data: result };
  } catch (error) {
    return { message: "an error occurred, please try again" };
  }
}

async function editCustomers({ req }) {
  try {
    result = await Customer.updateOne(
      {
        _id: req.body._id,
      },
      {
        ...req.body,
      }
    );

    if (result) {
      return { message: "customer editted successfully", data: result };
    }

    return { message: "failed to edit customer, please try again" };
  } catch (error) {
    return { message: "an error occurred, please try again", error };
  }
}

async function deleteCustomers({ req }) {
  try {
    result = await Customer.findByIdAndRemove({
      _id: req.body._id,
    });

    if (result) {
      return { message: "success", data: result };
    }

    return { message: "failed to delete customer, please try again" };
  } catch (error) {
    return { message: "an error occurred, please try again", error };
  }
}

module.exports = {
  createCustomer,
  fetchCustomers,
  editCustomers,
  deleteCustomers,
};
