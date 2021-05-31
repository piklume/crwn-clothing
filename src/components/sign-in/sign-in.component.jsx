import React from 'react';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButtom from '../custom-button/custom-button.component.jsx';

import { auth,signInWithGoogle } from '../../firebase/firebase.utils.js';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({ email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    };

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>


                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email"
                    handleChange={this.handleChange} 
                    value={this.state.email}
                    label='Email'
                    required />
                   
                    <FormInput name="password" 
                    type="password"
                     handleChange={this.handleChange} 
                     value={this.state.password}
                     label='Password'
                     required />
                   <div className='buttons'>
                        <CustomButtom type="submit">SIGN IN</CustomButtom>
                        <CustomButtom onClick={signInWithGoogle} isGoogleSignIn>{' '}SIGN IN WITH GOOGLE{' '}</CustomButtom>
                    </div>
                </form>

            </div>
        )
    }

}

export default SignIn;