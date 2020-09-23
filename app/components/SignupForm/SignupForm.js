import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const month = [
  {
    "value": "january",
    "label": "January"
  },
  {
    "value": "february",
    "label": "February"
  },
  {
    "value": "march",
    "label": "March"
  },
  {
    "value": "april",
    "label": "April"
  },
  {
    "value": "may",
    "label": "May"
  },
  {
    "value": "june",
    "label": "June"
  },
  {
    "value": "july",
    "label": "July"
  },
  {
    "value": "august",
    "label": "August"
  },
  {
    "value": "september",
    "label": "September"
  },
  {
    "value": "october",
    "label": "October"
  },
  {
    "value": "november",
    "label": "November"
  },
  {
    "value": "december",
    "label": "December"
  }
];

export default function App() {
  const [border, removeBorder] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    surName: yup.string().required(),
    email: yup.string().email('Invalid email').required(),
    password: yup.string().required().min(8, 'Your password isn’t strong enough. Please try making it longer.'),
    phoneNumber: !currentEmail && yup.string().required().matches(/^[6-9]\d{9}$/, 'Phone number is not valid'),
    birthMonth: yup.string().required(),
    day: yup.string().required(),
    year: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur"
  });

  function apiCall(data) {
    fetch('some api', {
      method: 'post',
      body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
      console.log(data)
      });
  }

  function onSubmit(data) {
    console.log(data)  // form data
    apiCall(data)  // example api call 
  }

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
type="text" name="firstName" placeholder="First name" maxLength="32"
            ref={register} className={(errors.firstName && 'errorBorder')} />
          {errors.firstName && <p>This is required</p>}
        </dt>
        <dt>
          <input
type="text" name="surName" placeholder="Surname" maxLength="32"
            ref={register} className={(errors.surName && 'errorBorder')} />
          {errors.surName && <p>This is required</p>}
        </dt>
      </div>
      <br />
      <dt>
        <input
type="email" name="email" placeholder={!currentEmail ? 'Email address             @yahoo.com' : 'Your current email address'} maxLength="32"
          ref={register} className={(errors.email && 'errorBorder')} />
        {
          errors.email && errors.email.type === 'required' ? <p>This is required</p>
            : errors.email && errors.email.type === 'email' ? <p>{errors.email.message}</p> : null
        ) : null}
        {
          !currentEmail ?
            <small
onClick={() => {
              setCurrentEmail(true);
              document.myForm.reset();
            }}>
              <a>I want to use my current email address</a>
            </small>
            : <small
onClick={() => {
              setCurrentEmail(false);
              document.myForm.reset();
            }}>
          >
            <a>I want to create a new Yahoo email address</a>
            </small>
        )}
      </dt>
      <br />
      <dt>
        <input
type="password" name="password" placeholder="Password" maxLength="128"
          ref={register} className={(errors.password && 'errorBorder')} />
        {
          errors.password && errors.password.type === 'required' ? <p>This is required</p>
            : errors.password && errors.password.type === 'min' ? <p>{errors.password.message}</p> : null
        }
      </dt>
      <br />
      {
        !currentEmail &&
                <>
          <div className="flex row2">
                      <dt className="countryCode">
                        <input type="text" name="countryCode" placeholder="Code" ref={register} />
                      </dt>
            <dt className="phoneNumber">
                        <input
type="tel" name="phoneNumber" placeholder="Mobile phone number"
                          ref={register} className={(errors.phoneNumber && 'errorBorder')} />
                        {
                          errors.phoneNumber && errors.phoneNumber.type === 'required' ? <p>This is required</p>
                            : errors.phoneNumber && errors.phoneNumber.type === 'matches' ? <p>{errors.phoneNumber.message}</p> : null
                        }
            </dt>
          </div>
          <br />
        </>
      }
      <div className="flex row3">
        <dt className="birthMonth">
          <select
name="birthMonth" id="birthMonth" onChange={() => removeBorder(false)}
            ref={register} className={((errors.birthMonth && border) && 'errorBorder')}>
            <option selected disabled value="">Birth month</option>
            {month.map((i, j) =>
              <option key={j} value={i.value}>{i.label}</option>
            )}
          </select>
          {(errors.birthMonth && border) && <p>This is required</p>}
        </dt>
        <dt className="day">
          <input
type="text" name="day" placeholder="Day"
            ref={register} className={(errors.day && 'errorBorder')} />
        </dt>
        <dt className="year">
          <input
type="text" name="year" placeholder="Year"
            ref={register} className={(errors.year && 'errorBorder')} />
        </dt>
      </div>
      <br />

      <dt>
        <input
type="text" name="gender" placeholder="Gender (optional)" maxLength="16"
          ref={register} className={(errors.gender && 'errorBorder')} />
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
      </dt>
      <br />
      <button type="submit">Continue</button>
      <br />
      <dt className="alignCenter terms">
        Already have an account?{' '}
        <a
          target="_blank"
          href="https://login.yahoo.com/?.intl=in&.lang=en-IN&src=ym&specId=yidReg&.done=https%3A%2F%2Fmail.yahoo.com%2Fd%3F.intl%3Din%26.lang%3Den-IN%26.partner%3Dnone%26.src%3Dfp&intl=in&done=https%3A%2F%2Fmail.yahoo.com%2Fd%3F.intl%3Din%26.lang%3Den-IN%26.partner%3Dnone%26.src%3Dfp&prompt=login"
        >
          Sign in
      </dt>
    </form>
  );
}
