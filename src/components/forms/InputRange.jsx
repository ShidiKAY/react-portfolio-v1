export function InputRange({ label, value, onChange, min, max }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        label={label}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}
