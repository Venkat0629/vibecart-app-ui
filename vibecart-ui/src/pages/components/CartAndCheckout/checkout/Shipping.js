import React, { useEffect, useState } from 'react';
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './checkoutcomponents.css'
import '../cartandcheckout.css';
import { updateAddressData } from '../../../redux-toolkit/CartSlice';
import { useDispatch } from 'react-redux';

const Shipping = ({ address ,toggleAccordionOnContinue}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        building: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});
    useEffect(() => {
        setFormData(address);
    }, [address])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/;
        const zipRegex = /^\d{6}$/;

        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number.';
        }
        if (!zipRegex.test(formData.zip)) {
            newErrors.zip = 'Please enter a valid 6-digit zip code.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const existingData = JSON.parse(localStorage.getItem('shippingAddress')) || {};
            const updatedData = { ...existingData, ...formData };
            dispatch(updateAddressData(updatedData));
            localStorage.setItem('shippingAddress', JSON.stringify(updatedData));
            toggleAccordionOnContinue()
        }
    }

    return (
        <div className='shipping-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type="text"
                        id="building"
                        name="building"
                        placeholder="Apt, Suite, Building (Optional)"
                        value={formData.building}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-item'>
                    <div className='form-group'>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value=""> State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="ZIP"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                        <p>{errors.zip}</p>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <p>{errors.phone}</p>
                </div>
                <div className="button-container">
                    <ReusableButton buttonName="Continue" />
                </div>
            </form>
        </div>
    );
};

export default Shipping;
