import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
const docId = "646c89ce68af3441daf8d845";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("employeeInfo");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    // const i = req.body.indx;
    // const j = req.body.indx2;
    // let fname = req.body.department1[i].employees[j].firstName;
    // let lname = req.body.department1[i].employees[j].lastName;
    // let collection = await db.collection("employeeInfo");
    // let result = await collection.updateOne({ name: "Biz4", "department1.departmentName": "UI" },
    //     { $push: { "department1.$.employees": { firstName: fname, lastName: lname } } });
    // res.send(result).status(204);


    let jsonData = req.body;
    // delete jsonData["indx"];
    // delete jsonData["indx2"];
    let collection = await db.collection("employeeInfo");
    // let result2 = await collection.updateOne(
    //     { name: 'Biz4' },
    //     {
    //         $push: {
    //             department1: {
    //                 departmentName: jsonData.department1.departmentName,
    //                 employees: [{ firstName: jsonData.department1.employees.firstName, lastName: jsonData.department1.employees.lastName }]
    //             }
    //         }
    //     }
    // )
    let result = await collection.updateOne({ name: "Biz4" }, { $set: jsonData });
    console.log(result);
    res.send(result).status(204);

});
export default router;


// db.collection.updateOne(
//     { name: 'Biz4' },
//     {
//         $push: {
//             department1: {
//                 departmentName: 'New Department',
//                 employees: []
//             }
//         }
//     }
// )



// mongodb query to push new array to department1 array
// {
//     name: 'Biz4',
//         department1: [
//             { departmentName: 'UI', employees: [Array] },
//             { departmentName: '', employees: [Array] }
//         ]
// }