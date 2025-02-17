import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates Students and Teachers database tables.
=========================================================================*/
const schema = a.schema({
  Student: a
    .model({
      name: a.string(),
      email: a.string(),
      class: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Teacher: a
    .model({
      name: a.string(),
      email: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your tables.
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: students } = await client.models.Student.list()
// const { data: teachers } = await client.models.Teacher.list()

// return (
//   <div>
//     <h1>Students</h1>
//     <ul>{students.map(student => <li key={student.id}>{student.name} - {student.email} - {student.class}</li>)}</ul>
//     <h1>Teachers</h1>
//     <ul>{teachers.map(teacher => <li key={teacher.id}>{teacher.name} - {teacher.email}</li>)}</ul>
//   </div>
// )