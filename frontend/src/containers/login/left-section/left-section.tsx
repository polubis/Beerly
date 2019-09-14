import React from 'react';

import LoginForm from './login-form/login-form';
import AsideWrapper from 'components/shared/aside-wrapper/aside-wrapper';

const LeftSection = () => {
    return (
        <AsideWrapper localization='loginPage'>
            <h3>Sign in</h3>
            <LoginForm />
        </AsideWrapper>
    );
}

export default LeftSection;

