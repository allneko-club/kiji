
export const MainErrorFallback = () => {
  return (
    <div role="alert">
      <h2>エラーが発生しました :( </h2>
      <button
        onClick={() => window.location.assign(window.location.origin)}
      >
        リフレッシュ
      </button>
    </div>
  );
};