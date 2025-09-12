import LoadingSpinner from "./LoadingSpinner";

const PageLoading: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
      data-testid="page-loading"
    >
      <div className="text-center" data-testid="page-loading-loading-spinner">
        <LoadingSpinner size="large" />
        <p
          className="mt-4 text-gray-600"
          data-testid="page-loading-loading-text"
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
