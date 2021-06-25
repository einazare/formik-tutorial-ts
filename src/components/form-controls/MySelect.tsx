import React from "react";
// plugins
import { useField } from "formik";
import classNames from "classnames";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  if (sessionStorage.getItem(field.name) !== field.value) {
    sessionStorage.setItem(field.name, field.value);
  }
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={classNames("select-input", {
          "select-input-error": meta.touched && meta.error,
        })}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
