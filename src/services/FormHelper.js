const FormHelper = {
  handleChanger: (component) => (e) => {
    const name = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    component.setState(prevState => {
      return {
        errors: {...prevState.errors, [name]: null},
        [name]: value
      };
    });
  }
};

export default FormHelper;