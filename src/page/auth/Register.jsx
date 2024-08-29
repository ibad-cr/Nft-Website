import React, { useState, useRef } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import supabase from '../../tools/config/connect';

const Register = () => {
  const [valuePassword, setValuePassword] = useState('');
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (value) => {
    setValuePassword(value);

    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\\$%\\^&\\*\\_\\+])');
    const length = new RegExp('(?=.{8,})');

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const fullname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const imageLink = useRef(null);

  const submitFormInformation = async (e) => {
    e.preventDefault();

    if (
      !fullname.current.value ||
      !lastname.current.value ||
      !email.current.value ||
      !password.current.value ||
      !confirmPassword.current.value
    ) {
      toast.error("Please fill all inputs", {
        position: 'top-right',
        className: 'toastify-message',
      });
      return;
    }

    if (password.current.value !== confirmPassword.current.value) {
      toast.error("Passwords do not match", {
        position: 'top-right',
        className: 'toastify-message'
      });
      return;
    }

    const createUsers = async () => {
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!lowerValidated || !upperValidated || !numberValidated || !specialValidated || !lengthValidated) {
            reject("Validation failed");
          } else {
            resolve("Form submitted successfully");
          }
        }, 1000);
      });

      toast.promise(myPromise, {
        error: "Validation failed. Please check your input.",
        className: 'toastify-message',
      });

      try { 
        const { error } = await supabase.from('Users').insert({
          fullname: fullname.current.value,
          lastname: lastname.current.value,
          email: email.current.value,
          password: password.current.value,
          image: imageLink.current.value,
          user_token: crypto.randomUUID()
        });

        if (error) {
          toast.error("Error: " + error.message, {
            position: 'top-right',
            className: 'toastify-message',
          });
        } else {
          toast.success("Registration successful!", {
            position: 'top-right',
            className: 'toastify-message',
          });

          setTimeout(() => {
            window.location.assign('/auth/login');
          }, 2000);
        }
      } catch (err) {
        toast.error("An unexpected error occurred", {
          position: 'top-right',
          className: 'toastify-message',
        });
        console.error(err);
      }
    }

    const { data } = await supabase.from('Users').select();
    data.length === 0 ? createUsers() : data.find(item => item.email === email.current.value) ?
      toast.error("This email is already registered!", {
        position: 'top-right',
        className: 'toastify-message',
      }) : createUsers();

  };

  return (
    <div>
      <div className='register-window'>
        <div className='container'>
          <form onSubmit={submitFormInformation}>
            <ToastContainer />
            <div className='input-section mb-3'>
              <div className='all-input'>
                <input type="text" placeholder='' ref={imageLink} />
                <label htmlFor="" className='all-label'>Image Link</label>
              </div>
              <div className='all-input'>
                <input type="text" placeholder='' ref={fullname} />
                <label htmlFor="" className='all-label'>Full Name</label>
              </div>
              <div className='all-input'>
                <input type="text" placeholder='' ref={lastname} />
                <label htmlFor="" className='all-label'>Last Name</label>
              </div>
              <div className='all-input'>
                <input type="email" placeholder='' ref={email} />
                <label htmlFor="" className='all-label'>example@gmail.com</label>
              </div>
              <div className='all-input'>
                <input
                  ref={password}
                  type="password"
                  placeholder=''
                  onChange={(e) => handleChange(e.target.value)}
                />
                <label htmlFor="" className='all-label'>Password</label>
              </div>
              <div className={`password-validation-check ${valuePassword ? '' : 'close-list'}`}>
                <ul className='validated-list'>
                  <li className='list-group-item'>
                    {lowerValidated ? <IoCheckmarkCircleOutline className='me-2 correct-check' /> :
                      <MdOutlineRadioButtonUnchecked className='me-2 wrong-check' />}
                    At least one lowercase letter
                  </li>
                  <li className='list-group-item'>
                    {upperValidated ? <IoCheckmarkCircleOutline className='me-2 correct-check' /> :
                      <MdOutlineRadioButtonUnchecked className='me-2 wrong-check' />}
                    At least one uppercase letter
                  </li>
                  <li className='list-group-item'>
                    {numberValidated ? <IoCheckmarkCircleOutline className='me-2 correct-check' /> :
                      <MdOutlineRadioButtonUnchecked className='me-2 wrong-check' />}
                    At least one number
                  </li>
                  <li className='list-group-item'>
                    {specialValidated ? <IoCheckmarkCircleOutline className='me-2 correct-check' /> :
                      <MdOutlineRadioButtonUnchecked className='me-2 wrong-check' />}
                    At least one special character
                  </li>
                  <li className='list-group-item'>
                    {lengthValidated ? <IoCheckmarkCircleOutline className='me-2 correct-check' /> :
                      <MdOutlineRadioButtonUnchecked className='me-2 wrong-check' />}
                    At least 8 characters
                  </li>
                </ul>
              </div>
              <div className='all-input'>
                <input type="password" placeholder='' ref={confirmPassword} />
                <label htmlFor="" className='all-label'>Confirm Password</label>
              </div>
            </div>

            <div className='buttons'>
              <div className='submit-reset-buttons'>
                <Link to='/auth/login' className='back-sing-in-button'>Back</Link>
                <button className='submit-button'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
