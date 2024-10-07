import React from "react";

const FormField = ({
  label,
  fieldName,
  fieldValue,
  fieldType,
  setValue,
  contentErrorMessage,
}) => {
  return (
    <div className="field-container">
      <label htmlFor={fieldName}>{label}</label>
      <input
        onChange={(e) => handleChange(e, setValue)}
        className="input"
        type={fieldType}
        name={fieldName}
        value={fieldValue}
      />
      {fnEmptyError && (
        <span className="empty-field">*Please fill this field</span>
      )}
      {fnContentError && (
        <span className="error-msg">{contentErrorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
