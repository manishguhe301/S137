const Slider = ({ value, onChange }) => {
  return (
    <div className='SliderWrapper'>
      <input
        id='Slider'
        step={25}
        value={value}
        type='range'
        list='tickmarks'
        onChange={onChange}
      />
      <datalist id='tickmarks'>
        <option value='0' label='Strongly Disagree'></option>
        <option value='25' label='Disagree'></option>
        <option value='50' label='Neutral'></option>
        <option value='75' label='Agree'></option>
        <option value='100' label='Strongly Agree'></option>
      </datalist>
    </div>
  );
};
export default Slider;
