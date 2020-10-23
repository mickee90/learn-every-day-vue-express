import fs from "fs";
import path from "path";

const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "../uploads", "avatars", filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

exports.deleteFile = deleteFile;
