import fs from "fs-extra";
import path from "path";

const run = () => {
  fs.copySync(
    path.resolve(__dirname, "./_redirects"),
    path.resolve(__dirname, "./build/_redirects")
  );

  fs.copySync(
    path.resolve(__dirname, "./src/data/projects"),
    path.resolve(__dirname, "./build/data/projects")
  );
};

run();
