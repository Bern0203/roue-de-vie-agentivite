import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, data } = req.body;
    
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: {
        name: "Académie Agentivité",
        email: "contact@academie-agentivite.fr"
      },
      to: [
        { email: email },
        { email: "contact@academie-agentivite.fr" }
      ],
      subject: "Votre Roue de la Vie - Académie Agentivité",
      htmlContent: `
        <h1>Votre Roue de la Vie</h1>
        <p>Merci d'avoir utilisé notre outil d'évaluation. Voici vos résultats :</p>
        <ul>
          ${Object.entries(data).map(([domain, value]) => 
            `<li><strong>${domain}:</strong> ${value}/10</li>`
          ).join('')}
        </ul>
        <p>Pour plus d'informations ou pour un accompagnement personnalisé, n'hésitez pas à nous contacter.</p>
      `
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
