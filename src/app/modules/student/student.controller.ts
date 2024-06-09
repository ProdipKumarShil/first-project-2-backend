import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // UserName Joi Schema
    

    
    const { student: studentData } = req.body
    const {error} = studentValidationSchema.validate(studentData)
    const result = await StudentServices.createStudentIntoDB(studentData)


    if(error){
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details
      })
    }
    
    
    // will call service func to send this data
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents
}
