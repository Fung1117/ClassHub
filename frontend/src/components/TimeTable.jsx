import React, { useState, useEffect } from 'react';
import { Card, Table, Modal } from 'antd';
import axios from 'axios';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = [
    { start: '8:30', end: '9:20' },
    { start: '9:30', end: '10:20' },
    { start: '10:30', end: '11:20' },
    { start: '11:30', end: '12:20' },
    { start: '12:30', end: '13:20' },
    { start: '13:30', end: '16:20' },
    { start: '16:30', end: '17:20' },
    { start: '17:30', end: '18:20' }
];

const Timetable = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}course`);
                setCourses(response.data);
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
            const matchingCourses = courses.filter(course =>
                course.day === day &&
                parseTime(course.startTime) <= parseTime(slot.start) &&
                parseTime(course.endTime) >= parseTime(slot.end)
            );
    
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
            render: text => {
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
        <Card hoverable title="Weekly Time Table" style={{height: 650}}>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Modal
                title={selectedCourse ? selectedCourse.name : ''}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedCourse && (
                    <div>
                        <p>Start Time: {selectedCourse.startTime}</p>
                        <p>End Time: {selectedCourse.endTime}</p>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default Timetable;
