import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
//import Subito from './../../Assets/images/subito.png';
import LeftBack from './../../Assets/images/left.png';
import RightBack from './../../Assets/images/right.png';
import { GooglePlusOutlined } from '@ant-design/icons';
import './style.scss';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../Contains/Config';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../Services';
import Loading from '../Loading';


export default function LoginPage(props) {
    let [validate, setValidate] = useState('');
    let [loading, setLoading] = useState(false);
    const token = localStorage.getItem(ACCESS_TOKEN);
    let navigate = useNavigate();
    const handleSubmit = (values) => {
        setLoading(true);
        let data = {
            "email": values.email,
            "password": values.password
        }

        apiClient.fetchApiLogin(data).then(res => {
            if (res.data.success === true) {
                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.data.token))
                window.location.reload('/home');
                return
            } else {
                setValidate('Tài khoản & Mật khẩu không đúng.');
                navigate('/login');
                setLoading(false);
            }

        }).catch(e => {
            setValidate('Tài khoản & Mật khẩu không đúng.');
            navigate('/login');
            setLoading(false);
        });
    }

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token]);



    return (
        <>
            {loading && <div className='loading-style'> <Loading type="bars" color="white" /> </div>}
            <div className="main-LOGI">
                <h3 className='login-title'><img src="" /></h3>
                <div className="main-content">
                    <div className="card-box">
                        <h5 className="card-header">Login to BIT</h5>
                        <p style={{ textAlign: 'center', color: "red", paddingTop: '10px' }}>{validate ? validate : ''}</p>
                        <div className="card-body">
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleSubmit}
                            >
                                <Form.Item
                                    // label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            // pattern: /^\S+@\S+\.\S+$/,
                                            message: 'Email wrong format!',
                                        },
                                    ]}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Input placeholder="Enter address email" />
                                </Form.Item>

                                <Form.Item
                                    // label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 6,
                                            message: 'Password less than 6 characters '
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder="Enter password" />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" style={{ width: "100%", padding: "5px 0" }} loading={loading}>
                                        Log In
                                    </Button>

                                </Form.Item>
                            </Form>
                        </div>
                        <p className='text-align-center'>OR</p>
                        <Button icon={<GooglePlusOutlined style={{ fontSize: '26px', color: '#08c' }} />} style={{ width: "100%", height: "auto", padding: '10px 0 5px 0', boxShadow: "1px 1px 2px rgb(141, 139, 139)", display: 'flex', justifyContent: 'center', alignContent: 'center' }} loading={loading}>
                            Continue with Google
                        </Button>
                        <div className='sign-up text-align-center'>
                            <Link to={"/sign-up"} className='sign-up text-align-center'>
                                Sign up for an Account.
                            </Link>
                        </div>
                        <div className='sign-up text-align-center'>
                            <Link
                                to="/forgot-password"
                                className='sign-up text-align-center'
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <br />
                </div>
                <div className='background'>
                    <div className='background-left'>
                        <img src={LeftBack} />
                    </div>
                    <div className='background-right'>
                        <img src={RightBack} />
                    </div>
                </div>
            </div>

        </>

    )
}