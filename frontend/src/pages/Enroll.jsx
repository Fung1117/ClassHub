import { useState, useContext } from 'react';
import { Flex } from 'antd';
import axios from 'axios';


import AddCourse from '../components/AddCourse';
import DropCourse from '../components/DropCourse';
import { UserContext } from '../App';

const Enroll = () => {

    const [currentCourses, setCurrentCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);

    const userContext = useContext(UserContext);

    const fetchAvailableCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}get-available-courses`, {params:{uid: userContext.getUserUid()}});
            const result = response.data;

            if (result.availableCourses) {
                setAvailableCourses(result.availableCourses);
                // setSelectedCourse(result.availableCourses[0]); // Set default selected course
            } else {
                console.error("Error fetching available courses:", result.message);
            }
        } catch (error) {
            console.error("Error fetching available courses:", error);
        }
    };

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

    const courseFetchUpdate = () => {
        fetchAvailableCourses();
        fetchCurrentCourses();
    }

    return (
        <Flex gap="middle" align="center" justify="center" style={{ width: '100%' }} >
            <AddCourse
                availableCourses={availableCourses}
                fetchAvailableCourses={courseFetchUpdate}
            />
            <DropCourse
                currentCourses={currentCourses}
                fetchCurrentCourses={courseFetchUpdate}
            />
        </Flex>
    );
};

export default Enroll;
