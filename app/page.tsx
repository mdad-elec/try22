"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify, AuthUser } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function App({ signOut, user }: { signOut: () => void; user: AuthUser }) {
  const [students, setStudents] = useState<Array<Schema["Student"]["type"]>>([]);
  const [teachers, setTeachers] = useState<Array<Schema["Teacher"]["type"]>>([]);

  function listData() {
    client.models.Student.observeQuery().subscribe({
      next: (data) => setStudents([...data.items]),
    });

    client.models.Teacher.observeQuery().subscribe({
      next: (data) => setTeachers([...data.items]),
    });
  }

  useEffect(() => {
    listData();
  }, []);

  function createStudent() {
    client.models.Student.create({
      name: window.prompt("Student name"),
      email: window.prompt("Student email"),
      class: window.prompt("Student class"),
    });
  }

  function createTeacher() {
    client.models.Teacher.create({
      name: window.prompt("Teacher name"),
      email: window.prompt("Teacher email"),
    });
  }

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <Button onClick={signOut}>Sign Out</Button>

      <h2>Students</h2>
      <button onClick={createStudent}>+ Add Student</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email} - Class: {student.class}
          </li>
        ))}
      </ul>

      <h2>Teachers</h2>
      <button onClick={createTeacher}>+ Add Teacher</button>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} - {teacher.email}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default withAuthenticator(App);
