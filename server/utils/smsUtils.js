exports.sendVerificationSMS = ({to, vercode}) => {
    console.log(to,vercode);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
          .create({from: '+12566769646', body: vercode, to: `+${to}}`})
          .then(message => console.log(message.sid));
};
