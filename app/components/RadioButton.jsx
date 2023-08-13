import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import getRoleColor from "../utils/getRoleColor";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control-radio">
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment
                key={option.key}
                className="character-creation-role-icon-container"
              >
                <input
                  style={{ opacity: 0, position: "absolute" }}
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>
                  <div
                    className="character-creation-role-image-container"
                    style={{
                      backgroundColor:
                        field.value === option.value
                          ? getRoleColor(option.value)
                          : "white",
                    }}
                  >
                    <div
                      className="character-creation-role-icon"
                      style={{ backgroundImage: `url(${option.url})` }}
                    >
                      <div className="character-creation-role-name">
                        {option.key}
                      </div>
                    </div>
                  </div>
                </label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default RadioButton;
