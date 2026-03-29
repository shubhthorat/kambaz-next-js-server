import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollCurrentUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.enrollUserInCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  const unenrollCurrentUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.post("/api/users/current/enrollments/:courseId", enrollCurrentUserInCourse);
  app.delete(
    "/api/users/current/enrollments/:courseId",
    unenrollCurrentUserFromCourse
  );
}
