const fs = require("fs");
const path = require("path");

const DATA_DIR = process.env.LOCAL_DATA_DIR
  ? path.resolve(process.env.LOCAL_DATA_DIR)
  : path.join(__dirname, "..", "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Append one JSON record to a local JSONL file as a durable fallback
 * when Google Sheets is unavailable.
 */
function appendLocal(collection, record) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${collection}.jsonl`);
  const line = JSON.stringify({
    savedAt: new Date().toISOString(),
    ...record,
  });
  fs.appendFileSync(filePath, line + "\n", "utf8");
  return filePath;
}

module.exports = { appendLocal, DATA_DIR };
