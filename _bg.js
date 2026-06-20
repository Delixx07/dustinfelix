const sharp = require("sharp");
const fs = require("fs");
(async () => {
  const src = "public/images/hero-bg.png";
  // keep the user's original as a backup
  if (!fs.existsSync("public/images/hero-bg-original.png")) {
    fs.copyFileSync(src, "public/images/hero-bg-original.png");
  }
  // downscale to 1920 wide + JPEG so the code's existing /images/hero-bg.jpg
  // path works and the file is light.
  const buf = await sharp("public/images/hero-bg-original.png")
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync("public/images/hero-bg.jpg", buf);
  // remove the heavy PNG copy (original is backed up separately)
  fs.rmSync(src);
  const meta = await sharp(buf).metadata();
  console.log(`hero-bg.jpg: ${(buf.length / 1024).toFixed(0)}KB | ${meta.width}x${meta.height}`);
})();
