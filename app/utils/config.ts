const ADMIN_EMAIL = "admin@tutoringtosuccess.co.uk";
const ADMIN_ROLE_NAME = "Admin" as const;
const STUDENT_ROLE_NAME = "Student" as const;
const TUTOR_ROLE_NAME = "Tutor" as const;

const ONE_MINUTE = 60 * 1000;

const middlewareConfigMaxReqs = {
  auth: 5,
  latestJobs: 50,
  testimonials: 50,
  contactUs: 1,
  admin: 1000,
  default: 50,
  ONE_MINUTE,
  windowMs: 1 * ONE_MINUTE,
};

const instagramLinks = [
  "https://www.instagram.com/tutoringtosuccesswolverhampton/reel/DN5nNZ8CJ9e/",
  "https://www.instagram.com/tutoringtosuccesswolverhampton/reel/DN6PraICNrG/",
  "https://www.instagram.com/p/DNnw9MPMr9q/",
];

export const config = {
  adminEmail: ADMIN_EMAIL,
  adminRoleName: ADMIN_ROLE_NAME,
  studentRoleName: STUDENT_ROLE_NAME,
  tutorRoleName: TUTOR_ROLE_NAME,
  middlewareConfigMaxReqs,
  instagramLinks
};
