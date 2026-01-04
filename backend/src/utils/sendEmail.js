import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: "vedavyasofficial06@gmail.com", 
        name: "DonorLink",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html || `<p>${text}</p>`,
      textContent: text,
    });

    console.log("📩 Brevo response:", response);
    console.log(`✅ Email SENT to: ${to}`);
  } catch (error) {
    console.error("❌ Brevo error:", error.response?.body || error);
    throw new Error("Email sending failed");
  }
};