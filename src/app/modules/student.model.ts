import { Schema, model, connect } from 'mongoose'
import validator from 'validator';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from './student/student.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String, 
    required: [true, 'First Name is required'], 
    maxlength: [20, 'First Name can not be more than 20 characters'], 
    trim: true, // trim can remove unusual spaces
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize format'
    }
  }, 
  middleName: { type: String },
  lastName: { 
    type: String, 
    required: [true, 'Last Name is required'], 
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid'
    }
  }
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'The gender field can only be one of the following: "Male", "Female" or "Other"' // or you can use this => message: '{VALUE} is not valid'
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type'
    // }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active'
  }
})

studentSchema.methods.isUserExist = async function(id: string) {
  const existingUser = await Student.findOne({id})
  return existingUser;
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)