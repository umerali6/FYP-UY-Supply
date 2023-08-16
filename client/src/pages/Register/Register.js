import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    if (!email || !name || !password || !confirmPassword || !contactnumber) {
      toast.error("Please fill all the fields.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailMessage("Please enter a valid email.");
      return;
    }

    if (password !== confirmPassword) {
      setPassMessage("Password did not match!");
      toast.error("Passwords do not match.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
        }).then(() => {
          return addDoc(collection(db, "Users"), {
            email,
            password,
            name,
            contactnumber,
            userId: user.uid,
            date: new Date(),
          });
        });
      })
      .then(() => {
        toast.success("Account created successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((error) => console.error(error));
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 11) {
      setContactnumber(value);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="overflow-hidden landing1">
        <div className="container1 py-5  ">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="card-register">
                <div className="card-header">
                  <div className="h4 text-center">
                    <img src="Images/register.png" alt="" />
                    <h4>Registration Form</h4>
                    <br />
                  </div>
                  <div className="card-body ">
                    <div className="form-group-md-3">
                      <div className="form-group-md-3">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Your Name"
                          value={name}
                        />
                        <br />
                      </div>

                      <label>Contact No</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        onChange={handleContactNumberChange}
                        placeholder="Enter Your Contact No"
                        value={contactnumber}
                      />
                      <br />

                      <form>
                        <div className="form-group-md-3 email">
                          <label>Email</label>
                          <input
                            value={email}
                            onChange={(e) => {
                              setEmailMessage("");
                              setEmail(e.target.value);
                            }}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                          {emailMessage && (
                            <p className="error-message">{emailMessage}</p>
                          )}
                        </div>
                        <div className="form-group-md-3">
                          <br />
                          <label>Password</label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            placeholder="Enter your Password"
                          />
                        </div>
                        <br />
                        <div className="form-group-md-3">
                          <label>Confirm Password</label> <br />
                          <input
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                          />
                          {passMessage && (
                            <p className="error-message">{passMessage}</p>
                          )}
                          {password !== confirmPassword && (
                            <p className="error-message">
                              Passwords do not match
                            </p>
                          )}
                        </div>{" "}
                        <br />

                        <button
                          onClick={register}
                          type="button"
                          className="btn btn-dark mt-3"
                          disabled={password !== confirmPassword}
                        >
                          Signup
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
