import controlValid from './controlValid';

const controlChange = (form, payload) => {
    const controls = { ...form.controls };
    const { control, value } = payload;
    const updatedControl = { ...controls[control] };

    updatedControl.touched = true;
    updatedControl.config = { ...controls[control].config };
    updatedControl.value = value;
    updatedControl.validation = { ...controls[control].validation };

    if (updatedControl.validation) {
        const { errors, isValid } = controlValid(updatedControl);
        updatedControl.errors = errors;
        updatedControl.valid = isValid;
    }


    controls[control] = updatedControl;
    const valid = Object
        .keys(controls)
        .every(key => controls[key].valid);

    return { ...form, controls, valid };
};

export default controlChange;