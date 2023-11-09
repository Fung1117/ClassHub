import React from 'react';
import { Image, Result } from 'antd';
import logoutImage from '../assets/logout-image.svg';

const Logout = () => {
    return (
        <div>
            <Image src={logoutImage} preview={false}/>
            <Result
                status="success"
                title="Successfully logged out!"
            />
        </div>
    )
};

export default Logout;