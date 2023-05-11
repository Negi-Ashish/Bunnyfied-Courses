import React from "react";

export default function About(props) {
  const { name, description } = props;
  return (
    <main>
      <h1> We are in the About Component.</h1>
      <h2>{name}</h2>
      <h2>{description}</h2>
    </main>
  );
}
