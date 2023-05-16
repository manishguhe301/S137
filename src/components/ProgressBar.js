const ProgressBar = ({ name, score }) => {
  return (
    <div className='ProgressBarWrapper'>
      <progress id={name} max='50' value={score}></progress>
      <label htmlFor={name}>{name}</label>
    </div>
  );
};
export default ProgressBar;
