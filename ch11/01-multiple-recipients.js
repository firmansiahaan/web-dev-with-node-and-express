const nodemailer = require('nodemailer')

const env = process.env.NODE_ENV || 'development'
const credentials = require(`./.credentials.${env}.json`)

const mailTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"xxxxxx yyyyyyy - Meadowlark Travel" <xxxxxx.yyyyyyy@gmail.com>',
      to: 'xxxxxx.yyyyyyy@hotmail.com, "Jae Customer" <zzzzzzzzzzz@yahoo.com>, ' +
        'xxxxxx.yyyyyyy@gmail.com',
      subject: 'Your Meadowlark Travel Tour',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()