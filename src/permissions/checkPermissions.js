import axios from "axios";
import store from "../../store";

export async function checkExamPermissions(examType, next) {
  var userNum = JSON.parse(localStorage.getItem("userNum"));
  console.log(userNum);
  var isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  var res = null;

  var url = store.state.sharePointUrl;
  var ifSharePoint = store.state.isSharePointUrl;

  try {
    if (isAdmin) {
      console.log("He is admin");
      next();
    } else {
      var userData = null;

      if (ifSharePoint) {
        res = await axios.get(
          url +
            `getByTitle('isPermissionActive')/Items?$filter=userNum eq ${userNum}`
        );
        userData = res.data.value;
      } else {
        res = await axios.get(url + `isPermissionActive`);
        userData = res.data.value.filter((item) => item.userNum == userNum);
      }
      console.log(userData);

      if (userData.length < 1) {
        next(`/exams/${examType}/noPermissionMessage`);
      } else {
        const hasPermission = userData[0][examType];
        console.log(hasPermission);

        if (hasPermission === true) {
          console.log("yess");
          next();
        } else {
          console.log("fdfdfd");
          next(`/exams/${examType}/noPermissionMessage`);
        }
      }
    }
  } catch (error) {
    console.error("error checking exam permission:", error);
    next("/error");
  }
}
