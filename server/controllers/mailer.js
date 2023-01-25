import nodemailer from 'nodemailer';
import Mailgen  from 'mailgen';

// https://ethereal.email/create


/** POST:  http://localhost:8080/api/registerMail
    @param: {
        "username": "group123",
        "userEmail": "abc123",
        "text": "",
        "subject": ""
    }
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject} = req.body;

    let nodeConfig = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
    };
    
    let transporter = nodemailer.createTransport(nodeConfig);
    
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Expense Sharing',
            link: 'https://expense_sharing_app.com/'
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });

    //body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to Expense Sharing! We are happy to see you!',
            outro: "If you have any questions, you can reply this email."
        }
    }

    var emailBody = mailGenerator.generate(email);

    let message = {
        from : process.env.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody
    }

    // send email
    transporter.sendMail(message)
    .then( () => {
        return res.status(200).send({msg: "An email has been sent to your email address."});
    })
    .catch(error => {console.log(error); res.status(500).send({error: error.message}); });
    
}