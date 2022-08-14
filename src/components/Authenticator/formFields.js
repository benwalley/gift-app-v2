const formFields = {
    signIn: {
        username: {
            labelHidden: true,
            placeholder: 'Enter your email',
            order: 1
        }
    },
    signUp: {
        name: {
            labelHidden: true,
            label: 'Name:',
            placeholder: 'Username',
            isRequired: true,
            order: 1,
        },
        email: {
            labelHidden: true,
            label: 'Email:',
            placeholder: 'Email',
            isRequired: true,
            order: 2,
        },
        password: {
            labelHidden: true,
            label: 'Password:',
            placeholder: 'Enter your Password:',
            isRequired: false,
            order: 3,
        },
        confirm_password: {
            labelHidden: true,
            label: 'Confirm Password:',
            order: 4,
        },
    },
    forceNewPassword: {
        password: {
            labelHidden: true,
            placeholder: 'Enter your Password:',
        },
    },
    resetPassword: {
        username: {
            labelHidden: true,
            placeholder: 'Enter your email:',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            labelHidden: true,
            placeholder: 'Enter your Confirmation Code:',
            label: 'New Label',
            isRequired: false,
        },
        confirm_password: {
            labelHidden: true,
            placeholder: 'Enter your Password Please:',
        },
    },
    setupTOTP: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            labelHidden: false,
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            labelHidden: false,
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};

export default formFields;
