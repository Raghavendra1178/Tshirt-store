import React from 'react'
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () =>{

  const {user:{name,email,role}} = isAuthenticated();

  const adminleftside = () =>{
    return(
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        
        <ul className='list-group'>
          <li className="list-group-item">
            <Link to="/admin/create/category" className='nav-link text-success '>Add Category</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className='nav-link text-success '>Manage Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className='nav-link text-success'>Add product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className='nav-link text-success'>Manage Products</Link>
          </li>
        </ul>
        
      </div>
    )
  }

  const adminrightside = () =>{
    return(
      <div className="card mb-4">
      <h4 className="card-header">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Name:
          </span>
          {name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">
            Email:
          </span>
          {email}
        </li>
        <li className="list-group-item">
          <span className="badge badge-danger">Admin</span>
        </li>
      </ul>
      </div>
     
    )
  }
  return(
    <div>
      <Base title="Welcome to Admin Area" description="Manage all products here"
      className='container bg-success p-4'>
        <h1>
        <div className="row">
        <div className="col-4"> {adminleftside()} </div>
        <div className="col-8">  {adminrightside()}</div>
        </div>
          
         
        </h1>
      </Base>
    </div>
  )
}

export default AdminDashboard;