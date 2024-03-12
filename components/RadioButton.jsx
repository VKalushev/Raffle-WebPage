const RadioButton = ({ id, value, checked, onChange, label, disabled }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled} // Add disabled attribute here
        className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <label htmlFor={id} className={`ml-2 block text-sm text-gray-900 ${disabled ? 'text-gray-500' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;