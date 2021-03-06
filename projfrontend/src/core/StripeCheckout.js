import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton 
from 'react-stripe-checkout';
import { API } from '../backend';
import {createOrder} from "./helper/orderHelper";



const StripeCheckout = ({products,setReload = f =>f,reload=undefined})=>{

    const [data,setData]= useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token=isAuthenticated() && isAuthenticated().token;
    const userId=isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = ()=>{
        let amount=0;
        products.map((product)=>{
            amount=amount+product.price;
        })
        return amount;
    }

    const makePayment = token=>{
        const body={
            token,products
        }
        const headers={
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            const {status}=response;
            console.log("STATUS",status);
            
        }).catch(err=>console.log(err))
    }

   const showStripeButton = ()=>{
    return isAuthenticated() ? (
        <StripeCheckoutButton
        stripeKey="pk_test_51LCIaXSJWF4xdZQFUjd509Y5rinYuM5SNVuEYSdY04weF1ZmSoitRBcdGFHKNwOXltUecwjJQRhbo9z0p85cJA0d00ej1QV6JY"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy TShirts"
        shippingAddress
        billingAddress
        >
        <button className="btn btn-success">Pay With Stripe</button>
        </StripeCheckoutButton>
    ): (
        <Link to="/signin">
         <button className="btn btn-warning">Signin</button>
        </Link>
    )
   }

   

    return(
        <div>
        <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
        {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;