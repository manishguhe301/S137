const QuestionNumber = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className='questionNumber'>
      <p>
        {currentQuestion} / {totalQuestions}
      </p>
    </div>
  );
};
export default QuestionNumber;
