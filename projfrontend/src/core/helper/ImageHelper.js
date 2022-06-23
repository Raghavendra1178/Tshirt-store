import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product})=>{
    const imageurl=product ? `${API}/product/photo/${product._id}`:
    `https://cdn.shopify.com/s/files/1/2010/7829/products/Agolde-Rena-Crew-Neck-T-Shirt-White-The-New-Trend_1024x1024.jpg?v=1620090023`
    return(
        <img
              src={imageurl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
    )

}

export default ImageHelper;