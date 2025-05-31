import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

let connectionParams = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mysql@root1234",
  database: "my_database",
};

// mysql://<username>:<password>@<host>:<port>/<database>

let connection_uri = `mysql://${connectionParams.user}:${connectionParams.password}@${connectionParams.host}:${connectionParams.port}/${connectionParams.database}`;

export async function GET(request: NextRequest) {
  let name = "";
  try {
    name = request.nextUrl!.searchParams!.get("name")!;

    const connection = await mysql.createConnection(connection_uri);

    let get_students_query = "";
    let values: any[] = [];

    if (name) {
      get_students_query = "SELECT * FROM my_database.students WHERE name = ?";
      values = [name];
    } else {
      get_students_query = "SELECT * FROM my_database.students";
    }

    const [results] = await connection.execute(get_students_query, values);

    connection.end();

    // response with the JSON object

    return NextResponse.json(results);
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const connection = await mysql.createConnection(connection_uri);
    const insertQuery =
      "INSERT INTO my_database.students (name, email) VALUES (?, ?)";
    const [result] = await connection.execute(insertQuery, [name, email]);
    await connection.end();

    return NextResponse.json({
      message: "Student added",
      id: (result as any).insertId,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
