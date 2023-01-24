import UserModel from "./model/User.model.js";
import connect from "./database/connect.js";
import mongoose from "mongoose";


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

let key = "FOOD";

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


let doc = await UserModel.aggregate([
  { $match: { _id: castUserId("63c25711c394a98148dd9673") } },
  { $unwind: "$expenses" },
  { $project: { category: "$expenses.category", amount: "$expenses.amount", date: "$expenses.date" } },
  {
      $bucket: {
          groupBy: "$date",
          boundaries: [new Date('2023-01-01'), new Date('2023-02-01'), new Date('2023-03-01')],
          default: "Other",
          output: { expenses: { $push: { category: "$category", amount: "$amount" } } }
      }
  },
  { $match: { _id: { $not: { $eq: "Other" } } } },
  { $unwind: "$expenses" },
  { $group: { _id: { date: "$_id", category: "$expenses.category" }, totalAmount: { $sum: "$expenses.amount" } } },
  { $group: { _id: "$_id.date", data: { $push: { category: "$_id.category", totalAmount: "$totalAmount" } } } },
  { $project: {_id: 0, date: "$_id", data: {$arrayToObject: [[ { k: "$data.category", v: "$data.totalAmount" } ]] }}}
])


console.log(doc);