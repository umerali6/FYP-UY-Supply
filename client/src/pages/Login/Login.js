import { useFormik } from "formik";
import { loginSchema } from "../../utils";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"



const Login = () => {
  const navigate = useNavigate();


  const submitHandler = (values) => {
    console.log(values);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then((auth) => {
        localStorage.setItem("isUserLoggedin", "yes");
        if (formik.values.email === "umeraliusmani1@gmail.com") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Incorrect email or password", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error.message);
      });
  };
  

  return (
    <div>
      {/* <Navbar/> */}

      <div className="landing1">
        <div className="container pt-5  ">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="cardlogin">
                <div className="card-header">
                  <div className="h4 text-center">
                    <img src="/images/login.png" alt="..." />
                    <h4>Login Form</h4>
                    <br />
                  </div>
                  <ToastContainer />
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group-md-3">
                      <label>Email</label>
                      <input
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.email && formik.touched.email
                            ? "form-control input-error"
                            : "form-control"
                        }
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p className="error">{formik.errors.email}</p>
                      )}
                    </div>

                    <div className="form-group-md-3">
                      <br />
                      <label>Password</label>
                      <input
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        id="password"
                        type="password"
                        placeholder="Enter your Password"
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.password && formik.touched.password
                            ? "form-control input-error"
                            : "form-control"
                        }
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className="error">{formik.errors.password}</p>
                      )}
                    </div>
                    <br />

                    <button
                      onClick={signIn}
                      disabled={formik.isSubmitting}
                      type="submit" // change from "button" to "submit"
                      className="btn btn-dark  md-4">
                      Login
                      <br />
                    </button>

                    <div className="Signup">
                      {" "}
                      <a href="/register">Didn't Have an Account ? Signup</a>
                    </div>

                    <div className="forgotlink">
                      <a href="/forgotpassword"> Forgot Password</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
