import React from "react";
// plugins
import { useField } from "formik";
import classNames from "classnames";

interface Props {
  childrend: any;
  props: any;
}

const MyCheckbox: React.FC<Props> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  if (sessionStorage.getItem(field.name) !== field.value) {
    sessionStorage.setItem(field.name, field.value);
  }
  return (
    <div>
      <label
        className={classNames("checkbox-input", {
          "checkbox-input-error": meta.touched && meta.error,
        })}
      >
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
