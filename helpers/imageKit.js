var ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: "public_kMaZ/rZ7WGzmAHXWqCoT39XchAg=",
  privateKey: "private_KWb9r70j/0PRYldXZZxSQJlex/s=",
  urlEndpoint: "https://ik.imagekit.io/sbyfol4sixc",
});
const fs = require("fs");

module.exports = {
  urlGenereate: () => {
    var imageURL = imagekit.url({
      path: "/default-image.jpg",
      transformation: [
        {
          height: "300",
          width: "400",
        },
      ],
    });
    return imageURL;
  },
  uploadFile: (file) => {
    console.log(file);
    let result = file.buffer.toString("base64");
    return imagekit.upload({
      file: result,
      fileName: file.originalname,
    });
  },
};
