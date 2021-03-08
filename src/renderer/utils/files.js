/**
 * 工具类 - 文件类型
 */

const { exec } = require("child_process");
import { message } from "ant-design-vue";

export const openFile = function(filePath) {
  if (filePath && typeof filePath === "string") {
    // execFile只支持打开真实的文件，exec支持打开快捷链接方式的应用
    exec(filePath, (error, stdout, stderr) => {
      if (error) {
        message.error("文件异常");
        console.error("error:", error);
        return;
      }
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
    });
  } else {
    message.error("文件不存在");
  }
};
