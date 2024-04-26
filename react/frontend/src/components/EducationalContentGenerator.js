import React from 'react';
import '../styles/styles.css';

const EducationalContentGenerator = ({ prompt, setPrompt, difficulty, setDifficulty, subject, setSubject, format, setFormat }) => {
  const difficultyOptions = ['Easy', 'Intermediate', 'Advanced'];
  const subjectOptions = ['General', 'Mathematics', 'Science', 'History', 'Literature'];
  const formatOptions = ['Article', 'Lesson Plan', 'Quiz', 'Infographic'];

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleFormatChange = (e) => setFormat(e.target.value);

  return (
    <div className="component">
      <div className="customization-options">
        <div className="customization-feature">
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={handleDifficultyChange} className="customization-select">
            {difficultyOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="customization-feature">
          <label htmlFor="subject">Subject:</label>
          <select id="subject" value={subject} onChange={handleSubjectChange} className="customization-select">
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="customization-feature">
          <label htmlFor="format">Format:</label>
          <select id="format" value={format} onChange={handleFormatChange} className="customization-select">
            {formatOptions.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EducationalContentGenerator;