import UserModel from "./model/User.model.js";
import connect from "./database/connect.js";
import mongoose from "mongoose";


connect();

const castUserId = (userId) => mongoose.Types.ObjectId(userId);

UserModel.aggregate([
  { $match: { _id: castUserId("63c25711c394a98148dd9673") } }
]).then(doc => console.log(doc));

