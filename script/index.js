import * as fs from "fs";
import fetch from "node-fetch";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGM5MDY4NDVlNjNhMjA4OWI2NjQyZiIsImlhdCI6MTY3MTQ3MTQ1OSwiZXhwIjoxNjcxNTU3ODU5fQ.x3r2b-QJEAKR1gmWmSb-oSlklbIVlu46J9--z-aP8_g";
let data = fs.readFileSync(`./data.json`);
data = JSON.parse(data);
let record = data.record;
let menu = data.menu;
let food_menu = data.food_menu;
let account_food = data.account_food;
let account = data.account;
let food = data.food;

// Promise.all(
//   account.map(async (account) => {
//     await fetch("http://localhost:5000/api/account/admin/create", {
//       method: "POST",
//       body: JSON.stringify(account),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   })
// );

// Promise.all(
//   food.map(async (food) => {
//     await fetch("http://localhost:5000/api/food/create", {
//       method: "POST",
//       body: JSON.stringify(food),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   })
// );

let accountFetch = await fetch("http://localhost:5000/api/account/admin/find", {
  method: "GET",
  body: null,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
accountFetch = await accountFetch.json();
account.map(async (acc, index) => {
  const data = accountFetch.data;
  account[index]._id = data.filter(
    (item) => item.email === account[index].email
  )[0]._id;
});

account = account.filter((item) => item.email !== "admin@gmail.com");

// Promise.all(
//   account.map(async (acc, index) => {
//     const response = await fetch("http://localhost:5000/api/account/login", {
//         method: "POST",
//         body: JSON.stringify({ email: acc.email, password: acc.password }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const acctoken = await response.json();
//       account[index].token = acctoken.data;
//     account_food.map(async (acc_food) => {
//       await fetch("http://localhost:5000/api/account-food/create", {
//         method: "POST",
//         body: JSON.stringify(acc_food),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${acc.token}`,
//         },
//       });
//     });
//   })
// );

// Promise.all(
//   account.map(async (acc, index) => {
//     const response = await fetch("http://localhost:5000/api/account/login", {
//       method: "POST",
//       body: JSON.stringify({ email: acc.email, password: acc.password }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const acctoken = await response.json();
//     account[index].token = acctoken.data;
//     menu.map(async (item, index) => {
//       await fetch("http://localhost:5000/api/menu/create", {
//         method: "POST",
//         body: JSON.stringify(item),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${acc.token}`,
//         },
//       });
//     });
//   })
// );

// Promise.all(
//   account.map(async (acc, index) => {
//     const responseToken = await fetch(
//       "http://localhost:5000/api/account/login",
//       {
//         method: "POST",
//         body: JSON.stringify({ email: acc.email, password: acc.password }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const acctoken = await responseToken.json();
//     account[index].token = acctoken.data;

//     const responseMenu = await fetch("http://localhost:5000/api/menu", {
//       method: "GET",
//       body: null,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${acctoken.data}`,
//       },
//     });
//     const json = await responseMenu.json();
//     const menuData = json.data;

//     const responseFood = await fetch("http://localhost:5000/api/food", {
//       method: "GET",
//       body: null,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${acctoken.data}`,
//       },
//     });
//     const jsonFood = await responseFood.json();
//     const foodData = jsonFood.data;
//     menuData.map(async (accountmenu) => {
//       food_menu.map(async (item, index) => {
//         if (index === 0) {
//           item.menu_id = accountmenu._id;
//           const ind = Math.floor(Math.random() * 20);
//           item.food_id = foodData[ind]._id;
//           await fetch("http://localhost:5000/api/food-menu/create", {
//             method: "POST",
//             body: JSON.stringify(item),
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${acctoken.data}`,
//             },
//           });
//         }
//       });
//     });
//   })
// );




function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
for (let i = 0; i < 5; i++) {
  Promise.all(
    account.map(async (acc, index) => {
      const response = await fetch("http://localhost:5000/api/account/login", {
        method: "POST",
        body: JSON.stringify({ email: acc.email, password: acc.password }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const acctoken = await response.json();
      account[index].token = acctoken.data;
      record.map(async (item, index) => {
          item.glucose = (Math.random() * (9 - 4 + 1) + 4).toFixed(1);
          item.date = randomDate(new Date(2022, 0, 1), new Date());
          item.weight = (Math.random() * (120 - 80 + 1) + 80).toFixed(1);
        await fetch("http://localhost:5000/api/record/create", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${acctoken.data}`,
          },
        });
      });
    })
  );
}
