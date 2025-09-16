type RadioInputProps = {
  name: string;
  value: string;
  checked: boolean;
  radioText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  "data-testid"?: string;
};

export default function RadioInput({
  name,
  value,
  checked,
  radioText,
  onChange,
  className,
  disabled,
  required,
  ...props
}: RadioInputProps) {
  const dataTestId = props["data-testid"];

  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        required={required ?? false}
        name={name}
        value={value}
        checked={checked ?? false}
        onChange={onChange}
        className={`form-radio text-yellow-400 ${className ?? ""}`}
        disabled={disabled ?? false}
        data-testid={dataTestId ?? ""}
      />
      <span className="ml-2">{radioText}</span>
    </label>
  );
}
