import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, data } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      cc: 'contact@academieagentivite.fr',
      from: 'contact@academieagentivite.fr',
      subject: 'Votre Roue de la Vie - Académie Agentivité',
      html: `
        <h1>Votre Roue de la Vie</h1>
        <p>Merci d'avoir utilisé notre outil d'évaluation. Voici vos résultats :</p>
        <ul>
          ${Object.entries(data).map(([domain, value]) => 
            `<li><strong>${domain}:</strong> ${value}/10</li>`
          ).join('')}
        </ul>
        <p>Pour plus d'informations ou pour un accompagnement personnalisé, n'hésitez pas à nous contacter.</p>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
