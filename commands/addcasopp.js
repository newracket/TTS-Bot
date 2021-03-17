const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('reminders.db');

module.exports = {
  name: "addcasopp",
  description: "Adds cas role opportunity to list",
  aliases: ["aco"],
  execute(message, args, client) {
    db.serialize(() => {
      let casroleopp = args.join(" ");
      let daysLimit = 0;
      if (!isNaN(parseInt(args[0]))) {
        daysLimit = parseInt(args[0]);
        casroleopp = args.slice(1).join(" ");
      }
      else if (!isNaN(parseInt(args.slice(-1)))) {
        daysLimit = parseInt(args.slice(-1));
        casroleopp = args.slice(0, -1).join(" ");
      }

      db.run(`CREATE TABLE IF NOT EXISTS casroleopps (
        id int,
        casroleopp TEXT,
        daysLimit TEXT
      );`, err => {
        if (err) {
          message.channel.send(`Error when creating databse. ${err}`);
        }
      });

      db.all(`SELECT * FROM casroleopps ORDER BY id DESC LIMIT 1`, [], (err, rows) => {
        if (err) {
          message.channel.send(`Error when selecting reminders from database. ${err}`);
          return;
        }

        if (rows.length == 0) {
          rows.push({ id: 0 });
        }

        db.run(`INSERT INTO casroleopps (id, casroleopp, daysLimit) VALUES (${rows[0].id + 1}, "${casroleopp}", "${daysLimit}")`, err => {
          if (err) {
            message.channel.send(`Error when adding reminder to database. ${err}`);
            return;
          }

          message.channel.send(`Cas role opportunity added: ${casroleopp} with a limit of ${daysLimit != 0 ? daysLimit : "infinite"} days`);
        });
      });
    });
  }
}