import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import "./Registration.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./RegistrationSchema";
import { auth, createUserWithEmailAndPassword } from '../../../config/firebase';

const initialValues = {
  // first: "",
  // last: "",
  username: "",
  repassword: "",
  password: "",
};

const Registration = ({history}) => {
  // const [loadings, setLoadings] = useState(false)
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, action) => {
      const { username, password } = values;
      createUserWithEmailAndPassword(auth, username + '@gmail.com', password)
        .then((userCredential) => {
          // setLoadings(false)
          // Signed up 
          const user = userCredential.user;
          console.log({user})
          alert(
            "Register is successful, please login now!"
          );
          window.location.href="/login"
        })
        .catch((error) => {
            // setLoadings(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          
          alert(
            "Register is successful, please login now!"
          );      
        });

      action.resetForm();
    },
  });

  return (
    <div>
      <section
        class="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mt-4">Sign up</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Username
                          </label>
                          <input
                            id="username"
                            name="username"
                            className="form-control"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.username && touched.username ? (
                            <small className="text-danger mt-1">
                              {errors.username}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Confirm Password
                          </label>
                          <input
                            id="repassword"
                            name="repassword"
                            className="form-control"
                            value={values.repassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.repassword && touched.repassword ? (
                            <small className="text-danger mt-1">
                              {errors.repassword}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-right actionButtons">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={resetForm}
                          >
                            Clear
                          </Button>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSubmit}
                            onLoad={true}
                          >
                            Register
                          </Button>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <br />
                        <div className="col text-right">
                          Already have an account? <a href="/login">Sign In Now</a>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
