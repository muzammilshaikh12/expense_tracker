const Razor_pay = require("razorpay");

const Order = require("../models/order");

exports.purchasePremium = async (req, res, next) => {
  try {
    console.log('Expense Tarcker')
    var instance = new Razor_pay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    console.log("hadbugihigsuicjspcdjn");
    instance.orders.create(
      {
        amount,
        currency: "INR",
      },

      (error, order) => {
        console.log(order)
        if (error) {
          throw new Error(error);
        }
        req.user
          .createOrder({ orderid: order.id, status: "PENDING" })
          .then(() => {
            return res.status(201).json({ order, key_id: instance.key_id });
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    );
    console.log('Hiiiiiiiiiiiiii')
  } catch (error) {
    return res.status(403).json({ message: "Something Went wrong", error });
  }
};

exports.updateStatus = (req, res, next) => {
  try {
    const { paymentId, orderId } = req.body;
    Order.findOne({ where: { orderid: orderId } })
      .then((order) => {
        order
          .update({ paymentid: paymentId, status: "SUCCESSFULL" })
          .then(() => {
            req.user.update({ isPremium: true });
            return res
              .status(202)
              .json({ sucess: true, message: "Transaction Successful" });
              
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    return res.status(403).json({ message: "Something Went wrong", error });
  }
};
