import React from "react";

interface NumberInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = "Add number of minutes",
  min = 0,
  max = 60,
  step = 1,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange("");
    } else {
      const num = Number(val);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white w-full max-w-md relative" style={{ minHeight: 64 }}>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="flex-1 text-lg text-gray-800 bg-transparent outline-none border-none placeholder:text-gray-700"
        style={{ appearance: "none" }}
      />
    </div>
  );
};

export default NumberInput;
