const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  applicationId: "5e8f5f8b-c4f5-48f3-bd7b-406acb351e6b",
  privateKey: "./private.key",
  apiKey: "f7841a68",
  apiSecret: "aK8vppyIkUC6beL3"
})


const from = "+2348051539903"
const to = "+2348051539903"
const text = 'A text message sent using the Vonage SMS API'
const channel= "sms"

async function sendSMS() {
    await vonage.sms.send({to, from, text,channel})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();