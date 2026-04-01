const DynamicForm = ({
  fields = [],
  values = {},
  onChange,
  onSubmit,
  submitLabel = "Submit",
  formClass = "",
  fieldWrapperClass = "",
  inputClass = "",
  radioGroupClass = "",
  selectClass = "",
  textareaClass = "",
  buttonClass = "",
  ButtonIcon
}) => {
  return (
    <form onSubmit={onSubmit} className={formClass}>
      {fields.map((field) => (
        <div key={field.name} className={fieldWrapperClass}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.icon && (
              <field.icon className="w-4 h-4 inline mr-1 text-purple-500" />
            )}
            {field.label}
          </label>

          {/* TEXT INPUT */}
          {field.type === "text" || field.type === "email" || field.type === "password" ? (
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              className={inputClass}
              required={field.required}
            />
          ) : null}

          {/* TEXTAREA */}
          {field.type === "textarea" && (
            <textarea
              name={field.name}
              rows={field.rows || 2}
              value={values[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              className={textareaClass}
            />
          )}

          {/* SELECT */}
          {field.type === "select" && (
            <select
              name={field.name}
              value={values[field.name]}
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
              value={values[field.name] || ""}
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
                    checked={values[field.name] === option.value}
                    onChange={onChange}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button type="submit" className={buttonClass}>
        {/* <ButtonIcon /> */}
        {submitLabel}
      </button>
    </form>
  );
};

export default DynamicForm;
