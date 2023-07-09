import Head from "next/head";

import React, { useState } from "react";

export default function Home() {
  const [emails, setEmails] = useState([]);

  async function fetch_emails() {
    const req = await fetch("http://localhost:3000/api/sheet");
    const res = await req.json();

    console.log("THIS", res.data, typeof res.data);

    setEmails(res.data);
    console.log("emails", emails);
  }

  // sheetdata.map((item, index) => {
  //   console.log(index, item);
  // });
  return (
    <div>
      <Head>
        <title>BUNNYFIEDLABS</title>
        <meta name="email blasting" content="Created By Bunnyfiedlabs" />
      </Head>

      <main>
        {emails && emails.length > 0 ? (
          emails.map((item, index) => (
            <span key={index}>
              {index} : {item}
              <br />
            </span>
          ))
        ) : (
          <span>No emails available</span>
        )}
        <br />
        <button onClick={fetch_emails}>Fetch</button>
      </main>
    </div>
  );
}
