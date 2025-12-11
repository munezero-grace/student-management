import * as zod from "zod";

export const CreateStudentValidationSchemaWithZod = zod.object({
  name: zod.string({ message: "Field Name is Required" }),
  age: zod.number({ message: "Field Age is Required" }).min(10).max(50),
  isActive: zod
    .boolean({ message: "Field Is Active must be either true or false" })
    .default(false),
});

export type ValidationSchemaWithZodType = zod.infer<
  typeof CreateStudentValidationSchemaWithZod
>;
