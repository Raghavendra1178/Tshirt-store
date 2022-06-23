const stripe=require("stripe")("sk_test_51LCIaXSJWF4xdZQFwlZrrfIcNY7yu4i9GInMK4SbuJWzJHH4KIIGTj2aWyiRn155fyfkZnwsfamd3RV5Ro8RnDQ8000KFQzR7x");

const {v4 : uuidv4} = require('uuid');

exports.makepayment = (req,res)=>{
    const {products,token}=req.body;
    console.log("PRODCUTS",products);

    let amount=0;
        products.map((product)=>{
            amount=amount+product.price;
        })
    const idempotencyKey=uuidv4();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:amount*100,
            currency:'usd',
            receipt_email:token.email,
            description:'testinf one',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }

            }
        },{idempotencyKey})
        .then(result=>res.status(200).json(result))
        .catch(err=>console.log(err));
    })

}