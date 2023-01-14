import bcrypt from "bcrypt";
const hash = '$2b$10$eI3k7cC19p6P1dYPOo5eou6fJj0qvq7Mq1GxTUG2PKn9/DmPt4H82';
const password = "abc1234";

bcrypt.compare(password, hash)
  .then(res => {
    console.log(`res`);
    console.log(res);
  })
  .catch(err => {
    console.log(`err`);
    console.error(err.message);
  });