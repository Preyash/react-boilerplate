import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import months from 'utils/months';
import countryCodes from 'utils/countryCode';

export default function App() {
  const [border, removeBorder] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(false);
  const [currentCountryCode, setCountryCode] = useState('');

  useEffect(() => {
    fetch('http://www.geoplugin.net/json.gp')
      .then(res => res.json())
      .then(data => {
        setCountryCode(data.geoplugin_countryCode);
      });
  });

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    surName: yup.string().required(),
    email: yup
      .string()
      .email('Invalid email')
      .required(),
    password: yup
      .string()
      .required()
      .min(
        8,
        'Your password isn’t strong enough. Please try making it longer.',
      ),
    phoneNumber:
      !currentEmail &&
      yup
        .string()
        .required()
        .matches(/^[6-9]\d{9}$/, 'Phone number is not valid'),
    birthMonth: yup.string().required(),
    day: yup.string().required(),
    year: yup.string().required(),
  });

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  function apiCall(data) {
    fetch('some api', {
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }

  function onSubmit(data) {
    console.log(data); // form data
    apiCall(data); // example api call
  }

  const togglePassword = e => {
    const input = e.target.parentElement.previousSibling;
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="myForm" noValidate>
      <div className="alignCenter">
        <h1>Sign up for Yahoo Mail</h1>
        <dt>Create a Yahoo email address</dt>
      </div>
      <br />
      <div className="flex row1">
        <dt>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            maxLength="32"
            ref={register}
            className={errors.firstName && 'errorBorder'}
          />
          {errors.firstName && <p>This is required</p>}
        </dt>
        <dt>
          <input
            type="text"
            name="surName"
            placeholder="Surname"
            maxLength="32"
            ref={register}
            className={errors.surName && 'errorBorder'}
          />
          {errors.surName && <p>This is required</p>}
        </dt>
      </div>
      <br />
      <dt>
        <input
          type="email"
          name="email"
          placeholder={
            !currentEmail
              ? 'Email address             @yahoo.com'
              : 'Your current email address'
          }
          maxLength="32"
          ref={register}
          className={errors.email && 'errorBorder'}
        />
        {errors.email && errors.email.type === 'required' ? (
          <p>This is required</p>
        ) : errors.email && errors.email.type === 'email' ? (
          <p>{errors.email.message}</p>
        ) : null}
        {!currentEmail ? (
          <small
            onClick={() => {
              setCurrentEmail(true);
              reset({}, { errors: false });
            }}
          >
            <a>I want to use my current email address</a>
          </small>
        ) : (
          <small
            onClick={() => {
              setCurrentEmail(false);
              reset({}, { errors: false });
            }}
          >
            <a>I want to create a new Yahoo email address</a>
          </small>
        )}
      </dt>
      <br />
      <dt>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          maxLength="128"
          ref={register}
          className={errors.password && 'errorBorder'}
        />
        <small id="showHide" onClick={togglePassword}>
          <a>show</a>
        </small>
        {errors.password && errors.password.type === 'required' ? (
          <p>This is required</p>
        ) : errors.password && errors.password.type === 'min' ? (
          <p>{errors.password.message}</p>
        ) : null}
      </dt>
      <br />
      {!currentEmail && (
        <>
          <div className="flex row2">
            <dt className="countryCode">
              <select
                name="countryCode"
                ref={register}
                defaultValue={currentCountryCode}
              >
                {countryCodes.map((i, j) => (
                  <option key={j} value={i.code}>
                    {`${i.name}  ` + `(${i.dial_code})`}
                  </option>
                ))}
              </select>
            </dt>
            <dt className="phoneNumber">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Mobile phone number"
                ref={register}
                className={errors.phoneNumber && 'errorBorder'}
              />
              {errors.phoneNumber && errors.phoneNumber.type === 'required' ? (
                <p>This is required</p>
              ) : errors.phoneNumber &&
                errors.phoneNumber.type === 'matches' ? (
                <p>{errors.phoneNumber.message}</p>
                ) : null}
            </dt>
          </div>
          <br />
        </>
      )}
      <div className="flex row3">
        <dt className="birthMonth">
          <select
            name="birthMonth"
            id="birthMonth"
            onChange={() => removeBorder(false)}
            ref={register}
            className={errors.birthMonth && border && 'errorBorder'}
          >
            <option selected disabled value="">
              Birth month
            </option>
            {months.map((i, j) => (
              <option key={j} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          {errors.birthMonth && border && <p>This is required</p>}
        </dt>
        <dt className="day">
          <input
            type="text"
            name="day"
            placeholder="Day"
            ref={register}
            className={errors.day && 'errorBorder'}
          />
        </dt>
        <dt className="year">
          <input
            type="text"
            name="year"
            placeholder="Year"
            ref={register}
            className={errors.year && 'errorBorder'}
          />
        </dt>
      </div>
      <br />

      <dt>
        <input
          type="text"
          name="gender"
          placeholder="Gender (optional)"
          maxLength="16"
          ref={register}
          className={errors.gender && 'errorBorder'}
        />
      </dt>
      <br />

      <dt className="alignCenter terms">
        By clicking "Continue", you agree to the{' '}
        <a
          target="_blank"
          href="https://www.verizonmedia.com/policies/in/en/verizonmedia/terms/otos/index.html"
        >
          Terms
        </a>{' '}
        and{' '}
        <a
          href="https://www.verizonmedia.com/policies/in/en/verizonmedia/privacy/index.html"
          target="_blank"
        >
          Privacy Policy
        </a>
      </dt>
      <br />
      <button type="submit">Continue</button>
      <br />
      <dt className="alignCenter terms">
        Already have an account? <Link to="/signin">Sign in</Link>
      </dt>
    </form>
  );
}
