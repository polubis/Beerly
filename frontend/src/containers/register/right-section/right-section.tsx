import React, { useMemo } from 'react';

import AsideWrapper from 'components/shared/aside-wrapper/aside-wrapper';
import RegisterForm from './register-form/register-form';

const RightSection = () =>
  useMemo(() => {
    return (
      <AsideWrapper>
        <h3>Sign up</h3>
        <RegisterForm />
      </AsideWrapper>
    );
  }, []);

export default RightSection;
