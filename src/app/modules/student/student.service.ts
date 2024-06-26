import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) // built in static method

  const student = new Student(studentData) // create an instance

  if(await student.isUserExist(studentData.id)){
    throw new Error('User already exist')
  }
  
  const result = await student.save() // built in instance method => provide by mongoose
  
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id});
  return result;
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB
}