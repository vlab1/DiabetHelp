let fs = require("fs");

function randomNumberFromInterval(min, max) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(1));
}

function generateData() {
  setInterval(() => {
    let obj = {
      glucose: randomNumberFromInterval(4, 9),
      time: new Date(Date.now()),
    };
    fs.writeFile("data.json", JSON.stringify(obj), function (err) {
      if (err) throw err;
      console.log("success");
    });
  }, 10 * 60 * 1000);
}

generateData();
