// FormInput.jsx
import React from "react";

const FormInput = ({
  field,
  value,
  onChange,
  inputClass = "",
  textareaClass = "",
  selectClass = "",
  radioGroupClass = "",
}) => {
  return (
    <>
      {/* TEXT / EMAIL / PASSWORD */}
      {(field.type === "text" ||
        field.type === "email" ||
        field.type === "password") && (
        <input
          type={field.type}
          name={field.name}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={inputClass}
          required={field.required}
        />
      )}

      {/* TEXTAREA */}
      {field.type === "textarea" && (
        <textarea
          name={field.name}
          rows={field.rows || 2}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={textareaClass}
        />
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <select
          name={field.name}
          value={value}
          onChange={onChange}
          className={selectClass}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value} className={opt.className}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* DATE */}
      {field.type === "date" && (
        <input
          type="date"
          name={field.name}
          min={field.min}
          value={value || ""}
          onChange={onChange}
          className={inputClass}
          required={field.required}
        />
      )}

      {/* RADIO GROUP */}
      {field.type === "radio-group" && (
        <div className={radioGroupClass}>
          {field.options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </>
  );
};

export default FormInput;
