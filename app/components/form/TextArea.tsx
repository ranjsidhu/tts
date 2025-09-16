type TextAreaProps = {
  name: string;
  value: string;
  labelText: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  "data-testid"?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  name,
  value,
  labelText,
  placeholder,
  required,
  className,
  disabled,
  isError,
  errorMessage,
  onChange,
  ...props
}: TextAreaProps) {
  const dataTestId = props["data-testid"];

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {labelText}
        <textarea
          required={required ?? false}
          name={name}
          data-testid={dataTestId ?? ""}
          placeholder={placeholder}
          value={value}
          disabled={disabled ?? false}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            isError ? "border-red-500" : "border-gray-300"
          } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none min-h-[100px] resize-y disabled:bg-gray-50 disabled:cursor-not-allowed ${
            className ?? ""
          }`}
        />
      </label>
      {isError && (
        <p className="mt-1 text-sm text-red-500" data-testid="textarea-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
