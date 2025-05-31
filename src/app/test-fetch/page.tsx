"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  type Student = {
    name: string;
    email: string;
  };
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //   fetching all Students
  async function getStudents() {
    const data = await fetch("http://localhost:3000/api/mysql/students");
    const response = await data.json();
    console.log(response);
    setStudents(response);
  }

  //   adding a Student
  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/mysql/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    console.log("Student added:", data);

    // Reset fields and refresh list
    setName("");
    setEmail("");
    getStudents();
  }
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <div>
        <p>Add new Student</p>
        <form onSubmit={addStudent}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="border p-2 mt-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        {students.map((student, index) => (
          <div key={index}>
            <p>Name: {student.name}</p>
            <p>Email: {student.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
