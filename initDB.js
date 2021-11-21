const conn = require("./initConnect");

const connect = conn();

connect.connect();

connect.query(
  `DROP TABLE setTime`,

  (err, row, field) => {
    if (err) console.log(err);
    else console.log("setTime table dropped");
  }
);

connect.query(
  `Drop table chooseTime`,

  (err, row, field) => {
    if (err) console.log(err);
    else console.log("chooseTime table dropped");
  }
);

connect.query(
  `
  CREATE TABLE setTime(
    time1 varchar(20),
    time2 varchar(20),
    time3 varchar(20),
    time4 varchar(20),
    time5 varchar(20),
    time6 varchar(20),
    time7 varchar(20),
    time8 varchar(20),
    time9 varchar(20),
    time10 varchar(20)

    )
  `,
  (err, row, field) => {
    if (err) console.log(err);
    else console.log(" settime table created");
  }
);

connect.query(
  `
    CREATE TABLE chooseTime(
      Name varchar(20),
      timechoice1 varchar(20),
      timechoice2 varchar(20),
      timechoice3 varchar(20),
      timechoice4 varchar(20),
      timechoice5 varchar(20),
      timechoice6 varchar(20),
      timechoice7 varchar(20),
      timechoice8 varchar(20),
      timechoice9 varchar(20),
      timechoice10 varchar(20)
  
      )
    `,
  (err, row, field) => {
    if (err) console.log(err);
    else console.log(" settime table created");
  }
);

//defualt value of 10 options
connect.query(
  `
        insert into setTime
        values ('8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18') 

`,
  (err, row, field) => {
    if (err) console.log(err);
    else console.log(" default time timetable has been initialized");
  }
);
connect.end();
