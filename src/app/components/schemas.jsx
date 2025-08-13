import * as yup from "yup";

const users = [
  {
    name: "Ahmed",
    age: "26",
    phone: "01032440162",
    username: "ahmed047",
    email: "Jaden_yoky2@yahoo.com",
    password: "1234567",
    confirmPassword: "1234567",
  },
  {
    name: "Ahmed224",
    age: "24",
    phone: "01032440162",
    email: "Jaden_yoky@yahoo.com",
    password: "1234567",
    confirmPassword: "1234567",
  },
];

export const stepSchemas = [
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name least ( 3 - 18 ) letters")
      .max(18, "Name least ( 3 - 18 ) letters")
      .matches(
        /^(?=(?:.*[A-Za-z]){3,})[A-Za-z\s]*$/,
        "Only letters are allowed"
      ),
    age: yup
      .string()
      .required("Age is required")
      .nullable()
      .when({
        is: (value) => value?.length > 0, // لو فيه أي حاجة مكتوبة
        then: (schema) =>
          schema
            .min(1, "Age least ( 1 ) digits")
            .matches(/^[0-9]*$/, "Invalid age"),
      }),
    phone: yup
      .string()
      .notRequired()
      .nullable()
      .when({
        is: (value) => value?.length > 0, // لو فيه أي حاجة مكتوبة
        then: (schema) =>
          schema
            .min(11, "Phone number least ( 11 ) digits")
            .matches(/^[0-9+]*$/, "Invalid phone number"),
      }),
  }),
  yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "At least ( 3 - 18 ) characters")
      .max(18, "At least ( 3 - 18 ) characters")
      .test("unique-username", "Username already taken", (value) => {
        if (!value) {
          return false;
        }
        return !users.some(
          (user) => user.name.toLowerCase() === value.toLowerCase()
        );
      }),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .test("unique-email", "Email already taken", (value) => {
        if (!value) {
          return false;
        }
        return !users.some(
          (user) => user.email.toLowerCase() === value.toLowerCase()
        );
      }),
  }),
  yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password least ( 6 ) characters"),
    confirmPassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
];
