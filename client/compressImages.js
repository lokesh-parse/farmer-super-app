const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "src", "assets");

const images = fs
  .readdirSync(folder)
  .filter((file) => file.endsWith(".jpg"));

images.forEach(async (file) => {
  const input = path.join(folder, file);
  const output = path.join(folder, "compressed-" + file);

  await sharp(input)
    .resize({ width: 900 })
    .jpeg({ quality: 65 })
    .toFile(output);

  fs.unlinkSync(input);
  fs.renameSync(output, input);

  console.log("Compressed:", file);
});