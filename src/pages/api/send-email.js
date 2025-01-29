const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, data } = req.body;
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0C2234;">Votre Roue de la Vie</h1>
            <p>Merci d'avoir utilisé notre outil d'évaluation. Voici vos résultats :</p>
            <ul style="list-style-type: none; padding: 0;">
              ${Object.entries(data).map(([domaine, valeur]) => `
                <li style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                  <strong style="color: #31555B;">${domaine}:</strong> ${valeur}/10
                </li>
              `).join('')}
            </ul>
            <div style="margin-top: 30px; padding: 20px; background-color: #E4E2DD; border-radius: 5px;">
              <p style="margin: 0; color: #0C2234;">Pour plus d'informations ou pour un accompagnement personnalisé, n'hésitez pas à nous contacter :</p>
              <p style="margin: 10px 0;"><a href="mailto:contact@academie-agentivite.fr" style="color: #31555B;">contact@academie-agentivite.fr</a></p>
            </div>
          </div>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

export default handler;
