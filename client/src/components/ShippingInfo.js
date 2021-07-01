import React, {useState} from 'react'
import MetaData from '../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import {  saveShippingInfo } from './../actions/CartActions';
import { countries } from 'countries-list';
import  CheckoutSteps  from './CheckoutSteps';

const ShippingInfo = ({ history }) => {
    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector(state => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [ postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
    const [country, setCountry] = useState(shippingInfo.country);
    const dispatch = useDispatch();
    

    const submitHandler=(e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, city, postalCode, phoneNumber, country}))
        history.push('/order/confirm')
    }


  return (
    <div>
      <MetaData title={"Shipping-Info"}/>
      <CheckoutSteps shippingInfo />
      <div className="row wrapper">
                <div className="col-10 col-lg-5" onSubmit={submitHandler}>
                    <form className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phoneNumber"
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=> setCountry(e.target.value)}
                                required
                                >
                                    {countriesList.map(country =>(
                                        <option key={country.name} value={country.name}>
                                         {country.name}
                                        </option>

                                    ))}
                                 

                            </select>

                                
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

    </div>
  )
}

export default ShippingInfo
