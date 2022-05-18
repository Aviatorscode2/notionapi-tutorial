import { Client } from "@notionhq/client";
import { useEffect } from "react";



export default function Employees({results}) {

  useEffect(() =>{
    console.log(results);
  });


  const getDatabaseDisplay = () => {
    let jsx = [];
    results.forEach((employee) => {
      jsx.push(
        <div className="card" key={employee.id}>
          <p>{employee.properties.Name.title[0].plain_text}</p>
          <span>{employee.properties.Tags.multi_select[0].name}</span>
        </div>
      );
    });
    return jsx;
  };

  return <div>{getDatabaseDisplay()}</div>
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

  // passing the database id
  const databaseId = "c2085328946447ed80cc67c251b24843";
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  console.log(response);
  return {
    props: {
      results: response.results
    },
  };
}
