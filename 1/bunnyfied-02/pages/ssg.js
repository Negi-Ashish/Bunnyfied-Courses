export async function getStaticProps() {
  // Fetch data from an API, database, or any other source
  const jsonData = {
    title: "SSG EXAMPLE",
    description: "You will fetch something that is static.",
  };

  console.log("Inside getStaticProps");

  // Return the data as props
  return {
    props: {
      data: jsonData,
    },
  };
}

function ssg({ data }) {
  // Use the data in your component
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

export default ssg;
