import PageLoading from "../loading/PageLoading";

type SubmitButtonProps = {
  disabled?: boolean;
  className?: string;
  isLoading: boolean;
  "data-testid"?: string;
};

export default function SubmitButton({
  disabled,
  className,
  isLoading,
  ...props
}: SubmitButtonProps) {
  const dataTestId = props["data-testid"];

  return (
    <button
      type="submit"
      disabled={disabled ?? false}
      className={`w-full bg-black text-white py-3 rounded-lg font-medium transition-colors
          ${
            isLoading ? "cursor-not-allowed opacity-75" : "hover:bg-gray-800"
          } ${className ?? ""}`}
      data-testid={dataTestId}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <PageLoading />}
        <span>{isLoading ? "Sending..." : "Submit"}</span>
      </div>
    </button>
  );
}
