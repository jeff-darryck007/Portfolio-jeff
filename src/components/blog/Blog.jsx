import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './Blog.css';

const posts = [
  {
    id: 1,
    category: 'Astuce',
    date: 'Août 2024',
    readTime: '2 min',
    title: 'Mes outils IA préférés pour coder plus vite au quotidien',
    excerpt: 'Claude, Gemini, GROK — comment j\'intègre les assistants IA dans mon workflow quotidien pour l\'optimisation de code, le refactoring et la résolution de bugs complexes.',
    tags: ['IA', 'Productivité', 'Workflow'],
    icon: 'uil-robot',
    color: '#8B5CF6',
    paragraphs: [
      'L\'IA ne remplace pas le développeur — elle l\'amplifie. Voici mon workflow quotidien.',
      '**1. Claude (Anthropic) :** Pour les explications, refactoring et architecture. Excellent pour comprendre du code legacy et générer de la documentation.',
      '**2. GROK :** Pour les questions techniques rapides et la recherche de patterns dans du code complexe.',
      '**3. Gemini :** Intégré à l\'IDE pour la complétion contextuelle et la génération de tests unitaires.',
      '**Règle d\'or :** Ne jamais copier-coller de l\'IA sans comprendre. L\'IA génère, toi tu valides, tu adaptes, tu testes. C\'est le contrat.',
    ],
  },
];

const CATEGORIES = ['Tous', 'Projet', 'Technique', 'Algorithme', 'Parcours', 'Astuce'];

const BlogCard = ({ post, onClick }) => (
  <article className="blog__card reveal-scale" onClick={() => onClick(post)}>
    <div className="blog__card-header" style={{ '--post-color': post.color }}>
      <span className="blog__card-category">{post.category}</span>
      <i className={`uil ${post.icon} blog__card-icon`} />
    </div>
    <div className="blog__card-body">
      <div className="blog__card-meta">
        <span><i className="uil uil-calendar-alt" /> {post.date}</span>
        <span><i className="uil uil-clock" /> {post.readTime}</span>
      </div>
      <h3 className="blog__card-title">{post.title}</h3>
      <p className="blog__card-excerpt">{post.excerpt}</p>
      <div className="blog__card-tags">
        {post.tags.map(tag => <span key={tag} className="blog__tag">{tag}</span>)}
      </div>
      <button className="blog__read-btn">Lire l'article <i className="uil uil-arrow-right" /></button>
    </div>
  </article>
);

const BlogModal = ({ post, onClose }) => {
  useEffect(() => {
    if (!post) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [post, onClose]);

  if (!post) return null;

  return createPortal(
    <div className="blog__modal-overlay" onClick={onClose}>
      <div className="blog__modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="blog__modal-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="uil uil-times" />
        </button>

        <div className="blog__modal-header" style={{ '--post-color': post.color }}>
          <span className="blog__card-category">{post.category}</span>
          <i className={`uil ${post.icon} blog__modal-icon`} />
        </div>

        <div className="blog__modal-body">
          <div className="blog__card-meta">
            <span><i className="uil uil-calendar-alt" /> {post.date}</span>
            <span><i className="uil uil-clock" /> {post.readTime}</span>
          </div>
          <h2 className="blog__modal-title">{post.title}</h2>
          <div className="blog__card-tags" style={{ marginBottom: '1.75rem' }}>
            {post.tags.map(tag => <span key={tag} className="blog__tag">{tag}</span>)}
          </div>
          <div className="blog__modal-content">
            {post.paragraphs.map((para, i) => (
              <p key={i} className="blog__modal-para">
                {para.includes('**') ? (
                  <>
                    <strong>{para.split('**')[1]}</strong>
                    {para.split('**')[2] || ''}
                  </>
                ) : para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedPost, setSelectedPost]     = useState(null);

  const filtered = activeCategory === 'Tous'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <section className="blog section" id="blog">
      <span className="section__subtitle">Aventures & Apprentissages</span>
      <h2 className="section__title reveal">Mon Blog</h2>

      <div className="blog__filters reveal d1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={`blog__filter-btn${activeCategory === cat ? ' blog__filter-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blog__grid container">
        {filtered.map(post => (
          <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
        ))}
      </div>

      <div className="blog__cta reveal d3">
        <p className="blog__cta-text">Tu as une question, un projet ou tu veux échanger sur la tech ?</p>
        <Link to="/contact" className="button button--accent button--flex">
          Me contacter <i className="uil uil-message button__icon" />
        </Link>
      </div>

      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};

export default Blog;
