import UserModel from '../model/User.model.js';
import mongoose from 'mongoose';

export async function addMember(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const { membername, membericon } = req.body;

            UserModel.updateOne({ _id: userId },
                { $push: { members: { membername, membericon } } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Member is added!' });
                });

            // await UserModel.updateOne({id: userId}, 
            //     {$push: { members: { membername, membericon }}},
            //     {runValidators: true});
            // return res.status(201).send({msg: 'The Member is added!'});
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function deleteMember(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {

            const { memberid } = req.body;

            UserModel.updateOne({ _id: userId },
                { $pull: { members: { _id: memberid } } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Member is deleted!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function editMember(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {

            const { memberid, membername, membericon } = req.body;

            UserModel.updateOne({
                _id: userId,
                members: { $elemMatch: { _id: memberid } }
            }, // _id instead of memberid here (this is how mongodb create id)
                { $set: { "members.$.membername": membername, "members.$.membericon": membericon } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Member is updated!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function addExpense(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const expense = req.body;

            UserModel.updateOne({ _id: userId },
                { $push: { expenses: expense } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Expense is added!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function deleteExpense(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {

            const { expenseid } = req.body;

            UserModel.updateOne({ _id: userId },
                { $pull: { expenses: { _id: expenseid } } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Expense is deleted!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function editExpense(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {

            const { expenseid, category, amount, date, description, member, isShared } = req.body;

            UserModel.updateOne({
                _id: userId,
                expenses: { $elemMatch: { _id: expenseid } }
            }, // _id instead of expenseid here (this is how mongodb create id)
                {
                    $set: {
                        "expenses.$.category": category,
                        "expenses.$.amount": amount,
                        "expenses.$.date": date,
                        "expenses.$.description": description,
                        "expenses.$.member": member,
                        "expenses.$.isShared": isShared,
                    }
                },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'The Expense is updated!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function sharedExpenses(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            UserModel.updateOne({ _id: userId }, { $set: { "expenses.$[].isShared": true } },
                { runValidators: true },
                (error, data) => {
                    if (error) return res.status(401).send({ error: error.message });
                    return res.status(201).send({ msg: 'All Expenses are shared!' });
                });
        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(401).send({ error: error.message });
    }
}

export async function getUserDetail(req, res) {
    try {
        const { userId } = req.user;

        if (userId) {
            // To return a user with sorted array of member, we can use aggregate here
            // Expenses need to be retrieved from another function
            const castedUserId = mongoose.Types.ObjectId(userId);

            UserModel.aggregate([
                { $match: { _id: castedUserId } },
                { $unwind: "$members" },
                { $sort: { "members.membername": 1 } },
                { $group: { _id: '$_id', members: { $push: '$members' }, email: { $first: '$email' }, icon: { $first: '$icon' }, groupname: { $first: '$groupname' }, expenses: { $first: '$expenses' }}}
            ])
                .then(doc => {
                    if (doc.length < 1) {
                        res.status(501).send({ error: "Cannot Find the user" });
                    }
                    else {
                        // only 1 object would be returned in the array i.e. doc[0]
                        // remove password from user
                        const { password, ...rest } = doc[0];
                        res.status(201).send(rest);
                    }
                })
                .catch(error => {
                    res.status(501).send({ error: error.message });
                });
            
            // Simple version
            // UserModel.findOne({ _id: userId }, (error, user) => {
            //     if (error) return res.status(501).send({ error: error.message });
            //     if (!user) return res.status(501).send({ error: "Cannot Find the user" });

            //     // remove password from user
            //     // mongoose return unnessary data with object so we need convert it into json
            //     const { password, ...rest } = Object.assign({}, user.toJSON());

            //     return res.status(201).send(rest);
            // });

        }
        else {
            return res.status(401).send({ error: 'User not found!' });
        }
    }
    catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }
}