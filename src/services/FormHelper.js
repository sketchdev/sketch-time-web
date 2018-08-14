const FormHelper = {
  handleChanger: (component) => (e) => {
    const name = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    component.setState(prevState => {
      let errors = prevState.errors;
      delete errors[name];

      return {
        errors,
        [name]: value
      };
    });
  }
}

export default FormHelper;