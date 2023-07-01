import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Spinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading ? <LoadingSpinner /> : <h1>BUNNYFIEDLABS</h1>}
    </div>
  );
};

export default Spinner;
