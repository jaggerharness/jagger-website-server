var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE anime_quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            character text, 
            quote text,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`,
      (err) => {
        if (err) {
          // Table already created
          console.error(err.message);
        } else {
          // Table created
          console.log("Table created");
        }
      }
    );
  }
});

module.exports = db;
