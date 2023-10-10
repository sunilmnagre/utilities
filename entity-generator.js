const fs = require("fs");
const path = require("path");

if (!process.env.ENTITY) {
  console.error("Please provide an Entity name...");
  return;
}

let entityObj = {
  controller: "Controllers",
  model: "Model",
  service: "Service",
  test: "tests",
};

try {
  let [filePath, fileName, fileContent] = [null, null];
  for (const [entity, destination] of Object.entries(entityObj)) {
    // Read the file content and replace the text
    fileContent = fs.readFileSync(`./source/${entity}.js`, {
      encoding: "utf8",
    });
    fileContent = fileContent.replaceAll(entity, process.env.ENTITY);
    fileName =
      process.env.ENTITY + entity[0].toUpperCase() + entity.slice(1) + ".js";
    filePath = path.join(__dirname, "../", "app", destination, "/") + fileName;

    // Write file  and create an entity
    fs.writeFileSync(filePath, fileContent, {
      encoding: "utf8",
    });
  }
  console.log("Entity has heen created successfully!");
} catch (error) {
  console.error(error);
}
