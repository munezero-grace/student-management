export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    FAILED_TO_RETRIEVE: "Failed to retrieve users",
    FAILED_TO_RETRIEVE_SINGLE: "Failed to retrieve user",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    FAILED_TO_CREATE: "Failed to create user",
    FAILED_TO_UPDATE: "Failed to update user",
    FAILED_TO_DELETE: "Failed to delete a user",
  },

  STUDENT: {
    NOT_FOUND: "Student not found",
    FAILED_TO_CREATE: "Failed to create student",
    FAILED_TO_RETRIEVE: "Failed to retrieve students",
  },

  ATTENDANCE: {
    NOT_FOUND: "Attendance record not found",
    MISSING_REQUIRED_FIELDS: "Missing required fields",
    FAILED_TO_CREATE: "Failed to create attendance record",
    FAILED_TO_RETRIEVE: "Failed to retrieve attendance records",
    FAILED_TO_RETRIEVE_SINGLE: "Failed to retrieve attendance record",
  },

  VALIDATION: {
    INVALID_INPUT: "Invalid input",
  },

  GENERAL: {
    ROUTER_PATH_NOT_FOUND: "Router path not found",
  },
};

export default ERROR_MESSAGES;
