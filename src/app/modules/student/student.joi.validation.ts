import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .required()
    .custom((value, helpers) => {
      if (value.charAt(0).toUpperCase() + value.slice(1) !== value) {
        return helpers.message(`${value} is not in capitalize format`);
      }
      return value;
    }, 'Capitalize Format Validation'),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[A-Za-z]+$/.test(value)) {
        return helpers.message(`${value} is not valid`);
      }
      return value;
    }, 'Alpha Validation')
});

// Guardian Joi ValidationSchema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

// LocalGuardian Joi ValidationSchema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Student Joi ValidationSchema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'The gender field can only be one of the following: "male", "female" or "other"'
    }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': '{#value} is not a valid email type'
    }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
});

export default studentValidationSchema
