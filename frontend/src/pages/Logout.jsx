import React, { useEffect, useContext } from 'react';
import { Image, Result } from 'antd';
import logoutImage from '../assets/logout-image.svg';
import axios from 'axios';

import { UserContext } from '../App';

const Logout = ({removeUserUid}) => {

    const userContext = useContext(UserContext);

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_API_URL}Logout`, {uid: userContext.getUserUid()})
        removeUserUid();
    }, [])

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