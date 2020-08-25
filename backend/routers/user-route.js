const router= require('express').Router();

let User = require('../models/users.model');

const request = require('request')

router.route('/').get((req,res)=>{
    User.find()
        .then(userData=>res.send(userData))
        .catch(err=> res.send(404,'Error:'+err))
});

router.route('/add').post((req,res)=>{
    const username = req.body.name;
    const mobileNo = req.body.phone;
    const Location = req.body.location;
    const vehicleName = req.body.vehiclename;
    const smsDescription = req.body.smsdescription;
    const date = Date.now();
    console.log(username, mobileNo, Location, vehicleName,smsDescription, date);

    const createNewUser = new User({ username, mobileNo, Location, vehicleName,smsDescription,date });
    createNewUser.save()
        .then((data) => {
            res.send(`User added!!!`);
            sendSms(mobileNo,smsDescription)
        })
        .catch(err => res.send(404, err))
});

/*router.route('/getlocation').get((req,res)=>{
    //console.log(req,res)
    
    request('http://ip-api.com/json/' , function(error, resp, body) {
        var ipuser = JSON.parse(body)
        //console.log(ipuser.lat + ", " + ipuser.lon)
        const mobileNo=9940716056;
        const latitude=ipuser.lat;
        const longitude=ipuser.lon;
        console.log(mobileNo,latitude,longitude)
        const createLocation = new Location({mobileNo,latitude,longitude});
            createLocation.save().then((data)=>{
                alert("login success");
                res.send(`User Location added!!!`);
            }).catch(err=> res.send(err))
    }) 
    
});*/

const sendSms= (mobileno,smsDescription)=>{
    console.log('SENDsMS cALLED',mobileno,smsDescription);
    const accountSid = 'ACce45d8ba9251b89e8eb4f3fb0d3fb908'; 
    const authToken = '9fcf539218c297be0f2301d97df20dfa'; 
    const client = require('twilio')(accountSid, authToken); 
    const mytestip='https://9fadf091959c.ngrok.io/getlocation';
    client.messages 
        .create({ 
            body: `${smsDescription} click here ${mytestip}`, 
            from: '+14156826179',
            //statusCallback: 'https://662f871b644b.ngrok.io/users/getlocation',       
            to: mobileno 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
}
module.exports = router;