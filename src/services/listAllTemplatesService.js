import fs from "fs";

const templates = JSON.parse(fs.readFileSync("./src/templates.json", "utf8"));

function listAllTemplatesService({ pageSize = 100, pageNumber = 1 }) {
  if (!templates || templates.length === 0)
    throw new Error("Error getting templates");
  console.log(templates);

  const totalRecords = templates.length;

  const totalPages = Math.round(Math.max(totalRecords / pageSize, 1));

  const startPageAt = (pageNumber - 1) * pageSize;
  const endPageAt = pageNumber * pageSize;

  const result = templates.slice(startPageAt, endPageAt);

  return {
    templates: result,
    pagination: {
      pageSize: Number(pageSize),
      pageNumber: Number(pageNumber),
      totalPages,
      totalRecords,
    },
  };
}

export { listAllTemplatesService };
