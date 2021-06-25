import React from "react";
// plugins
import { useField } from "formik";
import classNames from "classnames";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  if (sessionStorage.getItem(field.name) !== field.value) {
    sessionStorage.setItem(field.name, field.value);
  }
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={classNames("text-input", {
          "text-input-error": meta.touched && meta.error,
        })}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
