/*
INDEX.JS
@AUTHOR: Sandra Bonilla <samibris@gmail.com>
@VERSION: 1.0
*/ 

const express = require('express');
const moment = require('moment-timezone');
var momentBusinessDays = require('moment-business-days');
const { validate } = require('jsonschema');
const dtSchema = require('./dtSchema.json');

const app = express();

app.use(express.json());

app.post("/datetime", (req, res) => {
    const resValidate = validate(req.body, dtSchema);

  // validate if the input data match with the schema
  if (!resValidate.valid) {

    // pass validation errors from the key stack
    var msgerror = resValidate.errors.map(error => error.stack);

    // return JSON with error messages
    return res.status(500).json({ 
        result: msgerror
    });

  }

    const resValData = [];
    // Read input data
    const jdatetime1 = req.body.datetime1;
    const jzone1 = req.body.zone1;
    const jdatetime2 = req.body.datetime2;
    const jzone2 = req.body.zone2;
    const joption = req.body.option;
    
    // Validate input data
    if (!moment(jdatetime1, 'YYYY-MM-DD[T]HH:mm:ss', true).isValid()){ 
        resValData.push('datetime1 invalid.');
    }
    if (!moment(jdatetime2, 'YYYY-MM-DD[T]HH:mm:ss', true).isValid()){ 
        resValData.push('datetime2 invalid.');
    }
    if (!moment.tz.zone(jzone1)){
        resValData.push('zone1 invalid.');
    }
    if (!moment.tz.zone(jzone2)){
        resValData.push('zone2 invalid.');
    }

    // return JSON with error messages
    if (resValData.length>0){
        return res.status(400).json({ 
            result: resValData
        });
    }   

    // Calculate values if input data is ok
        var result = '';
        // Convert to provided time zone
        var datezone1 = moment.tz(jdatetime1, jzone1);
        var datezone2 = moment.tz(jdatetime2, jzone2);

        // to avoid negative results, datezone1 is the earliest date
        if(datezone1 > datezone2){
            tmp = datezone1;
            datezone1 = datezone2;
            datezone2 = tmp;
        }
        console.log(datezone1);
        console.log(datezone2);

        // calculate number of days
        resDays= datezone2.diff(datezone1, 'days');

        // calculate number of weekdays (no saturdays or sundays)
        resWeekDays = datezone2.businessDiff(datezone1);

        // calculate complete weeks (from Monday to Monday)
        var resCmpWeeks = 0;
        if (resDays >= 7){
            var daydate1 = datezone1.day();
            var daydate2 = datezone2.day();
            var startMonday = datezone1.clone();
            var endMonday = datezone2.clone();
        
            //if day of earliest date is not Monday
            if (daydate1 != 1){
                if (daydate1 == 0){ //day() returns 0 for Sunday
                    daydate1 = 7;
                }
                //calculate next monday of the earliest date
                addDay = 8 - daydate1;
                startMonday = startMonday.add(addDay, 'days');
            }

            // if earliest date is lower than final date
            // vaidate if day of final date is not Monday
            if(startMonday < datezone2){
                if (daydate2 != 1){
                   if (daydate2 == 0){ //day() returns 0 for Sunday
                        daydate2 = 7;
                    }
                    // calculate previous monday of final date 
                    endMonday = endMonday.subtract((daydate2 - 1), 'days');
                }              
            }
                
            if(endMonday > startMonday){
                // if next Monday and previous Monday are not calculated,
                // the result of resCmpWeeks is based on original dates
                if ((endMonday.isSame(datezone2))  && (startMonday.isSame(datezone1))){
                    resCmpWeeks= endMonday.diff(startMonday, 'weeks');

                // if next Monday or previous Monday are calculated,
                // the result of resCmpWeeks is based on those dates
                }else{
                    var startDate = moment(startMonday.format('YYYY') + '-' + startMonday.format('MM') + '-' + startMonday.format('DD'));
                    var endDate = moment(endMonday.format('YYYY') + '-' + endMonday.format('MM') + '-' + endMonday.format('DD'));
                    resCmpWeeks= endDate.diff(startDate, 'weeks');
                }         
            }
        }

        // convert the result to seconds, minutes, hours or years
        switch(joption){
        // Convert to seconds
        case 's': case 'S':
            result= datezone2.diff(datezone1, 'seconds') + ' seconds';
            break;

        // Convert to minutes
        case 'm': case 'M':
            result= datezone2.diff(datezone1, 'minutes') + ' minutes';
            break;

        // Convert to hours
        case 'h': case 'H':
            result= datezone2.diff(datezone1, 'hours') + ' hours';
            break;

        // Convert to years
        case 'y': case 'Y':
            result= datezone2.diff(datezone1, 'years', true).toFixed(2) + ' years';
            break;

        // return error message
        default:
            result= 'Invalid option.';
        }

        // return JSON message
        res.json({ 
            days: resDays,
            weekdays: resWeekDays,
            completeWeeks: resCmpWeeks,
            result: result
        });
    
});

  app.listen(3000, () => console.log ("API Server is running..."));