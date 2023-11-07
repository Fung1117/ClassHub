import React, { useState } from 'react';
import { Table, Modal } from 'antd';
// import 'antd/dist/antd.css';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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

const courses = [
    { day: 'Mon', startTime: '8:30', endTime: '9:20', name: 'Math', color: '#ffcccb' },
    { day: 'Tue', startTime: '9:30', endTime: '10:20', name: 'English', color: '#aaffcc' },
    { day: 'Wed', startTime: '10:30', endTime: '11:20', name: 'Physics', color: '#bbccff' },
    { day: 'Thu', startTime: '11:30', endTime: '12:20', name: 'Chemistry', color: '#ffeedd' },
    // Add more courses as needed
];

const Timetable = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

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
        <>
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
                        {/* Add more course details here as needed */}
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Timetable;
