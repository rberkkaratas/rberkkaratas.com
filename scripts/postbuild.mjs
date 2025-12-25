import fs from "node:fs";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const from = path.join(dist, "404", "index.html");
const to = path.join(dist, "404.html");

try {
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log("postbuild: wrote dist/404.html");
  } else {
    console.warn("postbuild: missing dist/404/index.html; skipping 404.html copy");
  }
} catch (e) {
  console.error("postbuild failed:", e);
  process.exitCode = 1;
}
