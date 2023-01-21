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

let doc = await UserModel.aggregate([
  { $match: { _id: castUserId("63c25711c394a98148dd9673") } },
  {$unwind: "$expenses"},
  {$project: {_id: "$expenses._id", category : "$expenses.category", amount: "$expenses.amount", date: "$expenses.date", description: "$expenses.description", member: "$expenses.member", isShared: "$expenses.isShared"}},
  {$sort: {date: -1}},
  {$match: {category: new RegExp(key, 'i')}}
])

console.log(doc);