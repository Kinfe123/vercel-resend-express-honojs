
const express = require('express')
const resends = require('resend')
const cors = require('cors')

const app = express();
const resend = new resends.Resend("re_CbNbcyfi_D1StMXC7EEBBKQsfNsmwJmgT");
app.use(cors())
app.use(express.json())
app.get('/' , (req , res) => {
    res.send('The send api')
})
app.get("/send", async (req, res) => {
 const {email , firstName , lastName} = await req.body
 console.log('THe reuqesy infor : ' , email , firstName , lastName)
  try {
    const data = await resend.emails.send({
      from: "Arez Armada <apply@arezarmada.com>",
      to: [email],
      subject: "Thanks For Adding Us To Your Bucket List",
      html: `<html>
      Dear ${firstName + " " + lastName } <br /> 
      Thank you for subscribing to ArezArmada and we have received your responses and 
      <br /> 
      We&apos;re thrilled to have you on board as we embark on a transformative journey of empowering  <br />
      African talent and fostering connections with American businesses. As  <br />
      a valued subscriber, you are joining a community dedicated to bridging  <br />
      the gap between African professionals and opportunities in the   <br />
      American business landscape. Here&apos;s what you can expect from your  <br />
      subscription.
       
     
    
  </html>`,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3002, () => {
  console.log("Listening on http://localhost:3002");
});
module.exports = app