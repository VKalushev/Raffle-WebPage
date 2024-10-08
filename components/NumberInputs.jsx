const NumberInput = ({ value, onChange, disabled}) => {
    const handleDecrease = () => {
      if (value > 1) {
        onChange(value - 1);
      }
    };
  
    const handleIncrease = () => {
      onChange(value + 1);
    };
  
    const handleChange = (e) => {
      const newValue = parseInt(e.target.value);
      if (!isNaN(newValue)) {
        onChange(newValue);
      }
    };
  
    return (
      <div className="flex items-center space-x-0.5">
        <button
          onClick={handleDecrease}
          className="px-1 py-0 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          disabled={disabled}
        >
          -
        </button>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="px-1 py-0 w-12 text-center border border-gray-300 rounded-md focus:outline-none"
          disabled={disabled}
        />
        <button
          onClick={handleIncrease}
          className="px-1 py-0 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          disabled={disabled}
        >
          +
        </button>
      </div>
    );
  };
  
  export default NumberInput;