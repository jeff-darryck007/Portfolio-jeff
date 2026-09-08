// Pour ajouter une image d'aperçu : dépose le fichier dans src/image/
// puis importe-le ici et renseigne la propriété "image" du projet.
import weimarInstitut from '../../image/weimar.jpeg';
import renoBioPlus from '../../image/Reno.jpeg';
import adidasRefonte from '../../image/adidas-refonte-preview.jpeg';

export const projectsData = [
  {
    id: 1,
    image: weimarInstitut,
    title: 'Weimar Institut — Formations linguistiques & accompagnement international',
    category: 'Web',
    desc: "Site vitrine pour Weimar Institut, un centre de formation linguistique et d'accompagnement aux procédures internationales. Le site présente les formations proposées (allemand, préparation TCF/TEF) ainsi que les services d'accompagnement pour les projets d'études, de travail, d'Ausbildung, de visa et d'installation à l'étranger. Il met aussi en avant les destinations couvertes, les témoignages d'étudiants et les moyens de contact.",
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    link: 'https://weimar-institut.com/',
  },
  {
    id: 2,
    image: renoBioPlus,
    title: 'RenoBioPlus',
    category: 'Web',
    desc: "Site web de RenoBioPlus, conçu pour présenter l'activité et les services de l'entreprise à travers une interface web moderne et accessible.",
    tech: ['Symfony', 'PHP', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://renobioplus.com/',
  },
  {
    id: 3,
    image: adidasRefonte,
    title: 'Refonte Adidas Website',
    category: 'UI/UX Design — Maquette Web',
    desc: "Projet réalisé dans le cadre de ma formation, ayant pour objectif de concevoir une refonte moderne du site web d'Adidas. L'objectif était de repenser l'interface et l'expérience utilisateur tout en conservant l'identité visuelle forte de la marque. J'ai travaillé sur la conception des différentes interfaces, la hiérarchie des informations, la navigation et la mise en valeur des produits afin de proposer une expérience plus moderne, dynamique et adaptée au web. Le projet a été entièrement conçu sous Figma, de la réflexion sur l'interface jusqu'à la réalisation des différentes maquettes. Type de projet : projet scolaire / conception d'interface.",
    tech: ['Figma', 'UI Design', 'UX Design', 'Wireframing', 'Prototypage', 'Design responsive'],
    link: 'https://www.figma.com/design/L0vbylam7D2we0O7l7UiAB/Refonte-adidas-website?node-id=93-79&t=8TcCIRtXsgmMTCFP-1',
  },
];

export const projectsNav = [
  { name: 'Tous' },
  { name: 'Web' },
  { name: 'App' },
  { name: 'Bot' },
  { name: 'Game' },
  { name: 'UI/UX Design — Maquette Web' },
];
