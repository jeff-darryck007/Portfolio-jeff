// Pour ajouter une image d'aperçu : dépose le fichier dans src/image/
// puis importe-le ici et renseigne la propriété "image" du projet.
import weimarInstitut from '../../image/weimar.jpeg';

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
];

export const projectsNav = [
  { name: 'Tous' },
  { name: 'Web' },
  { name: 'App' },
  { name: 'Bot' },
  { name: 'Game' },
];
