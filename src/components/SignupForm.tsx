import React from "react";
import { useLocation } from "react-router-dom";
// plugins
import { Formik, Form } from "formik";
import * as Yup from "yup";
// core components
import MyTextInput from "./form-controls/MyTextInput";
import MySelect from "./form-controls/MySelect";
import MyCheckbox from "./form-controls/MyCheckbox";

const SignupForm = () => {
  const { search } = useLocation();
  return (
    <div>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName:
            new URLSearchParams(search).get("firstName") ||
            sessionStorage.getItem("firstName") ||
            "",
          lastName:
            new URLSearchParams(search).get("lastName") ||
            sessionStorage.getItem("lastName") ||
            "",
          email:
            new URLSearchParams(search).get("email") ||
            sessionStorage.getItem("email") ||
            "",
          acceptedTerms:
            new URLSearchParams(search).get("acceptedTerms") ||
            sessionStorage.getItem("acceptedTerms") ||
            false,
          jobType:
            new URLSearchParams(search).get("jobType") ||
            sessionStorage.getItem("jobType") ||
            "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect>

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
            <button type="reset">Reset</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
