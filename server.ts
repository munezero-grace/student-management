import express, { Express, Request, Response } from "express";
import cors from "cors";
import { StudentInterface } from "./types";
import { db } from "./dabatase";

interface CreateStudentsRequest extends Request {
  body: Partial<StudentInterface>;
}
interface GetStudentIdParamsReq extends Request {
  params: {
    studentId: string;
  };
}
const app: Express = express();
app.use(cors());
app.use(express.json());

app.post("/students", (req: CreateStudentsRequest, res: Response) => {
  try {
    const { name, age, isActive } = req.body;
    if (!name || !age || !isActive) {
      return res.status(400).json({
        message: "Your missing field",
      });
    }
    db.push({
      id: (db.length + 1).toString(),
      name,
      age,
      isActive,
      createdAt: new Date(),
    });
    res.status(201).json({
      Message: "student have been created successfuly",
    });
  } catch (error) {
    const { message, stack } = error as Error;
    res.status(500).json({
      message,
      stack,
    });
  }
});
app.get("/students", (req: Request, res: Response) => {
  const allStudents = db;
  res.status(200).json({
    data: allStudents,
    message: "fetched well",
  });
});
app.get("/students/:studentId", (req: GetStudentIdParamsReq, res: Response) => {
  const { studentId } = req.params;

  const findIndex = db.findIndex((va) => va.id === studentId);
  if (findIndex === -1) {
    res.status(404).json({
      message: "Student not Found",
    });
  }
  console.log(findIndex);
  const student = db[findIndex];
  res.status(200).json({
    message: "student Fetched well",
    data: student,
  });
});
app.get("/", (req: Request, res: Response) => {
  res.send("Welcom  to our Server");
});
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "router path not found",
  });
});
app.listen(5600, () => console.log("serving on port 5000"));
export default app;
