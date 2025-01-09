interface FormData {
  studentName: string;
  parentName: string;
  parentPhone: string;
  message: string;
}

interface FormErrors {
  studentName?: string;
  parentName?: string;
  parentPhone?: string;
  message?: string;
}

// Sanitise and validate input
const sanitiseAndValidate = (data: FormData): FormErrors => {
  const newErrors: FormErrors = {};

  // Sanitise and validate student name
  const sanitisedStudentName = data.studentName
    .trim()
    .replace(/[^a-zA-Z\s]/g, "");
  if (sanitisedStudentName.length < 2) {
    newErrors.studentName = "Student name must be at least 2 characters";
  }
  if (sanitisedStudentName.length > 50) {
    newErrors.studentName = "Student name must be less than 50 characters";
  }

  // Sanitise and validate parent name
  const sanitisedParentName = data.parentName
    .trim()
    .replace(/[^a-zA-Z\s]/g, "");
  if (sanitisedParentName.length < 2) {
    newErrors.parentName = "Parent name must be at least 2 characters";
  }
  if (sanitisedParentName.length > 50) {
    newErrors.parentName = "Parent name must be less than 50 characters";
  }

  // Sanitise and validate phone number
  const sanitisedPhone = data.parentPhone.replace(/[^0-9+]/g, "");
  const phoneRegex = /^(?:\+44|0)[0-9]{10}$/;
  if (!phoneRegex.test(sanitisedPhone)) {
    newErrors.parentPhone = "Please enter a valid UK phone number";
  }

  // Sanitise and validate message
  const sanitisedMessage = data.message
    .trim()
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[^\w\s.,!?-]/g, ""); // Allow only basic punctuation
  if (sanitisedMessage.length < 10) {
    newErrors.message = "Message must be at least 10 characters";
  }
  if (sanitisedMessage.length > 500) {
    newErrors.message = "Message must be less than 500 characters";
  }

  return newErrors;
};

export { sanitiseAndValidate };
