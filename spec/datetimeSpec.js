var request = require("request");

var base_url = "http://localhost:3000/datetime";
var objBody;

describe("Datetime unit test****", function() {
  describe("POST /datetime", function() {
    it("returns status code 500 when body is empty", function(done) {
        var info = '';
        request.post({
          headers: {'content-type' : 'application/json'},
          url:     base_url,
          body:    info}, (error, response, body) =>  {
        console.log('**Body:' + body);
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    it("returns status code 500 when json input invalid", function(done) {
      var info = JSON.stringify({
        tetime1: "2022-09-0821:14:25", //expected key: datetime1 
        zne1: "Australia/Adelaide", //expected key: zone1
        datetim2: "2022-09-08T06:44:25", //expected key: datetime2
        zon: "Europe/Kirov", //expected key: zone2
        ption: "h" //expected key: option
      });

      request.post({
        headers: {'content-type' : 'application/json'},
        url:     base_url,
        body:    info}, (error, response, body) =>  {
      console.log('**Body:' + body);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

    it("returns status code 400 when values are invalid", function(done) {
      var info = JSON.stringify({
        datetime1: "2022-09-0821:14:25", //format expected:YYYY-MM-DDThh:mm:ss 
        zone1: "stralia/Adelaide", // Australia/Adelaide
        datetime2: "2022-08T06:44:25", //format expected:YYYY-MM-DDThh:mm:ss 
        zone2: "Eurpe/Kirov", // Europe/Kirov
        option: "h"
      });

      request.post({
        headers: {'content-type' : 'application/json'},
        url:     base_url,
        body:    info}, (error, response, body) =>  {
      console.log('**Body:' + body);
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it("returns status code 200 when input data is valid", function(done) {
    var info = JSON.stringify({
      datetime1: "2022-09-08T21:14:25",  
      zone1: "Australia/Adelaide",
      datetime2: "2022-09-08T06:44:25",
      zone2: "Europe/Kirov",
      option: "h"
    });

    request.post({
      headers: {'content-type' : 'application/json'},
      url:     base_url,
      body:    info}, (error, response, body) =>  {
    console.log('**Body:' + body);
    expect(response.statusCode).toBe(200);
    done();
  });
});

it("returns status code 200 when input data is valid and key: option is empty", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:25",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: ""
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  expect(response.statusCode).toBe(200);
  done();
});
});

it("returns key:option = Invalid option.", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:25",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: ""
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.result).toBe('Invalid option.');
  done();
});
});

it("returns key:result = Invalid option.", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:25",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: ""
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.result).toBe('Invalid option.');
  done();
});
});

it("returns days, weekdays, weeks, hours=7", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:18",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: "h"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.days).toBe(0);
  expect(objBody.weekdays).toBe(0);
  expect(objBody.completeWeeks).toBe(0);
  expect(objBody.result).toBe('7 hours');
  done();
});
});

it("returns days=0, weekdays=0, weeks=0, minutes=479", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:18",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: "m"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.days).toBe(0);
  expect(objBody.weekdays).toBe(0);
  expect(objBody.completeWeeks).toBe(0);
  expect(objBody.result).toBe('479 minutes');
  done();
});
});

it("returns days=0, weekdays=0, weeks=0, seconds=28793", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:18",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "Europe/Kirov",
    option: "S"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.days).toBe(0);
  expect(objBody.weekdays).toBe(0);
  expect(objBody.completeWeeks).toBe(0);
  expect(objBody.result).toBe('28793 seconds');
  done();
});
});


it("returns days=0, weekdays=0, weeks=0, hours=0", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-09-08T21:14:18",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "America/Bogota",
    option: "h"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.days).toBe(0);
  expect(objBody.weekdays).toBe(0);
  expect(objBody.completeWeeks).toBe(0);
  expect(objBody.result).toBe('0 hours');
  done();
});
});

it("returns error when it is not a leap-year ", function(done) {
  var info = JSON.stringify({
    datetime1: "2022-02-29T21:14:18",  
    zone1: "Australia/Adelaide",
    datetime2: "2022-09-08T06:44:25",
    zone2: "America/Bogota",
    option: "h"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  expect(response.statusCode).toBe(400);
  done();
});
});

it("returns years in decimals ", function(done) {
  var info = JSON.stringify({
    datetime1: "1994-02-02T08:10:50",  
    zone1: "Japan",
    datetime2: "2022-09-10T20:01:01",
    zone2: "America/Argentina/ComodRivadavia",
    option: "y"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.days).toBe(10447);
  expect(objBody.weekdays).toBe(7463);
  expect(objBody.completeWeeks).toBe(1491);
  expect(objBody.result).toBe('28.61 years');
  done();
});
});

it("returns hours = 250751 ", function(done) {
  var info = JSON.stringify({
    datetime1: "1994-02-02T08:10:50",  
    zone1: "Japan",
    datetime2: "2022-09-10T20:01:01",
    zone2: "America/Argentina/ComodRivadavia",
    option: "h"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.result).toBe('250751 hours');
  done();
});
});

it("returns minutes = 15045110 ", function(done) {
  var info = JSON.stringify({
    datetime1: "1994-02-02T08:10:50",  
    zone1: "Japan",
    datetime2: "2022-09-10T20:01:01",
    zone2: "America/Argentina/ComodRivadavia",
    option: "m"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.result).toBe('15045110 minutes');
  done();
});
});

it("returns seconds = 902706611 ", function(done) {
  var info = JSON.stringify({
    datetime1: "1994-02-02T08:10:50",  
    zone1: "Japan",
    datetime2: "2022-09-10T20:01:01",
    zone2: "America/Argentina/ComodRivadavia",
    option: "s"
  });

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     base_url,
    body:    info}, (error, response, body) =>  {
  console.log('**Body:' + body);
  objBody = JSON.parse(body);
  expect(objBody.result).toBe('902706611 seconds');
  done();
});
});

});
});
