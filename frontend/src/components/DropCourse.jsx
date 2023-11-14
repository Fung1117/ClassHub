import React, { useState, useEffect, useContext} from 'react';
import { Card, Button, Modal } from 'antd';
import axios from 'axios';
import dropCourseImage from '../assets/dropCourse.svg';

import { UserContext } from '../App';

const DropCourse = () => {
    const [visible, setVisible] = useState(false);
    const [currentCourses, setCurrentCourses] = useState([]);

    const userContext = useContext(UserContext);
    const userUid = userContext.getUserUid();

    useEffect(() => {
        // Fetch current courses when the component mounts
        fetchCurrentCourses();
    }, []);

    const fetchCurrentCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}get-current-courses`, {params:{uid: userContext.getUserUid()}});
            const result = response.data;

            if (result.currentCourses) {
                setCurrentCourses(result.currentCourses);
            } else {
                console.error("Error fetching current courses:", result.message);
            }
        } catch (error) {
            console.error("Error fetching current courses:", error);
        }
    };

    const handleDropConfirm = async (courseId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}drop`, {
                courseId: courseId,
            });

            const result = response.data;

            if (result.success) {
                fetchCurrentCourses(); // Update current courses after dropping
                setVisible(false);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error dropping the course:', error);
        }
    };

    const showDropConfirm = (courseId) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to drop this course?',
            onOk: () => handleDropConfirm(courseId),
        });
    };

    const courseNames = currentCourses.map(course => (
        <div key={course.id} style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{course.title}</span>
            <Button type="primary" onClick={() => showDropConfirm(course.id)}>
                Drop
            </Button>
        </div>
    ));

    return (
        <Card
            cover={<img src={dropCourseImage} alt="Drop Course" />}
            title={`Drop Courses`}
            style={{ height: 650, width: 450 }}
        >
            {courseNames}
        </Card>
    );
};

export default DropCourse;