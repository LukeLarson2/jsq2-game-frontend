"use client";
import React from "react";
import Input from "./Input";
import Select from "./Select";
import RadioButton from "./RadioButton";

import "../stylesheets/FormikControls.css";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select": {
      return <Select {...rest} />;
    }
    case "radio": {
      return <RadioButton {...rest} />;
    }
    default:
      return null;
  }
}

export default FormikControl;
