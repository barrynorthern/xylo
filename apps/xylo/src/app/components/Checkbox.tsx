import { useState, useEffect } from 'react';

interface ICheckboxProps {
  id: string;
  name: string;
  initialChecked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({
  id,
  name,
  initialChecked,
  onChange,
}: ICheckboxProps) {
  const [checked, setChecked] = useState(initialChecked);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    setTimeout(() => onChange(e.target.checked), 0);
  };
  useEffect(() => setChecked(initialChecked), [initialChecked]);
  return (
    <div className="flex mr-4 cursor-pointer">
      <input
        className="mt-1 cursor-pointer"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="ml-2 cursor-pointer">
        {name}
      </label>
    </div>
  );
}
