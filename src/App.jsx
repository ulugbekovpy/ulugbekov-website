import React, { useState, useEffect } from 'react';
import './index.css';

const TELEGRAM_CHANNEL_USERNAME = 'ulugbekovpy'; 

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') || 'home';
  });

  const [selectedPostId, setSelectedPostId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post') || null;
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentPage === 'home') {
      url.searchParams.delete('page');
      url.searchParams.delete('post');
    } else if (currentPage === 'blog-view' && selectedPostId) {
      url.searchParams.set('page', 'blog');
      url.searchParams.set('post', selectedPostId);
    } else {
      url.searchParams.set('page', currentPage);
      url.searchParams.delete('post');
    }
    window.history.pushState({}, '', url.toString());
  }, [currentPage, selectedPostId]);

  useEffect(() => {
    if (currentPage === 'blog' || currentPage === 'blog-view') {
      setLoading(true);
      
      const channelUrl = `https://t.me/s/${TELEGRAM_CHANNEL_USERNAME}`;
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      // Если мы на Netlify, используем внутренний прокси /api-telegram/, если локально — массив сторонних
      const proxies = isLocalhost 
        ? [
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(channelUrl)}`,
            `https://cors-anywhere.azm.workers.dev/${channelUrl}`,
            `https://api.allorigins.win/get?url=${encodeURIComponent(channelUrl)}`
          ]
        : [`/api-telegram/${TELEGRAM_CHANNEL_USERNAME}`];

      const fetchWithFallback = (proxyIndex) => {
        if (proxyIndex >= proxies.length) {
          setLoading(false);
          return;
        }

        fetch(proxies[proxyIndex])
  .then(res => {
    if (!res.ok) throw new Error('Сетевая ошибка');
    
    // Проверяем тип контента, который вернул сервер
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json(); // Если это JSON (локалка со сторонними прокси)
    } else {
      return res.text(); // Если это чистый HTML (Netlify продакшн)
    }
  })
  .then(data => {
    // Гарантированно получаем строку HTML, независимо от источника
    let htmlString = '';
    
    if (typeof data === 'string') {
      htmlString = data; // Для Netlify
    } else if (data && typeof data === 'object') {
      htmlString = data.contents || data.result || ''; // Для старых прокси
    }

    if (!htmlString) throw new Error('Пустой HTML');

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const widgetPosts = doc.querySelectorAll('.tgme_widget_message');

            if (widgetPosts.length === 0) throw new Error();

            const fetchedPosts = Array.from(widgetPosts).map((postEl, index) => {
              const linkEl = postEl.querySelector('.tgme_widget_message_date');
              const postLink = linkEl ? linkEl.getAttribute('href') : '';
              const id = postLink ? postLink.split('/').pop() : `post-${index}`;

              const textEl = postEl.querySelector('.tgme_widget_message_text');
              const contentHtml = textEl ? textEl.innerHTML : 'Пустая заметка или медиафайл';
              const cleanText = textEl ? textEl.textContent.substring(0, 160) + '...' : 'Медиафайл...';

              const titleText = textEl 
                ? textEl.textContent.split('\n')[0].substring(0, 60) + (textEl.textContent.split('\n')[0].length > 60 ? '...' : '')
                : `Заметка #${id}`;

              const photoEl = postEl.querySelector('.tgme_widget_message_photo_wrap');
              let image = null;
              if (photoEl) {
                const bgImg = photoEl.getAttribute('style');
                const imgMatch = bgImg ? bgImg.match(/url\(['"]?([^'"]+)['"]?\)/) : null;
                if (imgMatch && imgMatch[1]) {
                  image = imgMatch[1];
                }
              }

              const dateEl = postEl.querySelector('.time');
              const dateText = dateEl ? dateEl.textContent : 'Недавно';

              return {
                id,
                title: titleText,
                date: dateText,
                excerpt: cleanText,
                content: contentHtml,
                image: image,
                link: postLink || `https://t.me/${TELEGRAM_CHANNEL_USERNAME}/${id}`,
                tags: ["Telegram", "Live"]
              };
            }).reverse();

            setPosts(fetchedPosts);
            setLoading(false);
          })
          .catch(() => {
            fetchWithFallback(proxyIndex + 1);
          });
      };

      fetchWithFallback(0);
    }
  }, [currentPage]);

  const currentPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 bg-[#f5f5f5] border border-[#e5e5e5] p-1.5 rounded-full shadow-sm">
          <button
            onClick={() => { setCurrentPage('home'); setSelectedPostId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === 'home' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Home</span>
          </button>

          <button
            onClick={() => { setCurrentPage('projects'); setSelectedPostId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === 'projects' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18M2.25 13.5l1.117-7.261A2.25 2.25 0 015.597 4.25h12.806a2.25 2.25 0 012.23 2.011l1.117 7.239m-18 0v6.75A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25v-6.75M15.375 12h.008v.008h-.008V12zm3 0h.008v.008h-.008V12z" />
            </svg>
            <span>Projects</span>
          </button>

          <button
            onClick={() => { setCurrentPage('blog'); setSelectedPostId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === 'blog' || currentPage === 'blog-view' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Blog</span>
          </button>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16 min-h-screen flex flex-col justify-center">
        {currentPage === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 order-2 md:order-1">
              <div className="inline-flex items-center gap-1.5 bg-[#f0f0f0] text-neutral-700 text-xs px-3 py-1.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for new projects
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                  Hi, I'm ulugbekov
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 flex items-center gap-1">
                  Fullstack and mobile developer<span className="animate-blink font-light">|</span>
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed max-w-lg">
                Aviation Engineering student at Turin Polytechnic University. I bridge the gap between complex aerospace systems and software development, focusing on building high-performance web backends with Python and cross-platform mobile experiences using React Native.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Tashkent, Uzbekistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-1.875-2.217A15.004 15.004 0 0012 11.25c-2.83 0-5.43 1.11-7.375 2.933a2.25 2.25 0 00-1.875 2.217m16.5 0v-2.25C20.25 7.422 16.097 3.31 11.162 3.535a10.5 10.5 0 00-8.912 8.35v2.265" />
                  </svg>
                  <span>Available Now</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://t.me/ulugbekovx" target="_blank" rel="noreferrer">
                  <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm">
                    <span>Hire Me</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </a>
                <a href="https://drive.usercontent.google.com/u/0/uc?id=1-cOlOGMEgqCGcWF_Vygf8PjAKxYeB-3W&export=download" target="_blank" rel="noreferrer">
                  <button className="flex items-center gap-2 bg-white text-black border border-neutral-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Download CV</span>
                  </button>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-[360px] aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-50 flex items-end">
                <img
                  src="https://habrastorage.org/webt/bc/1b/d9/bc1bd9a14307a6ed0d25f29025ffb776.jpg"
                  alt="Avatar Illustration"
                  className="w-full h-full object-cover object-center mix-blend-darken"
                />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
              <p className="text-neutral-500 text-sm">A collection of things I've built with code.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Boeing Music Bot",
                  year: "2026",
                  desc: "An async Telegram music bot that searches and streams tracks in real-time.",
                  tags: ["Python", "Requests"],
                  link: "https://github.com/ulugbekovpy/boeingmusicbot"
                },
                {
                  name: "TV Info API",
                  year: "2025",
                  desc: "A high-performance RESTful API designed to fetch, aggregate, and deliver real-time television programming data and show schedules with minimal latency.",
                  tags: ["Python", "FastAPI", "REST API"]
                },
                {
                  name: "Flibusta API",
                  year: "2024",
                  desc: "A backend service and integration layer built to index, search, and manage digital library catalogs efficiently through automated proxy routing pipelines.",
                  tags: ["Python", "API Integration", "Scraping"]
                },
                {
                  name: "Dream Workspace",
                  year: "2026",
                  desc: "A sleek, minimalist digital workspace designed for productivity, allowing seamless task management, tracking, and organization of development workflows.",
                  tags: ["Django", "Django Templates", "Local Storage"]
                }
              ].map((project) => (
                <div key={project.name} className="group border border-neutral-200 rounded-xl p-5 hover:border-black transition-all bg-white shadow-sm flex flex-col justify-between min-h-[180px]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          <h3 className="font-semibold text-lg text-neutral-900 group-hover:underline cursor-pointer">{project.name}</h3>
                        </a>
                      ) : (
                        <h3 className="font-semibold text-lg text-neutral-900">{project.name}</h3>
                      )}
                      <span className="text-xs text-neutral-400 font-mono">{project.year}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-4 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-mono bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'blog' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto w-full">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
              <p className="text-neutral-500 text-sm">Posts from telegram channel @ulugbekovpy</p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-sm text-neutral-400 font-mono animate-pulse">
                Fetching fresh posts...
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => {
                  return (
                    <article 
                      key={post.id} 
                      onClick={() => { setSelectedPostId(post.id); setCurrentPage('blog-view'); }}
                      className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-black transition-all bg-white shadow-sm cursor-pointer flex flex-col md:flex-row min-h-[160px]"
                    >
                      {post.image && (
                        <div className="md:w-1/3 w-full h-48 md:h-auto overflow-hidden bg-neutral-50 relative">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                            <span>{post.date}</span>
                            <div className="flex items-center gap-2">
                              {post.tags.map(tag => (
                                <span key={tag} className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[10px]">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <h3 className="font-bold text-xl text-neutral-900 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                          <span className="text-xs font-medium text-neutral-400 group-hover:text-black transition-colors flex items-center gap-1">
                            Read
                            <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {currentPage === 'blog-view' && currentPost && (
          <div className="animate-fadeIn max-w-2xl mx-auto w-full space-y-8">
            <button 
              onClick={() => setCurrentPage('blog')}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black transition-colors group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to list</span>
            </button>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>{currentPost.date}</span>
                <span>•</span>
                <a href={currentPost.link} target="_blank" rel="noreferrer" className="underline hover:text-black">View in Telegram</a>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                {currentPost.title}
              </h1>
            </div>

            {currentPost.image && (
              <div className="w-full max-h-[440px] overflow-hidden rounded-xl bg-neutral-100 shadow-sm">
                <img src={currentPost.image} alt="Post media content" className="w-full h-full object-cover" />
              </div>
            )}

            <hr className="border-neutral-200" />

            <div 
              className="prose prose-neutral max-w-none text-neutral-800 text-base leading-relaxed space-y-4 blog-content-html"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />
          </div>
        )}
      </main>
    </div>
  );
}