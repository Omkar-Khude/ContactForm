import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    country: '',
    state: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries')
      .then(response => {
        setCountries(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      axios.get(`https://countriesnow.space/api/v0.1/countries/states/q?country=${value}`)
        .then(response => {
          setStates(response.data.data.states);
        })
        .catch(error => {
          console.error('Error fetching states:', error);
        });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setSubmittedData({
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        state: formData.state,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      valid = false;
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
      valid = false;
    }
    if (!formData.country) {
      errors.country = 'Country is required';
      valid = false;
    }
    if (!formData.state) {
      errors.state = 'State is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <div className="background">
      <div className="container">
        <div className="screen">
          <div className="screen-header">
            <div className="screen-header-left">
              <div className="screen-header-button close"></div>
              <div className="screen-header-button maximize"></div>
              <div className="screen-header-button minimize"></div>
            </div>
            <div className="screen-header-right">
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
            </div>
          </div>
          <div className="screen-body">
            <div className="screen-body-item left">
              <div className="app-title">
                <span>CONTACT</span>
                <span>US</span>
              </div>
            </div>
            <div className="screen-body-item">
              <div className="app-form">
                <form onSubmit={handleSubmit}>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="NAME"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="app-form-group">
                    <textarea
                      className="app-form-control"
                      placeholder="ADDRESS"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="PHONE NUMBER"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                  </div>
                  <div className="app-form-group">
                    <select
                      className="app-form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.country} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                    {errors.country && <span className="error">{errors.country}</span>}
                  </div>
                  <div className="app-form-group">
                    <select
                      className="app-form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.state_code} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && <span className="error">{errors.state}</span>}
                  </div>
                  <div className="app-form-group buttons">
                    <button type="submit" className="app-form-button">SUBMIT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {submitted && (
          <div className="SubmittedData">
            <div className="SubmittedData-one">
              <span>SUBMITTED</span>
              <span>DATA</span>
            </div>
            <div>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Address:</strong> {submittedData.address}</p>
              <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
              <p><strong>Country:</strong> {submittedData.country}</p>
              <p><strong>State:</strong> {submittedData.state}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
