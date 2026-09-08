// Pour ajouter une image d'aperçu : dépose le fichier dans src/image/
// puis importe-le ici et renseigne la propriété "image" du projet.
import weimarInstitut from '../../image/weimar.jpeg';
import renoBioPlus from '../../image/Reno.jpeg';
import adidasRefonte from '../../image/adidas-refonte-preview.jpeg';
import ecomnetPortfolio from '../../image/ecomnet-portfolio-preview.png.jpeg';
import employeeMeetingApp from '../../image/employee-meeting-app-preview.png.jpeg';
import treasuresOfHope from '../../image/treasures-of-hope-preview.jpeg';

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
  {
    id: 4,
    image: ecomnetPortfolio,
    title: "eComNet — Portfolio d'un e-commerçant",
    category: 'UI/UX Design — Maquette Web',
    desc: "Projet réalisé dans le cadre de ma formation, consistant à concevoir la maquette d'un portfolio professionnel pour un e-commerçant. L'objectif était de créer une interface moderne, minimaliste et professionnelle permettant de présenter son activité, son expérience et ses réalisations. La page d'accueil met en avant les informations essentielles du profil, les coordonnées, les statistiques d'expérience ainsi qu'un accès aux différents projets réalisés. Une attention particulière a été portée à la hiérarchie visuelle, à la navigation et à la mise en valeur des informations importantes. Type de projet : projet scolaire — maquette / conception UI/UX.",
    tech: ['Figma', 'UI Design', 'UX Design', 'Prototypage', 'Design responsive', "Conception d'interface"],
    link: 'https://www.figma.com/design/20M6MHTu0LEVB6um4bgIra/Untitled?m=dev&t=l5lR5BFeR7AYAsGe-1',
  },
  {
    id: 5,
    image: employeeMeetingApp,
    title: 'Employee & Meeting Management App',
    category: 'App — UI/UX Design',
    desc: "Projet réalisé dans le cadre de ma formation, consistant à concevoir une application mobile de gestion des employés et des réunions. L'application a pour objectif de faciliter la gestion des collaborateurs et l'organisation des réunions au sein d'une entreprise. Elle permet notamment de centraliser les informations liées aux employés, de gérer les réunions et de faciliter leur organisation. J'ai conçu l'interface en mettant l'accent sur une expérience utilisateur simple et intuitive, avec une navigation adaptée aux usages mobiles et une identité visuelle moderne. Type de projet : projet scolaire — conception d'une application mobile.",
    tech: ['Figma', 'UI Design', 'UX Design', 'Prototypage', 'Mobile Design', 'Design responsive'],
    link: 'https://www.figma.com/design/6Fq0XMkdJP5V5ZnLuBdugZ/App-reunion?node-id=0-1&m=dev&t=KQQ8kw74D36sp8yZ-1',
  },
  {
    id: 6,
    image: treasuresOfHope,
    title: 'Treasures of Hope — Charity Website',
    category: 'UI/UX Design — Maquette Web',
    desc: "Projet réalisé dans le cadre de ma formation, consistant à concevoir la maquette d'un site web pour une organisation caritative appelée Treasures of Hope. Le site a pour objectif de présenter la mission de l'association et de mettre en avant ses différentes actions en faveur des personnes dans le besoin, notamment dans les domaines de la santé, de l'accès à l'eau, de l'aide sociale et du développement de communautés. La page d'accueil présente une section d'introduction avec un message de sensibilisation, la mission de Treasures of Hope, ses principales actions (Medicine Help, We Build and Create, Water Delivery, We Care About), des statistiques sur les personnes aidées, les dons collectés et les projets réalisés, une section présentant les causes et projets soutenus, ainsi que des boutons pour découvrir les causes, devenir volontaire, contacter l'organisation ou faire un don, avec une navigation Home / About Us / Causes / Volunteer / Contact et un choix de langue. L'objectif était de créer une interface humaine, rassurante et moderne, en utilisant une identité visuelle associant le bleu foncé et le vert clair. Type de projet : projet scolaire — maquette et conception UI/UX.",
    tech: ['Figma', 'UI Design', 'UX Design', 'Prototypage', 'Web Design', 'Responsive Design', "Architecture d'une page web"],
    link: 'https://www.figma.com/design/fpSfd5HAKnUGEOqlCve66Y/Treasures-of-hope?node-id=0-1&m=dev&t=AiFCrwri6vfs45vz-1',
  },
];

export const projectsNav = [
  { name: 'Tous' },
  { name: 'Web' },
  { name: 'App' },
  { name: 'UI/UX Design — Maquette Web' },
  { name: 'App — UI/UX Design' },
];
