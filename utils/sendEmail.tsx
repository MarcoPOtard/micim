import { FormData } from "@/components/ContactForm";

export const sendEmail = async (data: FormData): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                message: data.message,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Email envoyé avec succès'
            };
        } else {
            return {
                success: false,
                message: result.error || 'Erreur lors de l\'envoi'
            };
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return {
            success: false,
            message: 'Erreur de connexion. Veuillez réessayer.'
        };
    }
};