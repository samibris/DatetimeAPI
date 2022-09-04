const express = require('express');
const moment = require('moment-timezone');
var momentDurationFormat = require("moment-duration-format");
var momentBusinessDays = require('moment-business-days');

const app = express();

app.use(express.json());

app.post("/datetime", (req, res) => {
    // Read datetime 1
    const jdatetime1 = req.body.datetime1;
    const jzone1 = req.body.zone1;
    // Read datetime2
    const jdatetime2 = req.body.datetime2;
    const jzone2 = req.body.zone2;
    // Read operation to do
    const joption = req.body.option;

    switch(joption){
        // Find out number of days
        case '1':
            //fn_Days();
            //var a = moment.tz("2013-11-17T01:55:10", "America/Bogota");
            /*var b = moment.tz("2013-11-17T23:55:30", "Australia/Adelaide");
            console.log(a);
            console.log(b);
            console.log(a.diff(b, 'days'));
            var duration = moment.duration(b.diff(a));
            var t3 = duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
            console.log(t3);
            console.log(duration.hours());
            console.log(duration.minutes());
            console.log(duration.seconds());*/
            var datezone1 = moment.tz(jdatetime1, jzone1);
            var datezone2 = moment.tz(jdatetime2, jzone2);
            console.log(datezone1);
            console.log(datezone2);
            if(datezone1 > datezone2){
                tmp = datezone1;
                datezone1 = datezone2;
                datezone2 = tmp;
            }

            resDays= datezone2.diff(datezone1, 'days', true);
            resWeekDays = datezone2.businessDiff(datezone1);
            resCmpWeeks= datezone2.diff(datezone1, 'weeks', true);
            //var duration = moment.duration(datezone2.diff(datezone1));
            resSec= datezone2.diff(datezone1, 'seconds', true);
            resMin= datezone2.diff(datezone1, 'minutes', true);
            resHrs= datezone2.diff(datezone1, 'hours', true);
            resYears= datezone2.diff(datezone1, 'years', true);
            console.log("IS LOWER");  
                  
                
           /* }else{
                resDays= datezone1.diff(datezone2, 'days', true);
                resWeekDays = datezone1.businessDiff(datezone2);
                resCmpWeeks= datezone1.diff(datezone2, 'weeks', true);
                //var duration = moment.duration(datezone1.diff(datezone2));
                resSec= datezone1.diff(datezone2, 'seconds', true);
                resMin= datezone1.diff(datezone2, 'minutes', true);
                resHrs= datezone1.diff(datezone2, 'hours', true);
                resYears= datezone1.diff(datezone2, 'years', true);
                console.log("IS GREATER");    */  
           
            //resDays= datezone1.diff(datezone2, 'days');
            console.log("days: " + resDays);  
            console.log("Week days: " + resWeekDays); 
            console.log("Complete weeks: " + resCmpWeeks);      
           // var t3 = duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
           // console.log(t3);   
            console.log("seconds: " + resSec);
            console.log("minutes: " + resMin);
            console.log("hours: " + resHrs);
            console.log("years: " + resYears);
            //console.log(duration);

            break;       
        // Find out number of weekdays
        case '2':
            //fn_Weekdays();
            break;
        // Find out number of complete weeks
        case '3':
            //fn_CmpWeeks();
            break;
        // return error message
        default:
            res.json({ message: 'Error - Invalid option'});
    }
    
});

app.listen(3000, () => console.log ("API Server is running..."));