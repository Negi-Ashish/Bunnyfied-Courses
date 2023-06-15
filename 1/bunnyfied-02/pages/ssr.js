export async function getServerSideProps() {
  // Fetch data from an API, database, or any other source
  const jsonData = {
    title: "SSR EXAMPLE",
    description: "You will fetch something that is dynamic.",
  };

  console.log("Inside getServerSideProps");
  // Return the data as props
  return {
    props: {
      data: jsonData,
    },
  };
}

function ssr({ data }) {
  // Use the data in your component
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

export default ssr;
