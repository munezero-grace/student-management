import joi from "joi";

interface ValidationSchema {
  name: string;
  age: number;
  isActive: boolean;
}
export const createStudentValidationSchema = joi.object<ValidationSchema>({
  name: joi.string().required(),
  age: joi.number().min(10).max(50).required(),
  isActive: joi.boolean().default(false),

});