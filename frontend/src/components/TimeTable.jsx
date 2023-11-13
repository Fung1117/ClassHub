import React, { useState, useEffect, useContext } from 'react';
import { Card, Table, Modal } from 'antd';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { FaPersonChalkboard } from "react-icons/fa6";
import axios from 'axios';

import { UserContext } from '../App';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = [
    { start: '8:30', end: '9:20' },
    { start: '9:30', end: '10:20' },
    { start: '10:30', end: '11:20' },
    { start: '11:30', end: '12:20' },
    { start: '12:30', end: '13:20' },
    { start: '13:30', end: '14:20' },
    { start: '14:30', end: '15:20' },
    { start: '15:30', end: '16:20' },
    { start: '16:30', end: '17:20' },
    { start: '17:30', end: '18:20' }
];

/*
GET, /course:

    [
        {
            "uid": "COMP2396" , // no use yet
            "name": "Advanced JavaScript",
            "teacher": "Jane Smith",
            "startTime": "09:30",
            "endTime": "10:20",
            "day": "Tue",
            "classroom": "Room 202",
        },
        ...
    ]
*/

const Timetable = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    const colors = ['#ffcccb', '#aaffcc', '#bbccff', '#ffeedd', '#ffe4e1', '#add8e6', '#ffb6c1', '#98fb98'];

    // get current user uid like this:
    const userContext = useContext(UserContext);
    const userUid = userContext.getUserUid();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}course`);
                const data = response.data.map((item, index) => {
                    return { ...item, color: colors[index] };
                });
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses(); 
    }, []);

    const parseTime = timeString => {
        const [hours, minutes] = timeString.split(':');
        return new Date(0, 0, 0, hours, minutes);
    };
    
    const data = timeSlots.map(slot => {
        const rowData = {
            key: slot.start,
            time: `${slot.start} - ${slot.end}`,
        };

        daysOfWeek.forEach(day => {
            const matchingCourses = courses.filter(course =>{
                return course.day === day &&
                    parseTime(course.startTime) <= parseTime(slot.start) &&
                    parseTime(course.endTime) >= parseTime(slot.end)
            });
    
            const cellContent = matchingCourses.map(course => course.name).join(', ');
            rowData[day] = cellContent;
        });
        
        return rowData;
    });

    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 150,
        },
        ...daysOfWeek.map(day => ({
            title: day,
            dataIndex: day,
            key: day,
            width: 150,
            onCell: text => {
                const course = text && courses.find(c => c.name === text);
                return {
                    children: (
                        <div
                            style={{ textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => {
                                if (course) {
                                    setSelectedCourse(course);
                                    setModalVisible(true);
                                }
                            }}
                        >
                            {text}
                        </div>
                    ),
                    props: {
                        style: {
                            backgroundColor: course ? course.color : 'transparent',
                        },
                    },
                };
            },
        })),
    ];

    return (
        <Card hoverable title="Weekly Time Table" style={{ height: 650, width: 1000 }}>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Modal
                title={selectedCourse ? selectedCourse.name : ''}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedCourse && (
                    <div>
                        <h4> <FieldTimeOutlined /> Time: {selectedCourse.startTime} - {selectedCourse.endTime}</h4>
                        <h4> <UserOutlined /> Teacher: {selectedCourse.teacher}</h4>
                        <h4> <FaPersonChalkboard /> Classroom: {selectedCourse.classroom}</h4>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default Timetable;
