const FormInput = ({ field, value, onChange }) => {
  const commonProps = {
    name: field.name,
    value: value || "",
    onChange,
    className: field.className,
    required: field.required,
  };

  if (["text", "email", "password", "date"].includes(field.type)) {
    return (
      <input
        type={field.type}
        {...commonProps}
        placeholder={field.placeholder}
        min={field.min}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        {...commonProps}
        rows={field.rows || 2}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select {...commonProps}>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value} className={opt.className}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "radio-group") {
    return (
      <div className={field.radioGroupClass}>
        {field.options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }

  return null;
};

export default FormInput;
