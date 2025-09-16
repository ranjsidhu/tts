type TextInputProps = {
  name: string;
  value: string;
  labelText: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  checked?: boolean;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  "data-testid"?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  name,
  value,
  labelText,
  placeholder,
  type,
  checked,
  required,
  className,
  disabled,
  isError,
  errorMessage,
  onChange,
  ...props
}: TextInputProps) {
  const dataTestId = props["data-testid"];

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {labelText}
        <input
          type={type ?? "text"}
          required={required ?? false}
          checked={checked ?? false}
          name={name}
          data-testid={dataTestId ?? ""}
          placeholder={placeholder}
          value={value}
          disabled={disabled ?? false}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            isError ? "border-red-500" : "border-gray-300"
          } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed ${
            className ?? ""
          }`}
        />
      </label>
      {isError && (
        <p className="mt-1 text-sm text-red-500" data-testid="text-input-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
