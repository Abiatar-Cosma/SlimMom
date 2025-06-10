import fs from "fs";

const raw = JSON.parse(fs.readFileSync("./scripts/products.json", "utf-8"));

const cleaned = raw.map((p) => ({
  ...p,
  _id: p._id?.$oid || undefined, // extrage doar stringul din $oid
}));

fs.writeFileSync("./scripts/products.json", JSON.stringify(cleaned, null, 2));
console.log("✅ products.json curățat");
