import AlertComponent from "../components/AlertComponent";

function alert() {
  return (
    <div>
      <h1
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        BUNNYFIEDLABS
      </h1>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AlertComponent />
      </div>
    </div>
  );
}

export default alert;
