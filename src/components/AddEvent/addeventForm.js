
const loginForm = {
    controls: {
        title: {
            id: 'title',
            elementType: 'input',
            config: {
                type: 'text'
            },
            label: 'Title',
            value: '',
            validation: {
                required: {
                    value: true,
                    message: 'Event title is required!'
                },
                minLength: {
                    value: 3,
                    message: 'Event title must be atleast 3 characters long.'
                },
                maxLength: {
                    value: 16,
                    message: 'Event title cannot be more than 16 characters long.'
                }
            },
            touched: false,
            valid: false,
            errors: []
        },
        details: {
            id: 'details',
            elementType: 'textarea',
            config: {
                rows: 4
            },
            label: 'Description',
            value: '',
            validation: {
                maxLength: {
                    value: 64,
                    message: 'Event description cannot be more than 64 characters long.'
                }
            },
            touched: false,
            valid: true,
            errors: []
        },
    },
    valid: false
}

export default loginForm;