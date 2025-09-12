import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, subject, message, newsletter } = await request.json();

    // Validation
    if (!firstname || !lastname || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Configure nodemailer pour OVH MX Plan
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true pour le port 465 (SSL), false pour 587 (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Date et heure actuelles
    const now = new Date();
    const dateTime = now.toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'micim@micim.fr',
      to: 'micim@micim.fr',
      subject: `${subject} - ${firstname} ${lastname} - Micim`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #72377b;">Nouveau message de contact</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Nom :</strong> ${firstname} ${lastname}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Newsletter :</strong> ${newsletter ? '✅ Souhaite recevoir la newsletter' : 'N\'a pas coché la case pour la newsletter'}</p>
            <p><strong>Message :</strong></p>
            <div style="background: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <div style="background: #f9f9f9; padding: 15px; border-radius: 3px; font-size: 12px; color: #666;">
            <p><strong>Informations techniques :</strong></p>
            <p>✅ L'expéditeur a donné son consentement explicite pour le traitement de ses données personnelles conformément à notre politique de confidentialité.</p>
            <p><strong>Date et heure d'envoi :</strong> ${dateTime}</p>
            <p><strong>Source :</strong> Formulaire de contact du site MICIM</p>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact
        
        Nom: ${firstname} ${lastname}
        Email: ${email}
        Sujet: ${subject}
        Newsletter: ${newsletter ? 'Souhaite recevoir la newsletter' : 'N\'a pas coché la case pour la newsletter'}
        
        Message:
        ${message}
        
        ---
        Informations techniques :
        - L'expéditeur a donné son consentement explicite pour le traitement de ses données personnelles.
        - Date et heure d'envoi : ${dateTime}
        - Source : Formulaire de contact du site MICIM
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}