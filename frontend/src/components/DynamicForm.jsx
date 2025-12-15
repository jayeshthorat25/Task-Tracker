import React from "react";
import FormInput from "./FormInput";

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
  ButtonIcon,
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

          <FormInput
            field={field}
            value={values[field.name]}
            onChange={onChange}
            inputClass={inputClass}
            textareaClass={textareaClass}
            selectClass={selectClass}
            radioGroupClass={radioGroupClass}
          />
        </div>
      ))}

      <button type="submit" className={buttonClass}>
        {ButtonIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
        {submitLabel}
      </button>
    </form>
  );
};

export default DynamicForm;
