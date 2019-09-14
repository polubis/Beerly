import React, { useMemo } from 'react';

import UsernameIcon from '@material-ui/icons/AccountBox';
import PasswordIcon from '@material-ui/icons/Lock';

import Button from 'ui/button/button';
import FormField from 'components/shared/form/form-field/form-field';
import { Validator as V } from 'components/shared/form/validator';
import { FieldsConfig, useForm } from 'components/shared/form/useForm';

import classes from './login-form.scss';

type LoginFormFields = 'username' | 'password';

const LoginForm = () => {
    const config = useMemo(() => {
        return {
            username: {
                title: 'Username',
                icon: <UsernameIcon />,
                autofocus: true,
                validate: val => V.one(new V(val).username())
            },
            password: {
                title: 'Password',
                icon: <PasswordIcon />,
                validate: val => V.one(new V(val).password())
            }
        } as FieldsConfig<LoginFormFields>;
    }, []);

    const {
        state: { keys, fields, errorsOccured },
        handleTyping,
        handleSubmit
    } = useForm<LoginFormFields>(config);

    return (
        <form className={classes.container} onSubmit={handleSubmit}>
            {keys.map(key => (
                <FormField
                    key={key}
                    fieldkey={key}
                    onChange={handleTyping}
                    icon={config[key].icon}
                    title={config[key].title}
                    autoFocus={config[key].autoFocus}
                    {...fields[key]}
                />
            ))}
            <div className={classes["forgot-password"]}>
                <a href=''>Forgot password?</a>
            </div>
            <div className={classes["buttons-container"]}>
                <div>
                    <Button content="Sign in" disabled={errorsOccured} />
                </div>
                <div>
                    <span>Or use</span>
                </div>
                <div>
                    <a>Facebook</a>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
