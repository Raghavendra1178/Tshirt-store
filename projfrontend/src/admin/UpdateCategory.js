import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  getCategory,
  updateCategory
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated()

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setName({...name, error: data.error});
            } else {
                setName(data.name);
            }
        });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success text-center"> Category Updated successfully</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className="text-danger text-center"> Failed to Update category</h4>
        }
    }

    const onHandleChange = event => {
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        updateCategory(match.params.categoryId ,user._id, token, name)
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
    }

  const createCategoryForm = () => (
    <form>
      <div className="form-group mt-4">
        <input
          onChange={onHandleChange}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Catgeory
      </button>
    </form>
  );

  return (
    <Base
      title="Update Categories Here!"
      description="Welcome to Update Category section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
