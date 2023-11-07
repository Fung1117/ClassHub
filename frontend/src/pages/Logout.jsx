import React from 'react';
import { Result } from 'antd';

const Logout = () => {
    return (
        <div style={{
            height: '500px', // Set a fixed height for the container
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Result
                status="success"
                title="Successfully logged out!"
            />
        </div>
    )
};

export default Logout;