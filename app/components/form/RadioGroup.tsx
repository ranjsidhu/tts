type RadioGroupProps = { children: React.ReactNode; formGroupLabel: string };

export default function RadioGroup({
  children,
  formGroupLabel,
}: RadioGroupProps) {
  return (
    <div>
      <span className="block text-sm font-medium mb-1">
        {formGroupLabel}
        <div className="mt-2 space-x-4">{children}</div>
      </span>
    </div>
  );
}
