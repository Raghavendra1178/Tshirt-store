import React,{useState,useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'






const  Home = () => {
  
  const [products,setProducts]=useState([]);
  const [reload,setReload]=useState(false);

  useEffect(()=>{
    setProducts(loadCart());
  },[reload])

  const loadAllproducts = products=>{
    return(
      <div>
        <h2>This section is to load products </h2>
        {products.map((product,index)=>(
          <Card 
          key={index}
          product={product}
          removeFromCart={true}
          addtoCart={false}
          setReload={setReload}
          reload={reload}
          />
    ))}
      </div>
    )
  }

  const loadCheckout = ()=>{
    return(
      <div>
        <h2>This section is for CheckOUT</h2>
      </div>
    )
  }

  return (
    <Base title='Cart Page' description="Ready to CheckOut">
    <div className="row text-center">
    <div className="col-6">{products.length>0 ? loadAllproducts(products) : (
      <h3>No products in Cart</h3>
    )}</div>
    <div className="col-6">Hello <StripeCheckout
    products={products}
    setReload={setReload}

    /> </div>

    </div>
    </Base>
  )
}

export default Home;