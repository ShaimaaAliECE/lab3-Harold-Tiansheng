const express = require("express");
const newConnect = require("./initConnect");
const conn = require("./initConnect");

const app = express();

//static content
app.use(express.static("static"));

//dynamic content

//let code read things inside body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let content = `<h1>you are not login as a admin!</h1>
  <div>please go back to home page and input right admin account or login as a guest</div>`;

  if (username == "admin" && password == "123") {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set time</title>
    </head>
    <body>
        <form name = 'setTime' action="/setTime" method="get">
            <h1>set time you want</h1>
            first option time: <input name = 'firstopTime' type = 'text'><br>
            second option time: <input name = 'secondopTime' type = 'text'><br>
            third option time: <input name = 'thirdopTime' type = 'text'><br>
            fourth option time: <input name = 'forthopTime' type = 'text'><br>
            fifth option time: <input name = 'fifthopTime' type = 'text'><br>
            sixth option time: <input name = 'sixthopTime' type = 'text'><br>
            seventh option time: <input name = 'seventhopTime' type = 'text'><br>
            eighth option time: <input name = 'eighthopTime' type = 'text'><br>
            ninth option time: <input name = 'ninthopTime' type = 'text'><br>
            tenth option time: <input name = 'tenthopTime' type = 'text'><br>
            <input type = 'submit' >
    
        </form>
        
    </body>
    </html>`;
  }
  res.send(content);
});

//to choose lastest time option later
let num = 1;

app.get("/setTime", (req, res) => {
  let newConn = conn();
  newConn.connect();
  let content = "<div>time has been successfully setted</div>";
  let t1 = req.query.firstopTime;
  let t2 = req.query.secondopTime;
  let t3 = req.query.thirdopTime;
  let t4 = req.query.forthopTime;
  let t5 = req.query.fifthopTime;
  let t6 = req.query.sixthopTime;
  let t7 = req.query.seventhopTime;
  let t8 = req.query.eighthopTime;
  let t9 = req.query.ninthopTime;
  let t10 = req.query.tenthopTime;
  num = num + 1;

  newConn.query(
    `update setTime
     set time1 = '${t1}',time2='${t2}',time3='${t3}',time4='${t4}',time5='${t5}',time6='${t6}',time7='${t7}',time8='${t8}',time9='${t9}',time10='${t10}'`,
    (err, row, fields) => {
      if (err) console.log(err);
      else console.log("time has been set");
    }
  );
  res.send(content);
  newConn.end();
});

app.get("/guestlog", (req, res) => {
  let newConn = conn();
  let content = ``;
  newConn.connect();
  newConn.query(`select * from setTime `, (err, rows, fields) => {
    //console.log(rows);
    let time = rows[0];
    content += `
    
    <form name = 'vote' action ='vote' method="get">
        <table>
            <tr>
                <td>Name</td>
                <td>${time.time1}</td>
                <td>${time.time2}</td>
                <td>${time.time3}</td>
                <td>${time.time4}</td>
                <td>${time.time5}</td>
                <td>${time.time6}</td>
                <td>${time.time7}</td>
                <td>${time.time8}</td>
                <td>${time.time9}</td>
                <td>${time.time10}</td>
            </tr>
            <tr>
            <td><input name='name'></td>
            <td><input type="checkbox" name='time1'></td>
            <td><input type="checkbox" name='time2'></td>
            <td><input type="checkbox" name='time3'></td>
            <td><input type="checkbox" name='time4'></td>
            <td><input type="checkbox" name='time5'></td>
            <td><input type="checkbox" name='time6'></td>
            <td><input type="checkbox" name='time7'></td>
            <td><input type="checkbox" name='time8'></td>
            <td><input type="checkbox" name='time9'></td>
            <td><input type="checkbox" name='time10'></td>
            <td><input type = "submit"></td>
    
            </tr>
        </table>
    </form>`;
    console.log("time correct show");
    res.send(content);
    newConn.end();
  });
});

app.get("/vote", (req, res) => {
  let newConn = conn();
  let content = ``;
  newConn.connect();
  let name = req.query.name;
  let c1 = req.query.time1;
  let c2 = req.query.time2;
  let c3 = req.query.time3;
  let c4 = req.query.time4;
  let c5 = req.query.time5;
  let c6 = req.query.time6;
  let c7 = req.query.time7;
  let c8 = req.query.time8;
  let c9 = req.query.time9;
  let c10 = req.query.time10;

  newConn.query(`select * from setTime `, (err, rows, fields) => {
    //console.log(rows);
    let time = rows[0];
    content += `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>result</title>
    </head>
    <body>
        <table>
            <tr>
                <td>Name</td>
                <td>${time.time1}</td>
                <td>${time.time2}</td>
                <td>${time.time3}</td>
                <td>${time.time4}</td>
                <td>${time.time5}</td>
                <td>${time.time6}</td>
                <td>${time.time7}</td>
                <td>${time.time8}</td>
                <td>${time.time9}</td>
                <td>${time.time10}</td>
            </tr>`;
  });

  newConn.query(
    `insert into chooseTime
     values ('${name}','${c1}','${c2}','${c3}','${c4}','${c5}','${c6}','${c7}','${c8}','${c9}','${c10}')
  `,
    (err, rows, fields) => {
      if (err) console.log(err);
      console.log("new user added");
    }
  );

  newConn.query(`select * from chooseTime`, (err, rows, fields) => {
    for (cont of rows) {
      //console.log(cont.timechoice1);
      content += `        
      <tr>
      <td><input name='name' value="${cont.Name}"></td>
      <td><input type="text" value ='${
        cont.timechoice1 === "on" ? "yes" : ""
      } '></td>
      <td><input type="text" value ='${
        cont.timechoice2 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice3 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice4 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice5 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice6 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice7 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice8 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice9 === "on" ? "yes" : ""
      }'></td>
      <td><input type="text" value ='${
        cont.timechoice10 === "on" ? "yes" : ""
      }'></td>
      </tr>
  `;
    }
    content += `    
    </table>
  
    </body>
    </html>`;
    res.send(content);
    newConn.end();
  });
});

app.listen(80);
