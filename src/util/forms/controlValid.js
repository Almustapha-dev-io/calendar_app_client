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
        if (result) { 
            errs.push(validation.message);
        }

        return result;
    }

    return true;
};

/* 
    id
    elementType
    config
        type
        id
        options
    validation

    touched
    valid
    value
    label
*/
const controlValid = control => {
    const { }
};