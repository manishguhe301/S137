const QuestionNumber = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className='QuestionNumber'>
      <p>
        {currentQuestion} / {totalQuestions}
      </p>
    </div>
  );
};
export default QuestionNumber;
