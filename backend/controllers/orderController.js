import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
    return;
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Public
const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log("antes do bgl");
  const order = await Order.findById(req.params.id);
  console.log("depois do bgl");
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    console.log("aqui");
    const updatedOrder = await order.save();
    console.log("chegou");
    return res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
    return;
  }
});
export { addOrderItems, getOrderById, updateOrderToPaid };
