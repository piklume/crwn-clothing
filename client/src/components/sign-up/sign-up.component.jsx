import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.action';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName,email,password,confirmPassword} = userCredentials;

    const handelSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        signUpStart({email,password,displayName});
    };

    const handelChange = event => {
        const {name, value} = event.target;

        setUserCredentials({...userCredentials,[name]: value});
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email</span>
            <form className='sign-up-form' onSubmit={handelSubmit}>
                <FormInput 
                    type = 'text'
                    name = 'displayName'
                    value = {displayName}
                    onChange = {handelChange}
                    label = 'Display Name'
                    required
                />
                <FormInput 
                    type = 'email'
                    name = 'email'
                    value = {email}
                    onChange = {handelChange}
                    label = 'Email'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'password'
                    value = {password}
                    onChange = {handelChange}
                    label = 'Password'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'confirmPassword'
                    value = {confirmPassword}
                    onChange = {handelChange}
                    label = 'Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);
