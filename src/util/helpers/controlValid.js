const controlValid = (control) => {
    if (!control.touched) return true;
    return control.valid && control.validation;
};

export default controlValid;