import axios from "axios";
import store from "../../store";

export async function checkExamPermissions(examType, next) {
  var userId = JSON.parse(localStorage.getItem("userId"));
  console.log(userId);
  var isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  var res = null;

  var url = store.state.sharePointUrl;
  var ifSharePoint = store.state.isSharePointUrl;

  try {
    if (isAdmin) {
      console.log("He is admin");
      next();
    } else {
      console.log("not admin")
      var userData = null;

      if (ifSharePoint) {
        res = await axios.get(
          url +
            `getByTitle('testsAndExams')/Items?$filter=type eq '${examType}'`
        );
        userData = res.data.value;
        console.log(userData)
      } else {
        res = await axios.get(url + `students`);
        userData = res.data.value.filter((item) => item.userNum == userId);
      }
      console.log(userData);

      if (userData.length<1) {
        console.log("yessss")
        next(`/exams/${examType}/noPermissionMessage`);
      } else {
         console.log("has permission");
      }
    }
  } catch (error) {
    console.error("error checking exam permission:", error);
    next("/error");
  }
}
