import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButtom from '../custom-button/custom-button.component.jsx';

import { googleSignInStart,emailSignInStart } from '../../redux/user/user.action';
import './sign-in.styles.scss';

const SignIn = ({ googleSignInStart,emailSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '',password: ''})

    const { email, password } = userCredentials;
    
    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email,password);     
    };

    const handleChange = (event) => {
        const {value, name} = event.target;

        setCredentials({...userCredentials,[name]: value});
    };

    
    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>


            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email"
                handleChange={handleChange} 
                value={email}
                label='Email'
                required />
                
                <FormInput name="password" 
                type="password"
                    handleChange={handleChange} 
                    value={password}
                    label='Password'
                    required />
                <div className='buttons'>
                    <CustomButtom type="submit">SIGN IN</CustomButtom>
                    <CustomButtom type="button" onClick={googleSignInStart} isGoogleSignIn>{' '}SIGN IN WITH GOOGLE{' '}</CustomButtom>
                </div>
            </form>

        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,mapDispatchToProps)(SignIn);