const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "24px",
        fontFamily: "sans-serif",
      }}
    >
      <p>🌍 Loading...</p>
    </div>
  );
};

export default LoadingScreen;
