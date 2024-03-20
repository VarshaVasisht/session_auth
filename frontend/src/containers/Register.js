import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA component

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });
    const [accountCreated, setAccountCreated] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false); // State to track reCAPTCHA verification

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (!captchaVerified) {
            alert('Please verify reCAPTCHA.');
            return; // Prevent form submission if reCAPTCHA is not verified
        }

        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        }
    };

    const handleCaptchaChange = value => {
        // Called when reCAPTCHA is verified
        console.log("Captcha value:", value);
        setCaptchaVerified(true);
    };

    if (accountCreated)
        return <Redirect to='/' />;

    if (isAuthenticated)
        return <Redirect to='/dashboard' />;
    else if (accountCreated)
        return <Redirect to='/login' />;

    return (
        <div className='container mt-5'>
            <h1>Register for an Account</h1>
            <p>Create an account with our Session Auth application</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                {/* Add reCAPTCHA component */}
                <ReCAPTCHA
                    sitekey="6LftloEpAAAAADuPImlPyt1KpCFBOc89kuaq1AKj"
                    onChange={handleCaptchaChange}
                />
                <button className='btn btn-primary mt-3' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
