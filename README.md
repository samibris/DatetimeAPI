# DatetimeAPI

## General Info
The DatetimeAPI calculates the following values:
* Number of days between two datetime parameters with their respective timezones.
*  Number of weekdays between two datetime parameters including their timezones.
* Number of complete weeks between two datetime parameters and their timezones.
* Number of years, hours, minutes or seconds between two datetime parameters and their timezones.

 
## Technologies
The API is created with:
* NodeJS v13.14.0
* Express v4.18.1
* Jasmine v4.4.0 - Unit tests
* moment-timezone
* moment-business-days
* jsonschema

## Setup
* npm install express
* sudo apt install node-jasmine

## Usage
The API requires to receive input parameter in JSON format.

* Start the API with the commands:

	*npm start*    or  *node index.js*
* Send a post request with JSON input parameters to:
*http://localhost:3000/datetime*


### index.js

* The API validates if JSON input data match with the schema. In case of error, returns status error 500.
* Validates input data. In case of error, returns status error 400.
* Calculate number of days between two datetimes with their time zones.
* calculate number of weekdays (Excluding saturdays amd sundays). 
* Calculate complete weeks.
* Convert the result to seconds, minutes, hours or years.
* If all validations are successful, returns status code 200.

### Input Parameters 

* datetime1: Datetime in format YYYY-MM-DDTHH:MM:SS.

* zone1: Name time zone region (based on moment library) for first datetime. See file *ListTimeZones.txt.*

* datetime2: : Datetime in format YYYY-MM-DDTHH:MM:SS

* zone2: Name time zone region (based on moment library) for second datetime. See file *ListTimeZones.txt.*

* option:

	 Option     | Values
	-------------  | -------------
	 Years         | "Y" or "y"
	 Hours         | "H" or "h"
	 Minutes       | "M" or "m"
	 Seconds       | "S" or "s"
	

Example JSON format request:

	{
		"datetime1": "1987-07-13T16:14:18",
		"zone1":  "Asia/Anadyr",
		"datetime2":  "2022-10-02T23:13:13",
		"zone2": "America/Bogota",
		"option": "h"
	}

### Response Parameters

* days: Number of days between datetime1 and datetime2.
* weekdays: Number of weekdays between datetime1 and datetime2. (Excluding Saturdays and Sundays).
* completeWeeks: Number of complete weeks between datetime1 and datetime2. It is considered a complete week when it has 7 days starting from Monday. For example:

	 datetime1             | datetime2           |completeWeeks
	---------------------  | ------------------  |--------------
	 2022-09-03T18:14:18   | 2022-09-27T17:01:13 |  3  
	 2022-09-03T18:14:18   | 2022-09-20T17:01:13 |  2  

	Notes: 
	- In the first example, bacause datetime1 starts on Saturday and datetime2 finishes on Tuesday, the first week and the last one are incomplete weeks. The complete weeks go from 2022-09-05 to 2022-09-26.
	- In the second example, the complete weeks go from 2022-09-05 to 2022-09-19.


* result: 

	 Option        | Response examples
	-------------  | -------------
	 "Y" or "y"    | "305 years"
	 "H" or "h"    | "25 hours"
	 "M" or "m"    | "1447 minutes"
	 "S" or "s"    | "12444 seconds"
	 other value   | "Invalid option."

Example JSON format response:

	{
		"days": 12866,
		"weekdays": 9190,
		"completeWeeks": 1837,
		"result": "308784 hours"
	}

### dtSchema.json
It is the JSON schema to validate the structure of the JSON data input.

## Tests
For unit testing purposes, it is used the framework Jasmine.
The file that has all the unit test cases is *datetimeSpec.js* and it can be called with the command: 

*npm test*

## Other Information
Author: **Sandra Bonilla**\
LinkedIn: https://www.linkedin.com/in/sandra-bonilla-rivas-44911454

## References
https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
https://www.rithmschool.com/courses/intermediate-node-express/validation-with-json-schema
https://www.youtube.com/watch?v=TcvOgwQPsSo
JSONschema.net
https://www.timeanddate.com/date/timezoneduration.html




