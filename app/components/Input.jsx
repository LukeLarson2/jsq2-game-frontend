'use client';
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control-username">
      <Field
        id={name}
        name={name}
        {...rest}
        className="form-control-username-field"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
