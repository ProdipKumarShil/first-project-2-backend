import { z } from "zod";

// Define the Zod Validationschema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string()
    .max(20, { message: 'First Name can not be more than 20 characters' })
    .trim()
    .refine(value => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    }, { message: 'First Name is not in capitalize format' }),
  middleName: z.string().optional(),
  lastName: z.string()
    .refine(value => /^[A-Za-z]+$/.test(value), { message: 'Last Name is not valid' })
});

// Define the Zod Validationschema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

// Define the Zod Validationschema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define the Zod Validationschema for Student
const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string()
    .email({ message: 'Email is not a valid email type' }),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'inActive']).default('active')
});


export default studentValidationSchema

