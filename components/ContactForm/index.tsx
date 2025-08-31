"use client";

import { sendEmail } from "@/utils/sendEmail";
import { useForm } from "react-hook-form";
import { useState } from "react";

export type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    message: string;
    consent: boolean;
};

export const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const result = await sendEmail(data);

            if (result.success) {
                setSubmitStatus({ type: "success", message: result.message });
                reset(); // Reset form on success
            } else {
                setSubmitStatus({ type: "error", message: result.message });
            }
        } catch {
            setSubmitStatus({
                type: "error",
                message:
                    "Une erreur inattendue est survenue. Veuillez réessayer.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="contact-form__container"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="contact-form__field">
                <label htmlFor="firstname" className="contact-form__label">
                    Prénom <span className="contact-form__required">*</span> :
                </label>
                <input
                    type="text"
                    placeholder="Prénom"
                    className="contact-form__input"
                    id="firstname"
                    {...register("firstname", {
                        required: "Le prénom est requis",
                    })}
                />
                {errors.firstname && (
                    <span className="contact-form__error">
                        {errors.firstname.message}
                    </span>
                )}
            </div>
            <div className="contact-form__field">
                <label htmlFor="lastname" className="contact-form__label">
                    Nom <span className="contact-form__required">*</span> :
                </label>
                <input
                    type="text"
                    placeholder="Nom"
                    className="contact-form__input"
                    id="lastname"
                    {...register("lastname", { required: "Le nom est requis" })}
                />
                {errors.lastname && (
                    <span className="contact-form__error">
                        {errors.lastname.message}
                    </span>
                )}
            </div>
            <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">
                    Adresse mail{" "}
                    <span className="contact-form__required">*</span> :
                </label>
                <input
                    type="email"
                    placeholder="example@domain.com"
                    className="contact-form__input"
                    id="email"
                    {...register("email", {
                        required: "L'adresse email est requise",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Adresse email invalide",
                        },
                    })}
                />
                {errors.email && (
                    <span className="contact-form__error">
                        {errors.email.message}
                    </span>
                )}
            </div>
            <div className="contact-form__field">
                <label htmlFor="message" className="contact-form__label">
                    Message <span className="contact-form__required">*</span> :
                </label>
                <textarea
                    rows={8}
                    placeholder="Ecrivez votre message"
                    className="contact-form__input"
                    id="message"
                    {...register("message", {
                        required: "Le message est requis",
                    })}
                ></textarea>
                {errors.message && (
                    <span className="contact-form__error">
                        {errors.message.message}
                    </span>
                )}
            </div>
            <div className="contact-form__field">
                <div className="contact-form__checkbox-container">
                    <input
                        type="checkbox"
                        id="consent"
                        className="contact-form__checkbox"
                        {...register("consent", {
                            required:
                                "Vous devez accepter la politique de confidentialité",
                        })}
                    />
                    <label
                        htmlFor="consent"
                        className="contact-form__checkbox-label"
                    >
                        J&apos;accepte que mes données personnelles soient
                        collectées et traitées conformément à la{" "}
                        <a
                            href="/mentions-legales"
                            className="contact-form__link"
                        >
                            politique de confidentialité
                        </a>{" "}
                        pour répondre à ma demande.
                    </label>
                </div>
                {errors.consent && (
                    <span className="contact-form__error">
                        {errors.consent.message}
                    </span>
                )}
            </div>
            {submitStatus.type && (
                <div
                    className={`contact-form__message contact-form__message--${submitStatus.type}`}
                >
                    {submitStatus.message}
                </div>
            )}
            <div>
                <button
                    type="submit"
                    className="button-secondary contact-form__button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
                <p className="contact-form__required-info">
                    <span className="contact-form__required">*</span> Champs
                    obligatoires
                </p>
            </div>
            <div className="contact-form__info">
                <h5>Utilisation de vos données</h5>
                <p>
                    Les informations recueillies via ce formulaire sont
                    transmises à MICIM pour répondre à votre demande. Elles sont
                    conservées 1 an maximum et ne sont jamais transmises à des
                    tiers.
                </p>
            </div>
        </form>
    );
};
