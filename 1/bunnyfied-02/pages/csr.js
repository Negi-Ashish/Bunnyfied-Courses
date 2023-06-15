import { useEffect } from "react";
function csr() {
  let data = {
    title: "CSR EXAMPLE",
    description: "THIS OBJECT WILL BE EMPTY FIRST",
  };
  useEffect(() => {
    // Perform actions here
    data = {
      title: "CSR EXAMPLE",
      description: "You will fetch something on the client side.",
    };
    console.log("useEffect is called on Client Side.");
  });
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

export default csr;
