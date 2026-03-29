import { createRequire } from "module";

const require = createRequire(import.meta.url);

const db = {
  courses: require("./courses.json"),
  modules: require("./modules.json"),
  assignments: require("./assignments.json"),
  users: require("./users.json"),
  enrollments: require("./enrollments.json"),
};

export default db;
