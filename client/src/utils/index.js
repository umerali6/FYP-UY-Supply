import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Please Enter your Email"),
  password: yup.string().min(6).required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password"),
});

export const paymentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
});
