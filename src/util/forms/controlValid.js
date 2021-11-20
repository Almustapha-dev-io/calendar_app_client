import {
    maxLengthValidator,
    minLengthValidator,
    patternValidator
} from './validators';

const mapValidationToValidator = {
    maxLength: maxLengthValidator,
    minLength: minLengthValidator,
    pattern: patternValidator
};

const validate = (func, validation, value, errs) => {
    if (validation && validation.value) {
        const result = func(value, validation.value);
        if (!result) {
            errs.push(validation.message);
        }

        return result;
    }

    return true;
};

const controlValid = control => {
    const { validation, value } = control;
    const errors = [];

    let isValid = true;
    let results;

    const inputValue = value.trim();
    const { required } = validation;

    if (required && required.value) {
        results = inputValue ? true : false;
        isValid = isValid && results;

        if (!results) {
            errors.push(required.message);
            return { errors, isValid };
        }
    }

    const validationResults = Object
        .keys(validation)
        .filter(key => key !== 'required')
        .map(key => validate(
            mapValidationToValidator[key],
            validation[key],
            inputValue,
            errors
        ));

    isValid = validationResults.every(v => v);
    return { errors, isValid };
};

export default controlValid;