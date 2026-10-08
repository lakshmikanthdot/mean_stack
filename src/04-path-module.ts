// build and read the file path using the path module

import path from "node:path";

// console.log(path); // gives the path module object

// const filePath = projectRoot + "/uploads" + filename;
// instead of doing this we can use the path module to build the file path
// path.join : Uses the correct separator for the current operating system
// eg
// mac: /users/lucky/Desktop/projects/uploads/file.txt
// windows: c:\users\lucky\Desktop\projects\uploads\file.txt

// process.cwd() : gives the current working directory of the project
// the folder where the node js process was started

const projectRoot = process.cwd();
// console.log("projectRoot : ", projecrRoot); // /users/lucky/Desktop/projects
// /uploads/users/42/profile.photo.png
const userId = "42"; // path argu must be string
const originalName = "profile.photo.png";

// imp -> path.join -> creates a path string
// correct separator for the current operating system
// it will not create the folder structure, it will just create the path string
// it does not check if the path exists or not, it just creates the path string
const uploadFilePath = path.join(
  projectRoot,
  "uploads",
  "users",
  userId,
  originalName,
);
console.log("uploadFilePath : ", uploadFilePath); // /users/lucky/Desktop/projects/uploads/users/42/profile.photo.png
// sequence of path segments is important, if we change the order of the segments then the file path will be different

// properties from the path module

// path.basename() : gives the final part of the path, which is the file name with extension
const fileName = path.basename(uploadFilePath); // gives the file name with extension
console.log("fileName : ", fileName); // profile.photo.png

// path.extname() : gives the extension of the file
const fileExtension = path.extname(uploadFilePath); // gives the extension of the file
console.log("fileExtension : ", fileExtension); // .png

// path.dirname() : gives the directory part of the path
const parentFolder = path.dirname(uploadFilePath); // gives the directory part of the path
console.log("parentFolder : ", parentFolder); // /users/lucky/Desktop/projects/uploads/users/42
// test commit streak1
