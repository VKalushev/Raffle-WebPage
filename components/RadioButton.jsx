const RadioButton = ({ id, value, checked, onChange, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
