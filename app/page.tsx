"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
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
      <h1>Students</h1>
      <button onClick={createStudent}>+ Add Student</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name} - {student.email} - Class: {student.class}</li>
        ))}
      </ul>

      <h1>Teachers</h1>
      <button onClick={createTeacher}>+ Add Teacher</button>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>{teacher.name} - {teacher.email}</li>
        ))}
      </ul>
    </main>
  );
}
