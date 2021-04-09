const Checkbox = ({ title, checked, onChange, disabled = false }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {title}
    </label>
  );
};

export default Checkbox;
