const Expense = require('../models/expenses');

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
}

const getexpenses = (req, res)=> {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        return res.status(402).json({ error: err, success: false})
    })
}
exports.downloadExpense = async (req, res, next) => {

    console.log("Inside download Expenses");

    try {

        const expenses = await req.user.getExpenses();
        console.log('expenses in downloadExpenses>>> ', expenses);
        const stringifiedExpenses = JSON.stringify(expenses);

        const fileName = `Expense-${req.user.id}-${new Date()}.txt`;

        const fileUrl = await uploadToS3(stringifiedExpenses, fileName);

        console.log("file URL >>> ", fileUrl);

        await req.user.createExpensefile({
            url: fileUrl,
            name: fileName,
        });

        res.status(200).json({ success: true, url: fileUrl });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}


const uploadToS3 = (data, name) => {
    console.log('inside upload to S3 >>>> ')

    const s3 = new AWS.S3({
        accessKeyId: process.env.IAM_USERID,
        secretAccessKey: process.env.IAM_SECRET_KEY,
    });

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: name,
        Body: data,
        ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Location);
        });
    });

}
module.exports = {
    getexpenses,
    addexpense,
   
}
