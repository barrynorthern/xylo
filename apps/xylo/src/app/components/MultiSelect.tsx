import { Checkbox } from './Checkbox';

interface IMultiSelectProps {
  options: string[] | undefined;
  defaultValues: string[];
  optionSelected: (type: string) => void;
  optionDeselected: (type: string) => void;
  localisation: { [key: string]: string } | null;
}

export function MultiSelect({
  options,
  defaultValues,
  optionSelected,
  optionDeselected,
  localisation,
}: IMultiSelectProps) {
  const handleChange = (option: string) => (checked: boolean) => {
    console.log('ms', option, checked);
    if (checked) {
      optionSelected(option);
    } else {
      optionDeselected(option);
    }
  };
  return !options ? (
    <div className="mb-4"></div>
  ) : (
    <fieldset className="flex flex-wrap mb-4">
      {options.map((option) => (
        <Checkbox
          key={option}
          id={option}
          name={localisation ? localisation[option] : option}
          initialChecked={defaultValues.includes(option)}
          onChange={handleChange(option)}
        />
      ))}
    </fieldset>
  );
}