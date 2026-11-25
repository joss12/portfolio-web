'use client';

import { useState, type FormEvent } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';

import {
  ArrowUpRight,
  ArrowLeft,
  Send,
  MapPin,
  Github,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Globe2,
  Clock3,
} from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type ContactFormProps = {
  initialService?: string;
};

const services = [
  {
    value: 'web-development',
    en: 'Web Application Development',
    ko: '웹 애플리케이션 개발',
    fr: 'Développement web',
  },
  {
    value: 'backend-api',
    en: 'Backend & API Development',
    ko: '백엔드 및 API 개발',
    fr: 'Développement Backend et API',
  },
  {
    value: 'ecommerce',
    en: 'E-Commerce Development',
    ko: '이커머스 개발',
    fr: 'Développement E-Commerce',
  },
  {
    value: 'full-stack-development',
    en: 'Full Stack Development',
    ko: '풀스택 개발',
    fr: 'Développement Full Stack',
  },
  {
    value: 'mvp',
    en: 'MVP Development',
    ko: 'MVP 개발',
    fr: 'Développement MVP',
  },
  {
    value: 'maintenance',
    en: 'Maintenance & Integration',
    ko: '유지보수 및 시스템 연동',
    fr: 'Maintenance et intégration',
  },
  {
    value: 'employment',
    en: 'Employment Opportunity',
    ko: '채용 및 협업 제안',
    fr: 'Opportunité professionnelle',
  },
  {
    value: 'other',
    en: 'Other',
    ko: '기타',
    fr: 'Autre',
  },
] as const;

type ServiceId = (typeof services)[number]['value'];

const content = {
  en: {
    back: 'Back to home',
    label: 'Get in touch',
    title: "Let's build something",
    titleAccent: 'together.',

    description:
      'Have a project in mind, need help with an existing application, or looking for a software developer? I would be happy to hear from you.',

    availability: 'Available for new opportunities',

    locationLabel: 'Location',
    location: 'South Korea',

    languageLabel: 'Communication',
    languages: 'English · Korean · French',

    responseLabel: 'Communication process',
    response: 'Direct and transparent communication',

    githubLabel: 'Explore my work',

    formTitle: 'Tell me about your project',

    formDescription:
      'Share a few details about what you have in mind.',

    selectedService: 'Selected service',

    serviceSelected:
      'Your selected service has been added to the inquiry form. You can change it below.',

    name: 'Full name',
    namePlaceholder: 'Your full name',

    email: 'Email address',
    emailPlaceholder: 'you@example.com',

    company: 'Company',
    companyPlaceholder: 'Company or organization',

    service: 'What can I help you with?',
    selectService: 'Select a service',

    message: 'Project details',

    messagePlaceholder:
      'Tell me about your project, goals, requirements and any challenges you would like to solve...',

    employmentMessage: 'Opportunity details',

    employmentPlaceholder:
      'Tell me about your company, the position and the opportunity you would like to discuss...',

    optional: 'Optional',

    send: 'Send inquiry',
    sending: 'Sending inquiry...',

    success:
      'Your inquiry has been sent successfully. Thank you for getting in touch!',

    error:
      'Unable to send your inquiry. Please try again.',

    privacy:
      'Your information will only be used to respond to your inquiry.',
  },

  ko: {
    back: '홈으로 돌아가기',
    label: '프로젝트 문의',
    title: '함께 새로운 가치를',
    titleAccent: '만들어 보세요.',

    description:
      '새로운 프로젝트, 기존 애플리케이션 개선 또는 소프트웨어 개발자 채용을 고려하고 계신다면 언제든지 문의해 주세요.',

    availability: '새로운 프로젝트 및 채용 기회 환영',

    locationLabel: '위치',
    location: '대한민국',

    languageLabel: '사용 언어',
    languages: '영어 · 한국어 · 프랑스어',

    responseLabel: '소통 방식',
    response: '직접적이고 투명한 커뮤니케이션',

    githubLabel: '개발 프로젝트 보기',

    formTitle: '프로젝트를 소개해 주세요',

    formDescription:
      '진행하고 싶은 프로젝트에 대한 정보를 알려주세요.',

    selectedService: '선택한 서비스',

    serviceSelected:
      '선택하신 서비스가 문의 양식에 적용되었습니다. 아래에서 변경할 수 있습니다.',

    name: '이름',
    namePlaceholder: '이름을 입력해 주세요',

    email: '이메일',
    emailPlaceholder: 'you@example.com',

    company: '회사명',
    companyPlaceholder: '회사 또는 기관명',

    service: '필요한 서비스',
    selectService: '서비스를 선택해 주세요',

    message: '프로젝트 상세 내용',

    messagePlaceholder:
      '프로젝트의 목표, 요구사항 및 해결하고 싶은 문제를 알려주세요.',

    employmentMessage: '채용 및 협업 제안',

    employmentPlaceholder:
      '회사 소개, 채용 포지션 및 협업 제안에 대한 내용을 알려주세요.',

    optional: '선택 사항',

    send: '문의 보내기',
    sending: '전송 중...',

    success:
      '문의가 성공적으로 전송되었습니다. 감사합니다!',

    error:
      '문의 전송에 실패했습니다. 다시 시도해 주세요.',

    privacy:
      '입력하신 정보는 문의에 대한 답변을 위해서만 사용됩니다.',
  },

  fr: {
    back: 'Retour à l’accueil',
    label: 'Contact',
    title: 'Construisons quelque chose',
    titleAccent: 'ensemble.',

    description:
      'Vous avez un projet, souhaitez améliorer une application existante ou recherchez un développeur logiciel ? Je serais ravi d’échanger avec vous.',

    availability: 'Disponible pour de nouvelles opportunités',

    locationLabel: 'Localisation',
    location: 'Corée du Sud',

    languageLabel: 'Langues',
    languages: 'Anglais · Coréen · Français',

    responseLabel: 'Communication',
    response: 'Communication directe et transparente',

    githubLabel: 'Découvrir mes projets',

    formTitle: 'Parlez-moi de votre projet',

    formDescription:
      'Partagez quelques informations sur votre projet.',

    selectedService: 'Service sélectionné',

    serviceSelected:
      'Votre service a été ajouté au formulaire. Vous pouvez modifier votre sélection ci-dessous.',

    name: 'Nom complet',
    namePlaceholder: 'Votre nom complet',

    email: 'Adresse e-mail',
    emailPlaceholder: 'vous@example.com',

    company: 'Entreprise',
    companyPlaceholder: 'Entreprise ou organisation',

    service: 'Service recherché',
    selectService: 'Sélectionnez un service',

    message: 'Description du projet',

    messagePlaceholder:
      'Décrivez votre projet, vos objectifs, vos besoins et les problèmes que vous souhaitez résoudre...',

    employmentMessage: 'Détails de l’opportunité',

    employmentPlaceholder:
      'Présentez votre entreprise, le poste et l’opportunité dont vous souhaitez discuter...',

    optional: 'Facultatif',

    send: 'Envoyer la demande',
    sending: 'Envoi en cours...',

    success:
      'Votre demande a été envoyée avec succès. Merci de m’avoir contacté !',

    error:
      'Impossible d’envoyer votre demande. Veuillez réessayer.',

    privacy:
      'Vos informations seront uniquement utilisées pour répondre à votre demande.',
  },
} as const;

type SupportedLocale = keyof typeof content;

const inputClass = `
  w-full rounded-xl border border-border
  bg-background-secondary px-4 py-3.5
  text-sm text-foreground
  placeholder:text-text-muted
  outline-none
  transition-colors duration-200
  hover:border-border-hover
  focus:border-primary/60
  focus:ring-2 focus:ring-primary/10
  aria-invalid:border-danger/60
  aria-invalid:focus:border-danger
  aria-invalid:focus:ring-danger/10
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

const labelClass = `
  mb-2 block text-sm font-medium
  text-foreground
`;

const iconClass = `
  flex h-12 w-12 shrink-0
  items-center justify-center
  rounded-xl border border-primary/20
  bg-primary/10 text-primary-light
`;

const fieldErrorClass = `
  mt-2 text-xs text-danger
`;

function validateService(
  value: string,
): ServiceId | '' {
  return (
    services.find(
      (service) => service.value === value,
    )?.value ?? ''
  );
}

export default function ContactForm({
  initialService = '',
}: ContactFormProps) {
  const locale = useLocale();

  const language: SupportedLocale =
    locale === 'ko' || locale === 'fr'
      ? locale
      : 'en';

  const copy = content[language];

  const [state, setState] =
    useState<FormState>('idle');

  const [errors, setErrors] = useState<
    Record<string, string[]>
  >({});

  const [service, setService] = useState<
    ServiceId | ''
  >(() => validateService(initialService));

  const selectedService = services.find(
    (item) => item.value === service,
  );

  const isEmployment = service === 'employment';

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (state === 'loading') return;

    setState('loading');
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get('name') ?? '',
    ).trim();

    const email = String(
      formData.get('email') ?? '',
    ).trim();

    const company = String(
      formData.get('company') ?? '',
    ).trim();

    const serviceValue = validateService(
      String(formData.get('service') ?? ''),
    );

    const message = String(
      formData.get('message') ?? '',
    ).trim();

    const submittedService = services.find(
      (item) => item.value === serviceValue,
    );

    if (
      !name ||
      !email ||
      !message ||
      !submittedService
    ) {
      setState('error');
      return;
    }

    const employmentInquiry =
      serviceValue === 'employment';

    const inquiryDetails = [
      employmentInquiry
        ? 'EMPLOYMENT INQUIRY'
        : 'PROJECT INQUIRY',

      '',

      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not specified'}`,
      `Service: ${submittedService.en}`,
      `Language: ${language.toUpperCase()}`,
    ];

    inquiryDetails.push(
      '',
      employmentInquiry
        ? 'OPPORTUNITY DETAILS'
        : 'PROJECT DETAILS',
      '',
      message,
    );

    // Preserve the existing backend contract.
    const body = {
      name,
      email,
      message: inquiryDetails.join('\n'),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      let data: {
        success: boolean;
        errors?: Record<string, string[]>;
      } = {
        success: false,
      };

      try {
        data = await res.json();
      } catch {
        // The response is not JSON.
      }

      if (res.ok && data.success) {
        form.reset();

        setService(
          validateService(initialService),
        );

        setState('success');

        return;
      }

      if (data.errors) {
        setErrors(data.errors);
      }

      setState('error');
    } catch {
      setState('error');
    }
  }

  return (
    <main className="relative isolate overflow-hidden">

      {/* Background decoration */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-48 -top-48 -z-10
          h-[650px] w-[650px]
          rounded-full bg-primary/5
          blur-[150px]
          dark:bg-primary/10
        "
      />

      <div className="site-container py-16 md:py-24">

        {/* Back navigation */}

        <Link
          href={`/${locale}`}
          className="
            mb-12 inline-flex items-center
            gap-2 text-sm text-text-muted
            transition-colors
            hover:text-foreground
          "
        >
          <ArrowLeft size={16} />

          {copy.back}
        </Link>

        <div
          className="
            grid items-start gap-12
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-20
          "
        >

          {/* Left column */}

          <div>
            <span className="section-label">
              {copy.label}
            </span>

            <h1
              className="
                mt-6 text-4xl font-bold
                leading-tight tracking-[-0.04em]
                text-foreground
                md:text-5xl lg:text-6xl
              "
            >
              {copy.title}

              <span className="hero-gradient mt-2 block">
                {copy.titleAccent}
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-text-secondary">
              {copy.description}
            </p>

            {/* Availability */}

            <div
              className="
                mt-8 inline-flex items-center
                gap-2.5 rounded-full
                border border-success/20
                bg-success/5 px-4 py-2
                text-xs font-medium
                text-success
              "
            >
              <span className="status-dot" />

              {copy.availability}
            </div>

            {/* Selected service */}

            {selectedService && (
              <div
                className="
                  mt-8 rounded-2xl border
                  border-primary/20
                  bg-primary/5 p-5
                "
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-primary-light"
                  />

                  <div>
                    <p
                      className="
                        text-xs font-medium
                        uppercase tracking-wider
                        text-primary-light
                      "
                    >
                      {copy.selectedService}
                    </p>

                    <h2 className="mt-2 text-lg font-semibold text-foreground">
                      {selectedService[language]}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {copy.serviceSelected}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact information */}

            <div className="mt-12 space-y-6 border-t border-border pt-8">

              {/* Location */}

              <div className="flex items-start gap-4">
                <div className={iconClass}>
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-sm text-text-muted">
                    {copy.locationLabel}
                  </p>

                  <p className="mt-1 font-medium text-foreground">
                    {copy.location}
                  </p>
                </div>
              </div>

              {/* Languages */}

              <div className="flex items-start gap-4">
                <div className={iconClass}>
                  <Globe2 size={21} />
                </div>

                <div>
                  <p className="text-sm text-text-muted">
                    {copy.languageLabel}
                  </p>

                  <p className="mt-1 font-medium text-foreground">
                    {copy.languages}
                  </p>
                </div>
              </div>

              {/* Communication */}

              <div className="flex items-start gap-4">
                <div className={iconClass}>
                  <Clock3 size={21} />
                </div>

                <div>
                  <p className="text-sm text-text-muted">
                    {copy.responseLabel}
                  </p>

                  <p className="mt-1 font-medium text-foreground">
                    {copy.response}
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub */}

            <a
              href="https://github.com/joss12"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-10 inline-flex items-center
                gap-3 rounded-xl border
                border-border bg-surface
                px-5 py-3 text-sm
                font-medium text-foreground
                transition-colors
                hover:border-primary/40
                hover:bg-surface-hover
              "
            >
              <Github size={19} />

              {copy.githubLabel}

              <ArrowUpRight
                size={15}
                className="text-text-muted"
              />
            </a>
          </div>

          {/* Right column — Inquiry form */}

          <div
            className="
              rounded-3xl border border-border
              bg-surface p-6
              shadow-2xl shadow-slate-900/10
              dark:shadow-black/10
              md:p-9
            "
          >
            <div className={`${iconClass} mb-6`}>
              <MessageSquare size={23} />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {copy.formTitle}
            </h2>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {copy.formDescription}
            </p>

            <form
              onSubmit={handleSubmit}
              aria-busy={state === 'loading'}
              className="mt-8"
            >
              <fieldset
                disabled={state === 'loading'}
                className="min-w-0 space-y-6"
              >

                {/* Name and email */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Full name */}

                  <div>
                    <label
                      htmlFor="name"
                      className={labelClass}
                    >
                      {copy.name}

                      <span className="ml-1 text-primary-light">
                        *
                      </span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder={copy.namePlaceholder}
                      className={inputClass}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name
                          ? 'name-error'
                          : undefined
                      }
                    />

                    {errors.name && (
                      <p
                        id="name-error"
                        className={fieldErrorClass}
                      >
                        {errors.name[0]}
                      </p>
                    )}
                  </div>

                  {/* Email address */}

                  <div>
                    <label
                      htmlFor="email"
                      className={labelClass}
                    >
                      {copy.email}

                      <span className="ml-1 text-primary-light">
                        *
                      </span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder={copy.emailPlaceholder}
                      className={inputClass}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email
                          ? 'email-error'
                          : undefined
                      }
                    />

                    {errors.email && (
                      <p
                        id="email-error"
                        className={fieldErrorClass}
                      >
                        {errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}

                <div>
                  <label
                    htmlFor="company"
                    className={labelClass}
                  >
                    {copy.company}

                    <span className="ml-2 text-xs font-normal text-text-muted">
                      ({copy.optional})
                    </span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={150}
                    placeholder={copy.companyPlaceholder}
                    className={inputClass}
                  />
                </div>

                {/* Service selection */}

                <div>
                  <label
                    htmlFor="service"
                    className={labelClass}
                  >
                    {copy.service}

                    <span className="ml-1 text-primary-light">
                      *
                    </span>
                  </label>

                  <select
                    id="service"
                    name="service"
                    required
                    value={service}
                    onChange={(event) => {
                      setService(
                        validateService(
                          event.target.value,
                        ),
                      );

                      setState('idle');
                    }}
                    className={`
                      ${inputClass}
                      cursor-pointer
                      scheme-light
                      dark:scheme-dark
                      ${service ? '' : 'text-text-muted'}
                    `}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-surface text-text-muted"
                    >
                      {copy.selectService}
                    </option>

                    {services.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="bg-surface text-foreground"
                      >
                        {item[language]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project description */}

                <div>
                  <label
                    htmlFor="message"
                    className={labelClass}
                  >
                    {isEmployment
                      ? copy.employmentMessage
                      : copy.message}

                    <span className="ml-1 text-primary-light">
                      *
                    </span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    maxLength={2000}
                    placeholder={
                      isEmployment
                        ? copy.employmentPlaceholder
                        : copy.messagePlaceholder
                    }
                    className={`${inputClass} resize-y`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? 'message-error'
                        : undefined
                    }
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className={fieldErrorClass}
                    >
                      {errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Submit button */}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="
                    btn-primary w-full
                    justify-center gap-3
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      {copy.sending}
                    </>
                  ) : (
                    <>
                      {copy.send}

                      <Send size={17} />
                    </>
                  )}
                </button>

                {/* Privacy information */}

                <p className="text-center text-xs leading-6 text-text-muted">
                  {copy.privacy}
                </p>
              </fieldset>

              {/* Success state */}

              {state === 'success' && (
                <div
                  role="status"
                  className="
                    mt-6 flex items-start gap-3
                    rounded-xl border
                    border-success/20
                    bg-success/5 p-4
                    text-sm text-success
                  "
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0"
                  />

                  <p>{copy.success}</p>
                </div>
              )}

              {/* Error state */}

              {state === 'error' && (
                <div
                  role="alert"
                  className="
                    mt-6 flex items-start gap-3
                    rounded-xl border
                    border-danger/20
                    bg-danger/5 p-4
                    text-sm text-danger
                  "
                >
                  <AlertCircle
                    size={20}
                    className="shrink-0"
                  />

                  <p>{copy.error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
