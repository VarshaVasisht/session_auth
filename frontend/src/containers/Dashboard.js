import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { update_profile } from '../actions/profile';
import { delete_account } from '../actions/auth';

const Dashboard = ({
    delete_account,
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global
}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState(false); // Step 1: Define state for success message

    const { first_name, last_name, phone, city } = formData;

    useEffect(() => {
        setFormData({
            first_name: first_name_global,
            last_name: last_name_global,
            phone: phone_global,
            city: city_global
        });
    }, [first_name_global]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        try {
            await update_profile(first_name, last_name, phone, city);
            setUpdateSuccess(true); // Step 2: Update state on successful submission
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='container'>
            <h1 className='mt-3'>Welcome to your User Dashboard</h1>
            <p className='mt-3 mb-3'>Update your user profile below:</p>
            <form onSubmit={onSubmit}>
                {/* Form fields */}
                <button className='btn btn-primary mt-3' type='submit'>Update Profile</button>
            </form>

            {/* Step 3: Render success message conditionally */}
            {updateSuccess && <div className="alert alert-success mt-3" role="alert">Update Successful!</div>}

            {/* Delete account button */}
            <p className='mt-5'>Click the button below to delete your user account:</p>
            <a className='btn btn-danger' href='#!' onClick={delete_account}>
                Delete Account
            </a>
        </div>
    );
};

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
});

export default connect(mapStateToProps, {
    delete_account,
    update_profile
})(Dashboard);
