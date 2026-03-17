import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with BornToShine for backend engineering roles or project inquiries.',
};

export default function ContactPage() {
    return <ContactForm />;
}
