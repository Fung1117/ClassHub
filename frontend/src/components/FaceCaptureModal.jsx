import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const FaceCaptureModal = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Basic Modal"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Content of the modal</p>
            <p>More content...</p>
        </Modal>
    );
};

export default FaceCaptureModal;
