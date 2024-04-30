const Razorpay = require('razorpay')

module.exports.createorder =async(req,res)=>{
  try {
    var instance = new Razorpay({ key_id: 'rzp_test_lQaiC5AbagJXwZ', key_secret: 'OIbscxDvgT55qLYOKZpOxKx6' })
  var options = {
    amount: req.body.price * 100,
    currency: "INR",
    receipt: "receipt#2",
  }
  await instance.orders.create(options, (err, order) => {
    if(order){
      res.json(order.id)
    }
    else {
      console.log(err)
    }
  });  
  } catch (error) {
    console.log('not generated')
  }
 
 
}