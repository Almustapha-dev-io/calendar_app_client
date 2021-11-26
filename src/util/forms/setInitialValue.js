import controlValid from './controlValid';

const setInitialValue = (form, action) => {
    const controls = {...form.controls};

    Object
        .keys(controls)
        .forEach(key => {
            controls[key] = { ...form.controls[key] };
            controls[key].config = { ...form.controls[key].config };
            controls[key].value = action.payload[key];
            if (form.controls[key].validation) {
                controls[key].validation = { ...form.controls[key].validation };
                const { errors, isValid } = controlValid(controls[key]);
                controls[key].errors = errors;
                controls[key].valid = isValid;
            }

            if (controls[key].elementType === 'select') {
                controls[key].config.options = (
                    form
                        .controls[key].config.options
                        .map(opt => ({ ...opt }))
                );
            }
        });

    const valid = Object
        .keys(controls)
        .every(key => controls[key].valid);
    
    return { ...form, controls, valid };
};

export default setInitialValue;