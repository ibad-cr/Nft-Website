import React from 'react';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import supabase from '../../tools/config/connect';

const adminInformation = {
    email: 'admin@gmail.com',
    password: 'admin1234',
    admin_token: '00000000'
}

const Login = () => {
    const [cookies, setCookie] = useCookies(['cookie-user', 'admin-token']);

    // form data of validation start
    const email = useRef(null);
    const password = useRef(null);
    // form data of validation end 

    const loginForm = async (e) => {
        e.preventDefault();

        if (!email.current.value || !password.current.value) {
            toast.error("Please fill all inputs", {
                position: 'top-right',
                className: 'toastify-message'
            });
        } else {
            if (email.current.value === adminInformation.email || password.current.value === adminInformation.password) {
                setCookie('admin-token', adminInformation.admin_token)
            } else {
                const checkLogin = async () => {
                    const createCookie = (user_token) => {
                        setCookie('cookie-user', user_token);
                        toast.success("Login is successful!", {
                            position: 'top-right',
                            className: 'toastify-message'
                        });

                        setTimeout(() => {
                            window.location.assign('/');
                        }, 1500);
                    }

                    const { data } = await supabase.from('Users').select();
                    const userFilter = data.find(item => item.email === email.current.value);
                    if (!userFilter) {
                        toast.error("Email or password is wrong!", {
                            position: 'top-right',
                            className: 'toastify-message'
                        });
                    } else {
                        createCookie(userFilter.user_token);
                        localStorage.setItem('user-name', userFilter.fullname);
                    }
                }
                checkLogin();
            }
        }
    }

    return (
        <div>
            <div className='login-window'>
                <div className='container'>
                    <form onSubmit={loginForm}>
                        <ToastContainer />
                        <div className='input-section mb-3'>
                            <div className='email-input'>
                                <input type="email" placeholder='' ref={email} />
                                <label htmlFor="" className='email-label'>example@gmail.com</label>
                            </div>
                            <div className='email-input'>
                                <input type="password" placeholder='' ref={password} />
                                <label htmlFor="" className='email-label'>password</label>
                            </div>
                        </div>
                        <div className='buttons mt-4'>
                            <div className='login-reset-buttons'>
                                <button className='login'>Sing in</button>
                                <button className='reset'>Reset</button>
                            </div>
                            <div className='register-section mt-5'>
                                <span className='mb-2'>Don't have an account?</span>
                                <Link to='/auth/register' className='sing-up-button'>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
