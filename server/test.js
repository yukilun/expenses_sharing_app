import UserModel from "./model/User.model.js";
import connect from "./database/connect.js";
import mongoose from "mongoose";
import { config } from 'dotenv';

config();
connect();

const castUserId = (userId) => mongoose.Types.ObjectId(userId);

// UserModel.aggregate([
//   { $match: { _id: castUserId("63c25711c394a98148dd9673") } }
// ]).then(doc => console.log(doc));

// let doc = await UserModel.aggregate()
//             .match({ _id: castUserId("63c25711c394a98148dd9673")})
//             .unwind("$expenses")
//             .project({_id: "$expenses._id", category : "$expenses.category", amount: "$expenses.amount", date: "$expenses.date", description: "$expenses.description", member: "$expenses.member", isShared: "$expenses.isShared"})
//             .sort({date: 1})
//             .exec();

// console.log(doc);

// let key = "FOOD";

// let doc = await UserModel.aggregate([
//   { $match: { _id: castUserId("63c25711c394a98148dd9673") } },
//   {$unwind: "$expenses"},
  // {$project: {_id: "$expenses._id", category : "$expenses.category", amount: "$expenses.amount", date: "$expenses.date", description: "$expenses.description", member: "$expenses.member", isShared: "$expenses.isShared"}},
//   {$sort: {date: -1}},
//   {$match: {category: new RegExp(key, 'i')}}
// ])

// let doc = await UserModel.aggregate([
//   { $match: { _id: castUserId("63c25711c394a98148dd9673") } },
//   { $unwind: {path: "$expenses", preserveNullAndEmptyArrays: true}},
//   {$project: {_id: "$expenses._id", category : "$expenses.category", amount: "$expenses.amount", date: "$expenses.date"}},
//   {$match: {date: {$gte: new Date('2023-01-01'), $lt: new Date('2023-02-01')}}},
//   {$group: {_id: "$category", totalAmount : {$sum: "$amount"}}}
// ])


// let doc = await UserModel.aggregate([
//   { $match: { _id: castUserId("63c25711c394a98148dd9673") } },
//   { $unwind: "$expenses" },
//   { $project: { category: "$expenses.category", amount: "$expenses.amount", date: "$expenses.date" } },
//   {
//       $bucket: {
//           groupBy: "$date",
//           boundaries: [new Date('2023-01-01'), new Date('2023-02-01'), new Date('2023-03-01')],
//           default: "Other",
//           output: { expenses: { $push: { category: "$category", amount: "$amount" } } }
//       }
//   },
//   { $match: { _id: { $not: { $eq: "Other" } } } },
//   { $unwind: "$expenses" },
//   { $group: { _id: { date: "$_id", category: "$expenses.category" }, totalAmount: { $sum: "$expenses.amount" } } },
//   { $group: { _id: "$_id.date", data: { $push: { category: "$_id.category", totalAmount: "$totalAmount" } } } },
//   { $project: {_id: 0, date: "$_id", data: {$arrayToObject: [[ { k: "$data.category", v: "$data.totalAmount" } ]] }}}
// ])

let doc = await UserModel.aggregate([
  { $match: { username: "abc123" } },
  { $unwind: { path: "$expenses", preserveNullAndEmptyArrays: true } },
  { $project: {_id: "$expenses.member", unsharedAmount: {$cond: { if: { $eq: [ "$expenses.isShared", false ] }, then: "$expenses.amount", else: 0 }}}},
  { $group: { _id: "$_id", totalPaid: { $sum: '$unsharedAmount' } } },
]);

console.log(doc);
// let totalExpenses = 0;
// // await Promise.all(doc.map(async (obj) => {
// //   totalExpenses += obj.totalPaid;
// // }));
// doc.map((obj) => {
//   totalExpenses += obj.totalPaid;
// });
const totalExpenses = doc.reduce((prev, current) => prev += current.totalPaid, 0);
console.log(totalExpenses);

// let doc = await UserModel.aggregate([
//   { $match: { username: "cde123" } },
//   { $unwind: { path: "$expenses", preserveNullAndEmptyArrays: true } },
//   { $project: {_id: "$expenses.member", unsharedAmount: {$cond: { if: { $eq: [ "$expenses.isShared", false ] }, then: "$expenses.amount", else: 0 }}}},
//   { $group: { _id: null, totalExpenses: { $sum: '$unsharedAmount' } } },
// ]);



// let expenses =[
//   {
//     "category": "Grocery",
//     "amount": 3,

//       "date": "2022-08-10T00:00:00Z"
// ,
//     "description": "vegetable",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 14,

//       "date": "2022-08-07T00:00:00Z"
// ,
//     "description": "fruit",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 7.25,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "藍莓檸檬",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 8.3,

//       "date": "2022-08-19T00:00:00Z"
// ,
//     "description": "煎餅",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Transportation",
//     "amount": 12.74,

//       "date": "2022-08-27T00:00:00Z"
// ,
//     "description": "bbq vegetable ",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Food",
//     "amount": 20,

//       "date": "2022-08-27T00:00:00Z"
// ,
//     "description": "明家",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Food",
//     "amount": 41,

//       "date": "2022-08-27T00:00:00Z"
// ,
//     "description": "明家",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 12.4,

//       "date": "2022-08-28T00:00:00Z"
// ,
//     "description": "排骨",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 2.7,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 6.5,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 25.96,

//       "date": "2022-08-19T00:00:00Z"
// ,
//     "description": "Medicine,hair",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 13.82,

//       "date": "2022-08-18T00:00:00Z"
// ,
//     "description": "Walmart",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 360,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Bed Credit",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 612,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Matress",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 678,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "IKEA",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 78,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Capsule",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 26,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Copy Keys",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 9,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Oomomo",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 14,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Dollarama",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 55.79,

//       "date": "2022-08-26T00:00:00Z"
// ,
//     "description": "Costco",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 56,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Dolly",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 48.38,

//       "date": "2022-08-02T00:00:00Z"
// ,
//     "description": "bb and b",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 3650,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "Rent",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 299.99,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "Key Deposit",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 1400,

//       "date": "2022-08-15T00:00:00Z"
// ,
//     "description": "Rent Deposit",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 1280,

//       "date": "2022-08-01T00:00:00Z"
// ,
//     "description": "Sofa",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 364.04,

//       "date": "2022-08-29T00:00:00Z"
// ,
//     "description": "Credit card ",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 364.04,

//       "date": "2022-08-28T00:00:00Z"
// ,
//     "description": "Credit Card",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 6.5,

//       "date": "2022-09-07T00:00:00Z"
// ,
//     "description": "菜",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 2.4,

//       "date": "2022-09-09T00:00:00Z"
// ,
//     "description": "cm 買菜",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 17.8,

//       "date": "2022-09-09T00:00:00Z"
// ,
//     "description": "生果",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 5.3,

//       "date": "2022-09-15T00:00:00Z"
// ,
//     "description": "雞髀1lb",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 713.15,

//       "date": "2022-09-15T00:00:00Z"
// ,
//     "description": "Credit Card",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 11.9,

//       "date": "2022-09-22T00:00:00Z"
// ,
//     "description": "排骨",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 3.75,

//       "date": "2022-09-22T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 7.8,

//       "date": "2022-09-22T00:00:00Z"
// ,
//     "description": "Crystal Mall",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 2.8,

//       "date": "2022-09-06T00:00:00Z"
// ,
//     "description": "Dollarama",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 2800,

//       "date": "2022-10-01T00:00:00Z"
// ,
//     "description": "Rent",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 12.25,

//       "date": "2022-10-07T00:00:00Z"
// ,
//     "description": "牛仔腩",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 1100.78,

//       "date": "2022-10-07T00:00:00Z"
// ,
//     "description": "06Oct2022 creditcard",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 125.65,

//       "date": "2022-10-07T00:00:00Z"
// ,
//     "description": "Costco",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Utilities",
//     "amount": 46.25,

//       "date": "2022-10-07T00:00:00Z"
// ,
//     "description": "Internet",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 2.75,

//       "date": "2022-10-12T00:00:00Z"
// ,
//     "description": "通菜",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 12.5,

//       "date": "2022-10-12T00:00:00Z"
// ,
//     "description": "雞翼",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 1.5,

//       "date": "2022-10-14T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 307.33,

//       "date": "2022-10-14T00:00:00Z"
// ,
//     "description": "Credit Card",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 2,

//       "date": "2022-10-07T00:00:00Z"
// ,
//     "description": "lemon",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 13.41,

//       "date": "2022-10-14T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 270,

//       "date": "2022-10-24T00:00:00Z"
// ,
//     "description": "Nespresso ",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 40,

//       "date": "2022-10-24T00:00:00Z"
// ,
//     "description": "Granville ham",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 28.04,

//       "date": "2022-10-24T00:00:00Z"
// ,
//     "description": "(Oct)Superstore,T&T, PriceSmart ",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 12.13,

//       "date": "2022-10-25T00:00:00Z"
// ,
//     "description": "麗晶,dinner",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 7.85,

//       "date": "2022-10-27T00:00:00Z"
// ,
//     "description": "排骨",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 2.75,

//       "date": "2022-10-27T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 19.34,

//       "date": "2022-10-15T00:00:00Z"
// ,
//     "description": "Walmart",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 16.89,

//       "date": "2022-10-22T00:00:00Z"
// ,
//     "description": "22oct superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 2500,

//       "date": "2022-10-29T00:00:00Z"
// ,
//     "description": "Rent",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 300,

//       "date": "2022-10-29T00:00:00Z"
// ,
//     "description": "Rent",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 4.8,

//       "date": "2022-10-29T00:00:00Z"
// ,
//     "description": "Crystal mall",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Utilities",
//     "amount": 56,

//       "date": "2022-11-05T00:00:00Z"
// ,
//     "description": "Internet 27Oct",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 5.25,

//       "date": "2022-11-07T00:00:00Z"
// ,
//     "description": "Crystal mall vege ",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 1,

//       "date": "2022-11-06T00:00:00Z"
// ,
//     "description": "Lemon",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 13,

//       "date": "2022-11-10T00:00:00Z"
// ,
//     "description": "Grocery",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 295.83,

//       "date": "2022-11-15T00:00:00Z"
// ,
//     "description": "card payment",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 12.57,

//       "date": "2022-10-28T00:00:00Z"
// ,
//     "description": "28 Oct superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 41.53,

//       "date": "2022-11-07T00:00:00Z"
// ,
//     "description": "T&T 7 Nov ",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 10.38,

//       "date": "2022-11-08T00:00:00Z"
// ,
//     "description": "8Nov superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 201.83,

//       "date": "2022-11-15T00:00:00Z"
// ,
//     "description": "15Nov Costco",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 7.39,

//       "date": "2022-11-17T00:00:00Z"
// ,
//     "description": "17Nov T&T Egg",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 6.08,

//       "date": "2022-11-17T00:00:00Z"
// ,
//     "description": "17Nov Walmart Milk",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 8.3,

//       "date": "2022-11-18T00:00:00Z"
// ,
//     "description": "18Nov Superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 11.76,

//       "date": "2022-11-24T00:00:00Z"
// ,
//     "description": "24Nov T&T milk&oat",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": true,

//   },
//   {
//     "category": "Grocery",
//     "amount": 42.4,

//       "date": "2022-12-05T00:00:00Z"
// ,
//     "description": "買餸",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Others",
//     "amount": 1567.78,

//       "date": "2022-12-05T00:00:00Z"
// ,
//     "description": "Credit card (from oct to dec)",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 2800,

//       "date": "2022-12-05T00:00:00Z"
// ,
//     "description": "rent cash",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": true,

//   },
//   {
//     "category": "Utilities",
//     "amount": 56,

//       "date": "2022-12-05T00:00:00Z"
// ,
//     "description": "Internet (28 Nov)",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": true,

//   },
//   {
//     "category": "Housing",
//     "amount": 1800,

//       "date": "2022-12-31T00:00:00Z"
// ,
//     "description": "Rent ",
//     "member": "63d12bdd5ee478cd34a461d0",
//     "isShared": false,

//   },
//   {
//     "category": "Housing",
//     "amount": 1000,

//       "date": "2022-12-31T00:00:00Z"
// ,
//     "description": "Rent",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 90,

//       "date": "2022-12-30T00:00:00Z"
// ,
//     "description": "羊雞牛",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 9.85,

//       "date": "2023-01-06T00:00:00Z"
// ,
//     "description": "Crystal Mall五花肉",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Others",
//     "amount": 1.7,

//       "date": "2023-01-06T00:00:00Z"
// ,
//     "description": "Dollarama ",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 5.75,

//       "date": "2023-01-06T00:00:00Z"
// ,
//     "description": "Crystal M-豆芽韭菜檸檬",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Food",
//     "amount": 7,

//       "date": "2023-01-06T00:00:00Z"
// ,
//     "description": "Crystal M-豆花芝麻糊",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Food",
//     "amount": 6.5,

//       "date": "2023-01-06T00:00:00Z"
// ,
//     "description": "Crystal M-腸粉",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 20.2,

//       "date": "2022-12-07T00:00:00Z"
// ,
//     "description": "Superstore 7/dec",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 3.5,

//       "date": "2022-12-09T00:00:00Z"
// ,
//     "description": "Cream cheese",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 224.38,

//       "date": "2022-12-16T00:00:00Z"
// ,
//     "description": "Costco",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 54.28,

//       "date": "2022-12-24T00:00:00Z"
// ,
//     "description": "Superstore: Christmas dinner",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 38.37,

//       "date": "2023-01-05T00:00:00Z"
// ,
//     "description": "Superstore",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 82.05,

//       "date": "2023-01-12T00:00:00Z"
// ,
//     "description": "T&T NewYear Shopping",
//     "member": "63d12c6c5ee478cd34a461dd",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 5,

//       "date": "2023-01-19T00:00:00Z"
// ,
//     "description": "蝦米",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 28.85,

//       "date": "2023-01-19T00:00:00Z"
// ,
//     "description": "腸肉",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": false,

//   },
//   {
//     "category": "Grocery",
//     "amount": 9.05,

//       "date": "2023-01-20T00:00:00Z"
// ,
//     "description": "翠肉瓜豬",
//     "member": "63d12bb35ee478cd34a461cb",
//     "isShared": false,

//   }
// ];

// expenses.forEach((expense)=> {
//   UserModel.updateOne({ username: 'heehee' },
//     { $push: { expenses: expense } },
//     { runValidators: true },
//     (error, data) => {
//         if (error) return console.log(error);
//     });
// });

