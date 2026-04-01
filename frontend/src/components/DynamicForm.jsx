import FormInput from "./FormInput";

const DynamicForm = ({
  schema,
  values,
  onChange,
  onSubmit,
  loading,
  submitLabel,
  formClass,
  fieldWrapperClass,
  buttonClass
}) => {

  return(
  <form className={formClass} onSubmit={onSubmit}>
    {schema.map((field)=> (
    <div key={field.name} className={fieldWrapperClass}>
      <label className="" htmlFor={field.name}>{field.label}</label>
      <FormInput
        field={field}
        value={values[field.name]}
        onChange={onChange}
      />
    </div>
    )
    )}

    <button type="submit" className={buttonClass} disabled={loading}> {submitLabel} </button>

  </form>
  )

}

export default DynamicForm;
