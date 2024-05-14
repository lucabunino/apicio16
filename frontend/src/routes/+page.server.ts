import { fail } from "@sveltejs/kit"
import { EMAIL, GOOGLE_EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

export const actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData()
      console.log(formData);
      
      const fname = formData.get('fname');
      const lname = formData.get('lname');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');

      const body = "New contact request: " + fname + lname + email + phone + message

      let html = `
      <h1>New contact request</h2>
      <h2>${fname} ${lname}!</h2>
      <h3>${email}</h3>
      <h3>${phone}</h3>
      <p>${message}</p>
      `;

      const mail = {
        from: GOOGLE_EMAIL,
        to: "fb@palazzovelabro.it",
        text: body,
        html: html,
      };

      const sendEmail = async (mail) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(mail, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail(mail);
      
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
    } return {
      success: false,
    };
  },
};