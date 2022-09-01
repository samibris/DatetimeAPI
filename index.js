const express = require('express');
const app = express();

app.use(express.json());

app.post("/datetime", (req, res) => {
    // Read datetime 1
    const jdate1 = req.body.date1;
    const jtime1 = req.body.time1;
    const jzone1 = req.body.zone1;
    // Read datetime2
    const jdate2 = req.body.date2;
    const jtime2 = req.body.time2;
    const jzone2 = req.body.zone2;
    // Read operation to do
    const joption = req.body.option;

    switch(joption){
        // Find out number of days
        case '1':
            fn_Days();
            break;       
        // Find out number of weekdays
        case '2':
            fn_Weekdays();
            break;
        // Find out number of complete weeks
        case '3':
            fn_CmpWeeks();
            break;
        // return error message
        default:
            res.json({ message: 'Error - Invalid option'});
    }
    
});

app.listen(3000, () => console.log ("API Server is running..."));