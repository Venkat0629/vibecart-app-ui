import React, { useState } from 'react';
import './shipping.css';

const Shipping = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        building: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form Submitted", formData);
    };

    return (
        <div className='shipping-container'>
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="fullname"></label>
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
                    <label htmlFor="address"></label>
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
                    <label htmlFor="building"></label>
                    <input
                        type="text"
                        id="building"
                        name="building"
                        placeholder="Apt, Suite, Building (Optional)"
                        value={formData.building}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="city"></label>
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
                    <label name="state"></label>
                    <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select State</option>
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
                    <label htmlFor="zip"></label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="Zipcode"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone"></label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Continue</button>
            </form>
        </div>
    );
};

export default Shipping;
