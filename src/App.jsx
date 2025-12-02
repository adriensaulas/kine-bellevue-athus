import { useEffect, useMemo, useState } from "react";

// ————————————————————————————————————————————————
// ✅ Single-file React site for a physiotherapy clinic (FR / EN / LB / PT)
// Styling: TailwindCSS
// Clinic: Centre de Kiné Belle-Vue (domain: kine-athus.be)
// ————————————————————————————————————————————————

const LANGS = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
  { code: "lb", label: "LB", name: "Lëtzebuergesch" },
  { code: "pt", label: "PT", name: "Português" },
];

const I18N = {
  fr: {
    slogan: "Le mouvement comme thérapie.",
    metaDescription:
      "Centre de kinésithérapie à Athus : rééducation orthopédique, sportive, respiratoire, périnatalité, drainage lymphatique. Prise de rendez-vous rapide.",
    heroTitle: "Votre centre de kinésithérapie à Athus",
    heroSubtitle:
      "Soins personnalisés, centrés sur vos objectifs. Évaluation, mouvement, éducation, suivi.",
    heroCTA1: "Prendre rendez-vous",
    heroCTA2: "Poser une question",
    heroOpen: "Contacter nous pour obtenir nos horaires",
    heroAddressPrefix: "Au cabinet :",
    navServices: "Soins",
    navTeam: "Équipe",
    navHours: "Horaires",
    navContact: "Contact",
    servicesSupertitle: "Soins",
    servicesTitle: "Nous vous accompagnons à chaque étape",
    servicesSubtitle:
      "Après blessure, chirurgie ou pour une douleur persistante, notre équipe vous guide vers un mouvement plus libre.",
    installationSupertitle: "Installation",
    installationTitle: "Vos soins dans un cadre calme et lumineux",
    installationSubtitle:
      "Quelques images du centre pour vous aider à vous repérer et à vous projeter avant votre venue.",
    teamSupertitle: "Équipe",
    teamTitle: "Des kinés à l'écoute, formés en continu",
    teamSubtitle: "Choisissez le profil qui vous convient et contactez-le directement.",
    teamSearchPlaceholder: "Rechercher un nom, une spécialité, une langue…",
    teamAll: "Tout",
    teamDetailsButton: "Fiche détaillée",
    teamCall: (firstName) => `Appeler ${firstName}`,
    teamWrite: "Écrire",
    teamLanguages: "Langues",
    hoursSupertitle: "Horaires",
    hoursTitle: "Nous vous accueillons au cabinet",
    hoursSubtitle: "Possibilité d'adapter selon indication médicale.",
    closed: "Fermé",
    contactSupertitle: "Contact & accès",
    contactTitle: "Parlons de votre objectif",
    contactSubtitle:
      "Appelez-nous, écrivez-nous ou passez nous voir au cabinet.",
    contactFormName: "Nom",
    contactFormEmail: "Email",
    contactFormMessage: "Message",
    contactFormNamePlaceholder: "Votre nom",
    contactFormEmailPlaceholder: "vous@exemple.com",
    contactFormMessagePlaceholder: "Dites-nous en plus…",
    contactFormSubmit: "Envoyer",
    contactAddressLabel: "Adresse",
    cookieText:
      "Nous utilisons des cookies strictement nécessaires pour le bon fonctionnement du site.",
    cookieOK: "OK",
    footerLegal: "Mentions légales",
    footerPrivacy: "Politique de confidentialité",
  },
  en: {
    slogan: "Movement as therapy.",
    metaDescription:
      "Physiotherapy clinic in Athus: orthopaedic, sports, respiratory, perinatal care and lymphatic drainage. Fast appointments.",
    heroTitle: "Your physiotherapy centre in Athus",
    heroSubtitle:
      "Personalised care focused on your goals. Assessment, movement, education, follow-up.",
    heroCTA1: "Book an appointment",
    heroCTA2: "Ask a question",
    heroOpen: "Contact us to obtain our opening hours",
    heroAddressPrefix: "At the clinic:",
    navServices: "Treatments",
    navTeam: "Team",
    navHours: "Hours",
    navContact: "Contact",
    servicesSupertitle: "Treatments",
    servicesTitle: "We support you at every step",
    servicesSubtitle:
      "After injury, surgery or for persistent pain, our team guides you towards easier movement.",
    installationSupertitle: "Installation",
    installationTitle: "Your care in a calm and bright setting",
    installationSubtitle:
      "A few pictures of the clinic to help you visualise the space before your visit.",
    teamSupertitle: "Team",
    teamTitle: "Physiotherapists who listen",
    teamSubtitle: "Choose the profile that suits you and contact them directly.",
    teamSearchPlaceholder: "Search a name, speciality, language…",
    teamAll: "All",
    teamDetailsButton: "Full profile",
    teamCall: (firstName) => `Call ${firstName}`,
    teamWrite: "Write",
    teamLanguages: "Languages",
    hoursSupertitle: "Opening hours",
    hoursTitle: "We welcome you at the clinic",
    hoursSubtitle: "Possibility to adapt according to medical indication.",
    closed: "Closed",
    contactSupertitle: "Contact & access",
    contactTitle: "Let's talk about your goal",
    contactSubtitle:
      "Call us, write to us or come and see us at the clinic.",
    contactFormName: "Name",
    contactFormEmail: "Email",
    contactFormMessage: "Message",
    contactFormNamePlaceholder: "Your name",
    contactFormEmailPlaceholder: "you@example.com",
    contactFormMessagePlaceholder: "Tell us more…",
    contactFormSubmit: "Send",
    contactAddressLabel: "Address",
    cookieText:
      "We only use cookies that are strictly necessary for the functioning of the website.",
    cookieOK: "OK",
    footerLegal: "Legal notice",
    footerPrivacy: "Privacy policy",
  },
  lb: {
    slogan: "Beweegung als Therapie.",
    metaDescription:
      "Kinésitherapie-Zenter zu Athus: orthopädesch, Sport-, Otem- an peri-natal Behandlungen.",
    heroTitle: "Äre Kiné-Zenter zu Athus",
    heroSubtitle:
      "Perséinlech Behandlungen, op Är Ziler ausgeriicht. Evaluatioun, Beweegung, Opklärung, Nobehandlungs-Suivi.",
    heroCTA1: "Rendez-vous huelen",
    heroCTA2: "Fro stellen",
    heroOpen: "Kontaktéiert eis fir eis Öffnungszäiten ze kréien",
    heroAddressPrefix: "Am Cabinet :",
    navServices: "Behandlungen",
    navTeam: "Ekipp",
    navHours: "Stonnen",
    navContact: "Kontakt",
    servicesSupertitle: "Behandlungen",
    servicesTitle: "Mir begleeden Iech op all Schratt",
    servicesSubtitle:
      "No Verletzung, Operatioun oder bei längerfristeger Péng hëllefe mir Iech erëm fräi ze beweegen.",
    installationSupertitle: "Installatioun",
    installationTitle: "Är Behandlungen an engem rouege, helle Kader",
    installationSubtitle:
      "E puer Biller vum Cabinet, fir Iech virun Ärem Rendez-vous e Bild ze maachen.",
    teamSupertitle: "Ekipp",
    teamTitle: "Kinéen, déi nolauschteren",
    teamSubtitle: "Sicht Iech de Profil aus, deen am beschte bei Iech passt.",
    teamSearchPlaceholder: "Numm, Spezialisatioun oder Sprooch sichen…",
    teamAll: "All",
    teamDetailsButton: "Detail-Profil",
    teamCall: (firstName) => `Uruffen beim ${firstName}`,
    teamWrite: "Schreiwen",
    teamLanguages: "Sproochen",
    hoursSupertitle: "Stonnen",
    hoursTitle: "Mir empfänken Iech am Cabinet",
    hoursSubtitle: "Upassungen nom medezinesche Besoin méiglech.",
    closed: "Zou",
    contactSupertitle: "Kontakt & Accès",
    contactTitle: "Schwätze mir iwwer Är Ziler",
    contactSubtitle:
      "Rufft eis un, schreift eis oder kommt laanscht.",
    contactFormName: "Numm",
    contactFormEmail: "Email",
    contactFormMessage: "Message",
    contactFormNamePlaceholder: "Ären Numm",
    contactFormEmailPlaceholder: "dir@beispill.lu",
    contactFormMessagePlaceholder: "Erzielt eis méi…",
    contactFormSubmit: "Schécken",
    contactAddressLabel: "Adress",
    cookieText:
      "Mir benotzen nëmmen déi technesch Cookien, déi fir de Fonctionnement noutwenneg sinn.",
    cookieOK: "OK",
    footerLegal: "Impressum",
    footerPrivacy: "Dateschutz",
  },
  pt: {
    slogan: "O movimento como terapia.",
    metaDescription:
      "Centro de fisioterapia em Athus: reabilitação ortopédica, desportiva, respiratória, perinatal e drenagem linfática.",
    heroTitle: "O seu centro de fisioterapia em Athus",
    heroSubtitle:
      "Cuidados personalizados, centrados nos seus objetivos. Avaliação, movimento, educação e acompanhamento.",
    heroCTA1: "Marcar consulta",
    heroCTA2: "Colocar uma questão",
    heroOpen: "Contacte-nos para obter os nossos horários.",
    heroAddressPrefix: "No consultório:",
    navServices: "Cuidados",
    navTeam: "Equipa",
    navHours: "Horários",
    navContact: "Contacto",
    servicesSupertitle: "Cuidados",
    servicesTitle: "Acompanhamos-o em cada etapa",
    servicesSubtitle:
      "Após lesão, cirurgia ou em caso de dor persistente, ajudamo-lo a reencontrar um movimento mais livre.",
    installationSupertitle: "Instalações",
    installationTitle: "Os seus cuidados num espaço calmo e luminoso",
    installationSubtitle:
      "Algumas imagens da clínica para o ajudar a visualizar o espaço antes da sua visita.",
    teamSupertitle: "Equipa",
    teamTitle: "Fisioterapeutas atentos",
    teamSubtitle:
      "Escolha o perfil que melhor corresponde às suas necessidades e contacte-o diretamente.",
    teamSearchPlaceholder: "Procurar nome, especialidade, língua…",
    teamAll: "Todos",
    teamDetailsButton: "Perfil completo",
    teamCall: (firstName) => `Ligar para ${firstName}`,
    teamWrite: "Escrever",
    teamLanguages: "Línguas",
    hoursSupertitle: "Horários",
    hoursTitle: "Recebemo-lo no consultório",
    hoursSubtitle: "Possibilidade de adaptação conforme indicação médica.",
    closed: "Fechado",
    contactSupertitle: "Contacto & acesso",
    contactTitle: "Falemos sobre o seu objetivo",
    contactSubtitle:
      "Telefone-nos, envie-nos um email ou venha visitar-nos.",
    contactFormName: "Nome",
    contactFormEmail: "Email",
    contactFormMessage: "Mensagem",
    contactFormNamePlaceholder: "O seu nome",
    contactFormEmailPlaceholder: "voce@exemplo.com",
    contactFormMessagePlaceholder: "Conte-nos mais…",
    contactFormSubmit: "Enviar",
    contactAddressLabel: "Morada",
    cookieText:
      "Utilizamos apenas cookies estritamente necessários para o funcionamento do site.",
    cookieOK: "OK",
    footerLegal: "Aviso legal",
    footerPrivacy: "Política de privacidade",
  },
};

const CLINIC = {
  name: "Centre de Kiné Belle-Vue",
  sloganFallback: "Le mouvement comme thérapie.",
  domain: "kine-athus.be",
  phone: "+32 63 37 20 88",
  email: "info@kinebellevue.com",
  address: {
    street: "Avenue de la Libération 39",
    city: "6791 Athus",
    country: "Belgique",
  },
  mapQuery: "Avenue de la Libération 39, Athus, Belgique",
  socials: {
    facebook: "#",
    instagram: "#",
    maps: "https://maps.google.com/?q=Centre%20de%20Kine%20Belle%20Vue%206791",
  },
};

const INSTALLATION_IMAGES = [
  {
    id: "entrance",
    src: "photos/clinic-entrance.jpg",
    label: {
      fr: "Entrée du centre et accueil",
      en: "Clinic entrance and reception",
      lb: "Entrée an Empfang vum Zentrum",
      pt: "Entrada do centro e receção",
    },
  },
  {
    id: "waiting-room",
    src: "photos/clinic-waiting-room.jpg",
    label: {
      fr: "Salle d'attente lumineuse",
      en: "Bright waiting room",
      lb: "Hell Sall d'Attente",
      pt: "Sala de espera luminosa",
    },
  },
  {
    id: "treatment-room",
    src: "photos/clinic-treatment-room.jpg",
    label: {
      fr: "Salle de traitement équipée",
      en: "Equipped treatment room",
      lb: "Equipéiert Behandlungsraum",
      pt: "Sala de tratamento equipada",
    },
  },
];

const SERVICES = [
  {
    id: "ortho",
    icon: OrthopedicsIcon,
    title: {
      fr: "Rééducation orthopédique",
      en: "Orthopaedic rehabilitation",
      lb: "Orthopädesch Reeducatioun",
      pt: "Reabilitação ortopédica",
    },
    desc: {
      fr: "Post-opératoire, entorses, prothèses, douleurs articulaires.",
      en: "Post-operative rehabilitation, sprains, joint replacements, joint pain.",
      lb: "No der Operatioun, Verstauchungen, Prothesen, Gelenksschmäerzen.",
      pt: "Reabilitação pós-operatória, entorses, próteses e dores articulares.",
    },
  },
  {
    id: "manual",
    icon: ManualTherapyIcon,
    title: {
      fr: "Thérapie manuelle",
      en: "Manual therapy",
      lb: "Manuell Therapie",
      pt: "Terapia manual",
    },
    desc: {
      fr: "Mobilisations articulaires et techniques myofasciales.",
      en: "Joint mobilisations and myofascial techniques.",
      lb: "Gelenksmobilisatiounen a myofaszial Techniken.",
      pt: "Mobilizações articulares e técnicas miofasciais.",
    },
  },
  {
    id: "sport",
    icon: SportIcon,
    title: {
      fr: "Kinésithérapie du sport",
      en: "Sports physiotherapy",
      lb: "Sportkinesitherapie",
      pt: "Fisioterapia desportiva",
    },
    desc: {
      fr: "Prévention et retour au sport, programmes personnalisés.",
      en: "Injury prevention and return-to-sport, personalised programmes.",
      lb: "Präventioun vu Verletzungen a Retour an de Sport mat personaliséierte Programmer.",
      pt: "Prevenção de lesões e retorno ao desporto com programas personalizados.",
    },
  },
  {
    id: "resp",
    icon: BreathingIcon,
    title: {
      fr: "Rééducation respiratoire",
      en: "Respiratory rehabilitation",
      lb: "Otem-Reeducatioun",
      pt: "Reabilitação respiratória",
    },
    desc: {
      fr: "Adultes & enfants, prise en charge des pathologies ORL.",
      en: "Adults and children, management of respiratory and ENT conditions.",
      lb: "Erwuessener a Kanner, Betreiung vu Otem- an ORL-Pathologien.",
      pt: "Adultos e crianças, tratamento de patologias respiratórias e ORL.",
    },
  },
  {
    id: "perinatal",
    icon: BabyIcon,
    title: {
      fr: "Pré / Post-natal",
      en: "Pre / post-natal care",
      lb: "Pré / Post-natal Betreiung",
      pt: "Cuidados pré / pós-natais",
    },
    desc: {
      fr: "Préparation, récupération et prise en charge périnéale.",
      en: "Preparation, recovery and pelvic floor management.",
      lb: "Preparatioun, Rehabilitatioun an peri-natal Beckenbuedem-Betreiung.",
      pt: "Preparação, recuperação e tratamento do pavimento pélvico.",
    },
  },
  {
    id: "lymph",
    icon: LymphIcon,
    title: {
      fr: "Drainage lymphatique",
      en: "Lymphatic drainage",
      lb: "Lymphdrainage",
      pt: "Drenagem linfática",
    },
    desc: {
      fr: "Méthode douce pour œdèmes, jambes lourdes, cicatrices.",
      en: "Gentle technique for oedema, heavy legs and scars.",
      lb: "Sanft Method bei Ödemer, schwéieren Been a Narben.",
      pt: "Método suave para edemas, pernas pesadas e cicatrizes.",
    },
  },
  {
    id: "chronic",
    icon: ChronicPainIcon,
    title: {
      fr: "Douleurs chroniques",
      en: "Chronic pain",
      lb: "Chronesch Péng",
      pt: "Dores crónicas",
    },
    desc: {
      fr: "Approche globale, mouvement, éducation et gestion de la douleur.",
      en: "Global approach focusing on movement, education and pain management.",
      lb: "Holistesch Approche mat Fokus op Beweegung, Opklärung a Péngmanagement.",
      pt: "Abordagem global centrada no movimento, educação e gestão da dor.",
    },
  },
  {
    id: "shockwave",
    icon: ShockwaveIcon,
    title: {
      fr: "Ondes de choc / E-Stim",
      en: "Shockwave / electrotherapy",
      lb: "Schockwellen / E-Stim",
      pt: "Ondas de choque / electroterapia",
    },
    desc: {
      fr: "Options complémentaires selon indication clinique.",
      en: "Complementary options depending on clinical indication.",
      lb: "Zousätzlech Optiounen jee no klinescher Indikatioun.",
      pt: "Opções complementares consoante a indicação clínica.",
    },
  },
];

const TEAM = [
  {
    id: "qmartin",
    name: "Quentin Martin",
    photo: "photos/qmartin.jpg",
    title: {
      fr: "Kinésithérapeute",
      en: "Physiotherapist",
      lb: "Kiné",
      pt: "Fisioterapeuta",
    },
    phone: "",
    email: "",
    languages: ["FR", "EN"],
    specialties: {
      fr: ["Orthopédique", "Sport", "Thérapie manuelle"],
      en: ["Orthopaedics", "Sports", "Manual therapy"],
      lb: ["Orthopädie", "Sport", "Manuell Therapie"],
      pt: ["Ortopedia", "Desporto", "Terapia manual"],
    },
    bio: {
      fr: "Passionné par le retour au mouvement, Quentin combine éducation thérapeutique et renforcement progressif.",
      en: "Passionate about helping people move again, Quentin combines patient education with progressive strengthening.",
      lb: "Quentin ass begeeschtert dovun, Leit erëm an d’Beweegung ze bréngen a kombinéiert Opklärung mat progressivem Kraafttraining.",
      pt: "Apaixonado por devolver o movimento às pessoas, Quentin combina educação terapêutica com reforço progressivo.",
    },
  },
  {
    id: "gsaulas",
    name: "Gaétan Saulas",
    photo: "photos/gsaulas.jpg",
    title: {
      fr: "Kinésithérapeute",
      en: "Physiotherapist",
      lb: "Kiné",
      pt: "Fisioterapeuta",
    },
    phone: "+32 470 33 22 11",
    email: "gaétansaulas@kine-athus.be",
    languages: ["FR"],
    specialties: {
      fr: ["Respiratoire", "Drainage", "Douleurs chroniques"],
      en: ["Respiratory", "Lymphatic drainage", "Chronic pain"],
      lb: ["Otem", "Lymphdrainage", "Chronesch Péng"],
      pt: ["Respiratória", "Drenagem linfática", "Dores crónicas"],
    },
    bio: {
      fr: "Approche douce et structurée, Gaétan privilégie la respiration, la posture et la rééducation fonctionnelle.",
      en: "With a gentle and structured approach, Gaétan focuses on breathing, posture and functional rehabilitation.",
      lb: "Mat enger sanfter a strukturéierter Approche léit de Gaétan de Fokus op Otem, Haltung a funktionell Reeducatioun.",
      pt: "Com uma abordagem suave e estruturada, Gaétan privilegia a respiração, a postura e a reabilitação funcional.",
    },
  },
  {
    id: "asmith",
    name: "Anna Smith",
    photo: "photos/asmith.jpg",
    title: {
      fr: "Kinésithérapeute pédiatrique",
      en: "Paediatric physiotherapist",
      lb: "Pediatrie-Kiné",
      pt: "Fisioterapeuta pediátrica",
    },
    phone: "+32 470 55 77 88",
    email: "anna@kine-athus.be",
    languages: ["FR", "EN", "NL"],
    specialties: {
      fr: ["Pédiatrie", "Respiratoire", "Pré / Post-natal"],
      en: ["Paediatrics", "Respiratory", "Pre / post-natal"],
      lb: ["Pediatrie", "Otem", "Pré / Post-natal"],
      pt: ["Pediatria", "Respiratória", "Pré / pós-natal"],
    },
    bio: {
      fr: "Spécialisée en pédiatrie, Anna accompagne bébés et enfants avec bienveillance et pédagogie.",
      en: "Specialised in paediatrics, Anna supports babies and children with care and clear explanations.",
      lb: "Als spezialiséiert Pediatrie-Kiné betreit d’Anna Bébien a Kanner mat vill Empathie an Erklärungen.",
      pt: "Especializada em pediatria, Anna acompanha bebés e crianças com muita atenção e pedagogia.",
    },
  },
  {
    id: "mboyer",
    name: "Marie Boyer",
    photo: "photos/mboyer.jpg",
    title: {
      fr: "Kinésithérapeute du sport",
      en: "Sports physiotherapist",
      lb: "Sport-Kiné",
      pt: "Fisioterapeuta desportiva",
    },
    phone: "+32 470 66 00 44",
    email: "marie@kine-athus.be",
    languages: ["FR", "EN", "DE"],
    specialties: {
      fr: ["Sport", "Orthopédique"],
      en: ["Sports", "Orthopaedics"],
      lb: ["Sport", "Orthopädie"],
      pt: ["Desporto", "Ortopedia"],
    },
    bio: {
      fr: "Marie élabore des plans de charge progressifs pour un retour au sport durable et sans rechute.",
      en: "Marie builds progressive training plans for a sustainable, relapse-free return to sport.",
      lb: "D’Marie erstellt progressiv Belaaschtungspläng fir e laangfristege Retour an de Sport ouni Réckfall.",
      pt: "Marie constrói planos de carga progressivos para um regresso ao desporto duradouro e sem recaídas.",
    },
  },
];

// ————————————————————————————————————————————————
// Icons & logo (inline SVG)
// ————————————————————————————————————————————————
function BaseIcon({ children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/70 shadow-sm backdrop-blur">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6 text-emerald-700"
      >
        {children}
      </svg>
    </span>
  );
}

function LogoBelleVue({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="bv-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#059669" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="20"
        fill="url(#bv-grad)"
      />
      {/* colline / belle-vue */}
      <path
        d="M10 40c6-6 12-9 18-9s12 3 18 9"
        fill="none"
        stroke="#ecfdf5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* colonne vertébrale stylisée */}
      <path
        d="M32 16c-2 2-3 4-3 7 0 3 1 5 3 7 2 2 3 4 3 7 0 3-1 5-3 7"
        fill="none"
        stroke="#ecfdf5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="16" r="2.4" fill="#ecfdf5" />
      {/* point de vue */}
      <circle cx="44" cy="22" r="2" fill="#a7f3d0" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <BaseIcon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.78.54 2.64a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.44-1.06a2 2 0 0 1 2.11-.45c.86.24 1.74.42 2.64.54A2 2 0 0 1 22 16.92z" />
    </BaseIcon>
  );
}

function MailIcon() {
  return (
    <BaseIcon>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </BaseIcon>
  );
}

function MapPinIcon() {
  return (
    <BaseIcon>
      <path d="M21 10c0 5-9 12-9 12S3 15 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </BaseIcon>
  );
}

function CalendarIcon() {
  return (
    <BaseIcon>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </BaseIcon>
  );
}

function OrthopedicsIcon() {
  return (
    <BaseIcon>
      <path d="M5 12l7-7 7 7" />
      <path d="M12 19V5" />
    </BaseIcon>
  );
}
function ManualTherapyIcon() {
  return (
    <BaseIcon>
      <path d="M4 12s2-4 8-4 8 4 8 4-2 4-8 4-8-4-8-4z" />
    </BaseIcon>
  );
}
function SportIcon() {
  return (
    <BaseIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
    </BaseIcon>
  );
}
function BreathingIcon() {
  return (
    <BaseIcon>
      <path d="M2 12h20M12 2v20M5 9c2 2 4 2 7 0M12 15c3 2 5 2 7 0" />
    </BaseIcon>
  );
}
function BabyIcon() {
  return (
    <BaseIcon>
      <circle cx="12" cy="8" r="3" />
      <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
    </BaseIcon>
  );
}
function LymphIcon() {
  return (
    <BaseIcon>
      <path d="M12 2C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-12z" />
    </BaseIcon>
  );
}
function ChronicPainIcon() {
  return (
    <BaseIcon>
      <path d="M12 2v20M2 12h20" />
      <circle cx="12" cy="12" r="3" />
    </BaseIcon>
  );
}
function ShockwaveIcon() {
  return (
    <BaseIcon>
      <path d="M2 12h6l2-4 4 8 2-4h6" />
    </BaseIcon>
  );
}

function MenuIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ————————————————————————————————————————————————
// Small helpers
// ————————————————————————————————————————————————
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function SectionTitle({ supertitle, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {supertitle && (
        <p className="text-sm uppercase tracking-widest text-emerald-700/80">
          {supertitle}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-slate-600">{subtitle}</p>}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[13px] font-medium text-emerald-700">
      {children}
    </span>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded-full border px-3 py-1 text-sm transition",
        active
          ? "border-emerald-600 bg-emerald-600 text-white shadow"
          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
      )}
    >
      {children}
    </button>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-800 shadow-sm outline-none ring-emerald-500/20 placeholder:text-slate-400 focus:ring"
    />
  );
}

function PrimaryButton({ children, href, onClick, className }) {
  const base = (
    <span className="inline-flex items-center gap-2">
      {children}
    </span>
  );
  return href ? (
    <a
      href={href}
      className={classNames(
        "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-emerald-700",
        className
      )}
    >
      {base}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-emerald-700",
        className
      )}
    >
      {base}
    </button>
  );
}

function SecondaryButton({ children, href, onClick, className }) {
  const base = <span className="inline-flex items-center gap-2">{children}</span>;
  return href ? (
    <a
      href={href}
      className={classNames(
        "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700",
        className
      )}
    >
      {base}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700",
        className
      )}
    >
      {base}
    </button>
  );
}

function Divider() {
  return (
    <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  );
}

// ————————————————————————————————————————————————
// Main App
// ————————————————————————————————————————————————
export default function SiteKineBelleVue() {
  const [lang, setLang] = useState("fr");
  const [activeSpec, setActiveSpec] = useState("ALL");
  const [consent, setConsent] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("kine-consent") === "ok";
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const t = I18N[lang] ?? I18N.fr;

  useEffect(() => {
    if (!consent) return;
    localStorage.setItem("kine-consent", "ok");
  }, [consent]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const allSpecs = useMemo(() => {
    const s = new Set();
    TEAM.forEach((m) => {
      const specs = m.specialties[lang] ?? m.specialties.fr;
      specs.forEach((sp) => s.add(sp));
    });
    return ["ALL", ...Array.from(s)];
  }, [lang]);

  const filteredTeam = useMemo(() => {
    return TEAM.filter((m) => {
      const specs = m.specialties[lang] ?? m.specialties.fr;
      const inSpec = activeSpec === "ALL" || specs.includes(activeSpec);
      return inSpec ;
    });
  }, [activeSpec, lang]);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    CLINIC.mapQuery
  )}&output=embed`;

  return (
    <div className="scroll-smooth bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      {/* SEO metadata à mettre dans index.html */}

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#accueil" className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600/90 text-white shadow-sm">
              <LogoBelleVue className="h-8 w-8" />
            </div>
            <div>
              <p className="text-base font-semibold">{CLINIC.name}</p>
              <p className="text-xs text-slate-500">
                {t.slogan || CLINIC.sloganFallback}
              </p>
            </div>
          </a>
          <nav className={`gap-6  hidden md:flex`}>
              <a href="#services" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navServices}
              </a>
              <a href="#installation" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.installationSupertitle}
              </a>
              <a href="#equipe" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navTeam}
              </a>
              <a href="#contact" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navContact}
              </a>
            </nav>
          <div className="hidden md:flex">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center justify-center rounded-full bg-emerald-600/90 px-4 py-2 text-sm font-medium text-white shadow-sm"
            >
              {mobileNavOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
            <nav className={`flex flex-col gap-6 pt-4 md:hidden ${mobileNavOpen ? "" : "hidden"}`}>
              <a href="#services" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navServices}
              </a>
              <a href="#installation" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.installationSupertitle}
              </a>
              <a href="#equipe" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navTeam}
              </a>
              <a href="#contact" className="text-sm text-slate-700 hover:text-emerald-700">
                {t.navContact}
              </a>
            </nav>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-xs font-medium text-slate-700">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={classNames(
                    "rounded-full px-2 py-0.5",
                    lang === l.code
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
            >
              <PhoneIcon />
              {t.heroCTA1}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/60 via-white to-emerald-50" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{t.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PrimaryButton href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>
                <PhoneIcon />
                {t.heroCTA1}
              </PrimaryButton>
              <SecondaryButton href={`mailto:${CLINIC.email}`}>
                <MailIcon />
                {t.heroCTA2}
              </SecondaryButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon /> {t.heroOpen}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPinIcon /> {t.heroAddressPrefix} {CLINIC.address.street},{" "}
                {CLINIC.address.city}
              </span>
            </div>
          </div>
          <div className="relative">
           <div className="relative rounded-3xl overflow-hidden border border-white/70 bg-white/70 shadow-lg backdrop-blur">
            <img
              src="photos/team-clinic.jpg"
              alt="Équipe de kinésithérapeutes"
              className="h-full w-full object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-14">
        <SectionTitle
          supertitle={t.servicesSupertitle}
          title={t.servicesTitle}
          subtitle={t.servicesSubtitle}
        />
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="h-full rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
            >
              <s.icon />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {s.title[lang] ?? s.title.fr}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {s.desc[lang] ?? s.desc.fr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="equipe" className="px-4 py-14">
        <SectionTitle
          supertitle={t.teamSupertitle}
          title={t.teamTitle}
          subtitle={t.teamSubtitle}
        />

        <div className="mx-auto mt-8 max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Pill
                active={activeSpec === "ALL"}
                onClick={() => setActiveSpec("ALL")}
              >
                {t.teamAll}
              </Pill>
              {allSpecs
                .filter((sp) => sp !== "ALL")
                .map((sp) => (
                  <Pill
                    key={sp}
                    active={activeSpec === sp}
                    onClick={() => setActiveSpec(sp)}
                  >
                    {sp}
                  </Pill>
                ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTeam.map((m) => (
              <article
                key={m.id}
                className="relative rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 ">

                {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-32 w-32 rounded-2xl object-cover justify-center items-center"
                    />
                  ) : (
                    <div className="h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl font-semibold text-white">
                      {m.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>
                  )}
                  
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {m.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {m.title[lang] ?? m.title.fr}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(m.specialties[lang] ?? m.specialties.fr).map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                      <p className="mt-4 text-sm text-slate-700">
                        {m.bio[lang] ?? m.bio.fr}
                      </p>
                </div>
                <Divider />
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <a
                    className="inline-flex items-center gap-2 hover:text-emerald-700"
                    href={`tel:${m.phone.replace(/\s/g, "")}`}
                  >
                    {m.phone && (
                      <a
                        className="inline-flex items-center gap-2 hover:text-emerald-700"
                        href={`tel:${m.phone.replace(/\s/g, "")}`}
                      >
                        <PhoneIcon /> {m.phone}
                      </a>
                    )}
                  </a>
                  {m.email && (
                  <a
                    className="inline-flex items-center gap-2 hover:text-emerald-700"
                    href={`mailto:${m.email}`}
                  >
                    <MailIcon /> {m.email}
                  </a>
  )}          
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="px-4 py-14 bg-emerald-50/40">
        <SectionTitle
          supertitle={t.installationSupertitle}
          title={t.installationTitle}
          subtitle={t.installationSubtitle}
        />
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSTALLATION_IMAGES.map((img) => (
            <figure
              key={img.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm"
            >
              <img
                src={img.src}
                alt={img.label[lang] ?? img.label.fr}
                className="h-56 w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-slate-700">
                {img.label[lang] ?? img.label.fr}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 py-14">
        <SectionTitle
          supertitle={t.contactSupertitle}
          title={t.contactTitle}
          subtitle={t.contactSubtitle}
        />
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className="space-y-3 text-sm text-slate-700 flex flex-col ">
              <p className="inline-flex items-center gap-2">
                <MapPinIcon /> {t.contactAddressLabel}: {CLINIC.address.street},{" "}
                {CLINIC.address.city}, {CLINIC.address.country}
              </p>
              <p className="inline-flex items-center gap-2">
                <PhoneIcon />
                <a
                  className="hover:text-emerald-700"
                  href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}
                >
                  {CLINIC.phone}
                </a>
              </p>
              <p className="inline-flex items-center gap-2">
                <MailIcon />
                <a
                  className="hover:text-emerald-700"
                  href={`mailto:${CLINIC.email}`}
                >
                  {CLINIC.email}
                </a>
              </p>
            </div>
            <Divider />
            <ContactForm t={t} />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Plan d'accès"
              src={mapSrc}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} {CLINIC.name} — {CLINIC.domain}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="#mentions"
              onClick={(e) => {
                e.preventDefault();
                openLegal();
              }}
              className="text-slate-600 hover:text-emerald-700"
            >
              {t.footerLegal}
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="#rgpd"
              onClick={(e) => {
                e.preventDefault();
                openPrivacy();
              }}
              className="text-slate-600 hover:text-emerald-700"
            >
              {t.footerPrivacy}
            </a>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      {!consent && (
        <div className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">{t.cookieText}</p>
            <div className="flex gap-2">
              <SecondaryButton onClick={() => setConsent(true)}>
                {t.cookieOK}
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple contact form -> opens default email client
function ContactForm({ t }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(
      (langLabelFromCode(document.documentElement.lang) || "Demande") +
        " – " +
        name
    );
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${CLINIC.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {t.contactFormName}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 shadow-sm outline-none ring-emerald-500/20 placeholder:text-slate-400 focus:ring"
          placeholder={t.contactFormNamePlaceholder}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {t.contactFormEmail}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 shadow-sm outline-none ring-emerald-500/20 placeholder:text-slate-400 focus:ring"
          placeholder={t.contactFormEmailPlaceholder}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {t.contactFormMessage}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 shadow-sm outline-none ring-emerald-500/20 placeholder:text-slate-400 focus:ring"
          placeholder={t.contactFormMessagePlaceholder}
        />
      </div>
      <div className="pt-2">
        <PrimaryButton className="w-full justify-center" onClick={undefined}>
          {t.contactFormSubmit}
        </PrimaryButton>
      </div>
    </form>
  );
}

function langLabelFromCode(code) {
  switch (code) {
    case "fr":
      return "Demande d'information";
    case "en":
      return "Information request";
    case "lb":
      return "Ufro";
    case "pt":
      return "Pedido de informação";
    default:
      return "Demande";
  }
}

// Minimal legal popups (actuellement en FR)
function openLegal() {
  const id = "legal-modal";
  if (document.getElementById(id)) return;
  const wrapper = document.createElement("div");
  wrapper.id = id;
  wrapper.className =
    "fixed inset-0 z-50 grid place-items-center bg-black/50 p-4";
  wrapper.innerHTML = `
    <div class="w-full max-w-3xl rounded-3xl border border-white/10 bg-white p-6 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-slate-900">Mentions légales</h3>
        <button aria-label="Fermer" class="rounded-full p-2 hover:bg-slate-100" onclick="document.getElementById('${id}').remove()">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="mt-4 text-sm text-slate-700 space-y-2">
        <p><strong>Éditeur :</strong> ${CLINIC.name} — ${CLINIC.address.street}, ${CLINIC.address.city}, ${CLINIC.address.country}</p>
        <p><strong>Contact :</strong> ${CLINIC.email} — ${CLINIC.phone}</p>
        <p><strong>Hébergement :</strong> à compléter (Vercel, Netlify, OVH, …)</p>
        <p><strong>Responsable de publication :</strong> à compléter</p>
        <p><strong>Nom de domaine :</strong> ${CLINIC.domain}</p>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
}

function openPrivacy() {
  const id = "privacy-modal";
  if (document.getElementById(id)) return;
  const wrapper = document.createElement("div");
  wrapper.id = id;
  wrapper.className =
    "fixed inset-0 z-50 grid place-items-center bg-black/50 p-4";
  wrapper.innerHTML = `
    <div class="w-full max-w-3xl rounded-3xl border border-white/10 bg-white p-6 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-slate-900">Politique de confidentialité (RGPD)</h3>
        <button aria-label="Fermer" class="rounded-full p-2 hover:bg-slate-100" onclick="document.getElementById('${id}').remove()">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="mt-4 text-sm text-slate-700 space-y-2">
        <p>Nous collectons uniquement les informations nécessaires pour vous répondre (nom, e-mail, contenu du message). Elles ne sont jamais partagées à des tiers et sont conservées le temps du traitement de votre demande.</p>
        <p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données : écrivez-nous à <a class="text-emerald-700 underline" href="mailto:${CLINIC.email}">${CLINIC.email}</a>.</p>
        <p>Cookies : ce site n’utilise que des cookies techniques indispensables au fonctionnement (aucun traçeur publicitaire).</p>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
}
          {/* Mobile/compact navigation (if present) */}
          {/* If you have a mobile or compact nav, add the Installation link after Services here as well */}