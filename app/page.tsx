"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [students, setStudents] = useState<Array<Schema["Student"]["type"]>>([]);
  const { signOut } = useAuthenticator();

  function listStudents() {
    client.models.Student.observeQuery().subscribe({
      next: (data) => setStudents([...data.items]),
    });
  }

  useEffect(() => {
    listStudents();
  }, []);

  function createStudent() {
    const name = window.prompt("Student name");
    const email = window.prompt("Student email");
    const className = window.prompt("Student class");
    if (name && email && className) {
      client.models.Student.create({
        name,
        email,
        class: className
      });
    }
  }

  return (
    <main>
      <h1>Students</h1>
      <button onClick={createStudent}>+ new student</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email} - {student.class}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new student.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}