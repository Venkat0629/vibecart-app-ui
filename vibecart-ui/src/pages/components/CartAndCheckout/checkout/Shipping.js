import React, { useEffect, useState } from 'react';
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './checkoutcomponents.css'
import '../cartandcheckout.css';
import { updateAddressData } from '../../../redux-toolkit/CartSlice';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const Shipping = ({ address, toggleAccordionOnContinue }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        address: '',
        building: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    const [isChecked, setIsChecked] = useState(true);

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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number.';
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!zipRegex.test(formData.zip)) {
            newErrors.zip = 'Please enter a valid 6-digit zip code.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            const existingData = JSON.parse(localStorage.getItem('shippingAddress')) || {};
            const updatedData = { ...existingData, ...formData };
            dispatch(updateAddressData(updatedData));
            localStorage.setItem('shippingAddress', JSON.stringify(updatedData));
            toggleAccordionOnContinue();
        }
    }

    return (
        <div className='shipping-container'>
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-danger">{errors.email}</p>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="building"
                        name="building"
                        placeholder="Apt, Suite, Building (Optional)"
                        value={formData.building}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <select
                            className="form-select"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="">State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            {/* Add more options here */}
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                            placeholder="ZIP"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-danger">{errors.zip}</p>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-danger">{errors.phone}</p>
                </div>
                <div className="form-check mb-1">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isChecked}
                        onChange={() => setIsChecked(true)}
                        id="billingAddressCheck"
                    />
                    <label className="form-check-label" htmlFor="billingAddressCheck">
                        Billing address is same as shipping address
                    </label>
                </div>
                <div className="button-container" style={{ marginTop: "10px" }}>
                    <ReusableButton buttonName="Continue" />
                </div>
            </form>
        </div>
    );
};

export default Shipping;
