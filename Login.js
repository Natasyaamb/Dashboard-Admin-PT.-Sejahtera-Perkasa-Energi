import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import "./Login.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./RegistrationSchema";
import { auth, signInWithEmailAndPassword } from '../../../config/firebase';

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
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
      // Signed in 
      signInWithEmailAndPassword(auth, username + '@gmail.com', password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.accessToken;
        const userId = user.uid;
        const username = user.username;
        // Set Local Storage
        window.localStorage.setItem('isLogin', true);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userId', userId);
        window.localStorage.setItem('username', username);
        alert('Anda berhasil login');
        window.location.href = '/status-supir'
      })
      .catch((error) => {
        window.localStorage.clear();
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Anda gagal login, pastikan username dan password yang dimasukkan sudah benar!!');
      });

      action.resetForm();
    },
  });

  return (
    <div>
      <section
        class="p-6 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h2 fw-bold mb-5 mt-4">PT. Sejahtera Perkasa Energi</p>
                  <p class="text-center h3">Login</p>
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
                        <div className="col text-right actionButtons">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSubmit}
                            onLoad={true}
                          >
                            Login
                          </Button>
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

export default Login;
