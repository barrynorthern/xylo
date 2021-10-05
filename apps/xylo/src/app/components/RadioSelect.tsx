interface IRadioSelectProps {
  defaultValue: string;
  group: string;
  options: string[] | undefined;
  optionSelected: (type: string) => void;
  localisation: { [key: string]: string };
}

export function RadioSelect({
  defaultValue,
  group,
  options,
  optionSelected,
  localisation,
}: IRadioSelectProps) {
  const handleChange =
    (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      optionSelected(option);
    };
  return !options ? (
    <div></div>
  ) : (
    <fieldset className="flex h-6 flex-col md:flex-row">
      {options.map((option) => (
        <p className="flex align-middle mr-4 cursor-pointer" key={option}>
          <input
            type="radio"
            className="mt-1 cursor-pointer"
            id={option}
            value={option}
            name={group}
            defaultChecked={option === defaultValue}
            onChange={handleChange(option)}
          />
          <label
            htmlFor={option}
            className="ml-2 cursor-pointer whitespace-nowrap"
          >
            {localisation[option]}
          </label>
        </p>
      ))}
    </fieldset>
  );
}
