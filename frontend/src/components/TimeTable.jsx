import React, { useState, useEffect, useContext } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { Card } from 'antd';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { FaPersonChalkboard } from "react-icons/fa6";

import { UserContext } from '../App';

const TimeTable = () => {
    const userContext = useContext(UserContext);
    const colors = ['#ffcccb', '#aaffcc', '#bbccff', '#ffeedd', '#ffe4e1', '#add8e6', '#ffb6c1', '#98fb98'];

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}course`, { params: { uid: userContext.getUserUid() } });
                const data = response.data.map((item, index) => {
                    return { ...item, color: colors[index] };
                });
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [userContext.getUserUid()]);

    const generateSemesterEvents = (scheduleData) => {
        const events = [];

        const startDate = new Date(`2023-09-01`);
        const endDate = new Date(`2023-11-30`);

        // Loop through each day of the week
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

            // Find the classes scheduled for the current day
            const dayClasses = scheduleData.filter((event) => event.day === currentDay);

            // Generate events for each class on the current day
            dayClasses.forEach((classEvent) => {
                const startDateTime = new Date(currentDate);
                startDateTime.setHours(Number(classEvent.startTime.split(':')[0]));
                startDateTime.setMinutes(Number(classEvent.startTime.split(':')[1]));

                const endDateTime = new Date(currentDate);
                endDateTime.setHours(Number(classEvent.endTime.split(':')[0]));
                endDateTime.setMinutes(Number(classEvent.endTime.split(':')[1]));

                events.push({
                    event_id: classEvent.ID,
                    title: classEvent.name,
                    start: startDateTime,
                    end: endDateTime,
                    teacher: classEvent.teacher,
                    zoomLink: classEvent.zoomLink,
                    classroom: classEvent.classroom,
                    disabled: false, // Set to true if needed
                    color: classEvent.color,
                    editable: false, // Adjust based on your requirements
                    deletable: false, // Adjust based on your requirements
                    draggable: false, // Adjust based on your requirements
                    allDay: false, // Adjust based on your requirements
                });
            });
        }

        return events;
    };

    const semesterEvents = generateSemesterEvents(courses);

    return (
        <Card hoverable style={{ width: '60%', height: 650 }}>
            <Scheduler
                height={525}
                viewerExtraComponent={(fields, event) => {
                    return (
                        <div style={{ marginLeft: 1 }}>
                            {event.teacher && (
                                <h3>
                                    {' '}
                                    <UserOutlined /> Teacher: {event.teacher}
                                </h3>
                            )}
                            {event.classroom && (
                                <h3>
                                    {' '}
                                    <FaPersonChalkboard /> Classroom: {event.classroom}
                                </h3>
                            )}
                        </div>
                    );
                }}
                events={semesterEvents}>
            </Scheduler>
        </Card>
    );
}

export default TimeTable;
