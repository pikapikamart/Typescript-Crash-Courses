import * as yup from "yup";


const payload = {
  password: yup.string()
    .required("Password is required")
    .min(6, "Password's length must be 6 minimum")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin characters"),
    email: yup.string()
    .email("Must be a valid email")
    .required("Email is required")
}

export const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required("Name is required"),
    ...payload,
    passwordConfirmation: yup.string().oneOf([ yup.ref("password"), null ],"Password must match")
  })
});


export const createUserSessionSchema = yup.object({
  body: yup.object({
    ...payload
  })
});