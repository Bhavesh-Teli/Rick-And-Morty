import { MoonLoader } from "react-spinners";

const Loader = () => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={loaderStyle}>
      <MoonLoader color="#1a73e8" size={80} />
    </div>
  );
};

export default Loader;
