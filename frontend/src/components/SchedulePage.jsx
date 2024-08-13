import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to format time
const formatTime = (time) => {
  if (!time) return '';
  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

// Helper function to map day names to index
const dayToIndex = (day) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.indexOf(day);
};

// Define some colors for subjects
const subjectColors = {
  '1': '#FFDDC1', // Subject 1: Light Peach
  '2': '#FFABAB', // Subject 2: Light Red
  '3': '#FFC3A0', // Subject 3: Light Coral
  '4': '#B9FBC0', // Subject 4: Light Green
  '5': '#A2D2FF', // Subject 5: Light Blue
  '6': '#C9ADA7', // Subject 6: Light Brown
  '7': '#FDCB82', // Subject 7: Light Orange
  '8': '#EAB543', // Subject 8: Light Yellow
  '9': '#D5AAFF', // Subject 9: Light Purple
  '10': '#B9FBC0', // Subject 10: Light Mint
};

// Function to make color darker
const darkenColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const r = (num >> 16) + percent;
  const g = ((num >> 8) & 0x00FF) + percent;
  const b = (num & 0x0000FF) + percent;
  return `#${(0x1000000 + (r < 255 ? r : 255) * 0x10000 + (g < 255 ? g : 255) * 0x100 + (b < 255 ? b : 255)).toString(16).slice(1)}`;
};

const SchedulePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        if (selectedClass) {
          const response = await axios.get(`http://localhost:8080/timetable/${selectedClass}`);
          console.log('Fetched timetable:', response.data); // Logowanie danych
          // Ensure the response data is an array
          if (Array.isArray(response.data)) {
            setTimetable(response.data);
          } else {
            console.error('Unexpected timetable format:', response.data);
            setTimetable([]);
          }
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, [selectedClass]);

  // Fetch subjects and classes data
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subject');
        console.log('Fetched subjects:', response.data); // Logowanie danych
        setSubjects(response.data.reduce((acc, subject) => {
          acc[subject.subject_id] = subject.name;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/class');
        console.log('Fetched classes:', response.data); // Logowanie danych
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchSubjects();
    fetchClasses();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const isArray = Array.isArray(timetable);

  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="max-w-6xl mx-auto mt-8">
        {/* Class Selector */}
        <div className="mb-8 flex justify-start">
          <div className="relative w-48">
            <select
              onChange={handleClassChange}
              value={selectedClass}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-sm"
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg shadow-lg">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b border-gray-300 bg-gray-100 text-center font-semibold h-20">
            <div className="py-4">Time</div>
            <div className="py-4">MON</div>
            <div className="py-4">TUE</div>
            <div className="py-4">WED</div>
            <div className="py-4">THU</div>
            <div className="py-4">FRI</div>
            <div className="py-4">SAT</div>
            <div className="py-4">SUN</div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-8 border-t border-gray-300">
            {/* Time Column */}
            <div className="grid grid-rows-9 border-r border-gray-300">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border-b border-gray-300 text-right px-4 py-3">
                  {`${8 + i}:00`}
                </div>
              ))}
            </div>

            {/* Days Columns */}
            {[...Array(7)].map((_, dayIndex) => (
              <div key={dayIndex} className="relative border-r border-gray-200">
                <div className="h-full">
                  {[...Array(9)].map((_, hourIndex) => {
                    // Find the timetable entry for this cell
                    const entry = isArray ? timetable.find(item =>
                      dayToIndex(item.day_of_week) === dayIndex &&
                      parseInt(item.start_time.split(':')[0]) === 8 + hourIndex &&
                      parseInt(item.end_time.split(':')[0]) === 8 + hourIndex + 1
                    ) : null;

                    const color = entry ? subjectColors[entry.subject_id] || '#FFFFFF' : '#FFFFFF'; // Default to white if no color is found
                    const darkerColor = entry ? darkenColor(color, -30) : '#000000'; // Darken the color for text

                    return (
                      <div
                        key={hourIndex}
                        className={`border-b border-gray-300 ${hourIndex === 8 ? 'border-b-0' : ''}`}
                        style={{ height: 'calc(100% / 9)' }}
                      >
                        {entry ? (
                          <div className="p-2" style={{ backgroundColor: `${color}CC`, color: darkerColor }}>
                            <p className="text-sm font-semibold">{subjects[entry.subject_id]}</p>
                            <p className="text-xs">{`${formatTime(entry.start_time)} - ${formatTime(entry.end_time)}`}</p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
