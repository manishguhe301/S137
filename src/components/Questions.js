import React, { useState } from 'react';

import Next from '../assets/next.svg';
import Previous from '../assets/previous.svg';
import ProgressBar from './ProgressBar';
import QuestionNumber from './QuestionNumber';
import QuestionStatement from './QuestionStatement';
import Slider from './Slider';

let questions = [
  {
    Statement: 'My leadership journey has progressed as I anticipated.',
    id: 1,
  },
  {
    Statement:
      'I have spent fewer than 4 years in full time service or ministry.',
    id: 2,
  },
  {
    Statement: 'My plans are likely to succeed.',
    id: 3,
  },
];

const Questions = () => {
  const [questionId, setQuestionId] = useState(1);
  const [progressBarValue, setProgressBarValue] = useState([
    {
      name: 'IDEALISTIC',
      score: 10,
      key: 1,
    },
  ]);

  const [sliderValue, setSliderValue] = useState('0');
  const [data, setData] = useState([]);

  const handleNavigationButtons = (button) => {
    let matchFound = checkMatch(questionId + 1);
    if (button === 'next' && questionId !== 3 && matchFound.length > 0) {
      setSliderValue(matchFound[0].sliderValue);
      handleIdealisticProgressBar('Increase');
      setQuestionId((prev) => prev + 1);
    } else if (button === 'previous' && questionId > 1) {
      let matchFound = checkMatch(questionId - 1);
      setSliderValue(matchFound[0].sliderValue);
      handleIdealisticProgressBar('Decrease');
      setQuestionId((prev) => prev - 1);
    }
  };

  function handleSliderOnChange(event) {
    if (data.length === 0) {
      setData([{ ques: questionId, sliderValue: event.target.value }]);
    } else {
      let matchFound = checkMatch(questionId);
      if (matchFound.length > 0) {
        setData((prev) => {
          return prev.map((element) => {
            if (element.ques === questionId) {
              return { ...element, sliderValue: event.target.value };
            } else {
              return { ...element };
            }
          });
        });
      } else {
        setData((prev) => {
          return [
            ...prev,
            { ques: questionId, sliderValue: event.target.value },
          ];
        });
      }
    }
    setSliderValue(event.target.value);
    setTimeout(() => {
      setSliderValue('0');
    }, 250);
    if (questionId !== 3) {
      handleIdealisticProgressBar('Increase');
      setQuestionId((prev) => prev + 1);
    }
  }

  function checkMatch(num) {
    return data.filter((element) => {
      return num === element.ques;
    });
  }

  function handleIdealisticProgressBar(state) {
    if (state === 'Increase') {
      setProgressBarValue((prev) => {
        return prev.map((element) => {
          if (element.name === 'IDEALISTIC') {
            return { ...element, score: element.score + 20 };
          } else {
            return { ...element };
          }
        });
      });
    } else {
      setProgressBarValue((prev) => {
        return prev.map((element) => {
          if (element.name === 'IDEALISTIC') {
            return { ...element, score: element.score - 20 };
          } else {
            return { ...element };
          }
        });
      });
    }
  }

  let questionStatement = questions.filter((element) => {
    return questionId === element.id;
  });

  return (
    <div className='Question'>
      <div className='QuestionContainer'>
        <div className='ProgressBars'>
          {progressBarValue.map((progressBar) => (
            <ProgressBar
              key={progressBar.key}
              name={progressBar.name}
              score={progressBar.score}
            />
          ))}
        </div>
        <QuestionNumber
          currentQuestion={questionId}
          totalQuestions={questions.length}
        />
        <QuestionStatement statement={questionStatement[0].Statement} />
        <Slider value={sliderValue} onChange={handleSliderOnChange} />

        <div className='NavigationButtons'>
          <div
            className='ButtonWrapper'
            onClick={() => {
              handleNavigationButtons('previous');
            }}
          >
            <img src={Previous} alt='back' />
            <p>Back</p>
          </div>
          <div
            onClick={() => {
              handleNavigationButtons('next');
            }}
            className='ButtonWrapper'
          >
            <p>Next</p>
            <img src={Next} alt='Forward arrow' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
