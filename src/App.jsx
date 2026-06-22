import React, { useState } from 'react';
import './index.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 bg-[#f5f5f5] border border-[#e5e5e5] p-1.5 rounded-full shadow-sm">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === 'home' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === 'projects' ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18M2.25 13.5l1.117-7.261A2.25 2.25 0 015.597 4.25h12.806a2.25 2.25 0 012.23 2.011l1.117 7.239m-18 0v6.75A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25v-6.75M15.375 12h.008v.008h-.008V12zm3 0h.008v.008h-.008V12z" />
            </svg>
            <span>Projects</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-400 cursor-not-allowed select-none relative group">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Blog</span>
            <span className="text-[10px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-md font-normal scale-90 tracking-wide">
              soon
            </span>
          </div>
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
                <a href="https://t.me/ulugbekovx">
                  <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm">
                    <span>Hire Me</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </a>
                <a href="https://drive.usercontent.google.com/u/0/uc?id=1-cOlOGMEgqCGcWF_Vygf8PjAKxYeB-3W&export=download">
                  <button className="flex items-center gap-2 bg-white text-black border border-neutral-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>Download CV</span>
                  </button>
                </a>
              </div>

              <div className="pt-6 border-t border-neutral-200 flex items-center gap-6">
                <span className="text-sm font-medium text-neutral-500">Follow me:</span>
                <div className="flex items-center gap-4 text-neutral-700">
                  <a href="https://github.com/ulugbekovpy" className="hover:text-black transition-colors" aria-label="GitHub">
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://discord.com/users/1127295218455158845" className="hover:text-black transition-colors" aria-label="Discord">
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.77-11,68.43,68.43,0,0,1-10.64-5.12c.91-.67,1.81-1.37,2.65-2.1a75.22,75.22,0,0,0,72.64,0c.84.73,1.74,1.43,2.65,2.1a68.43,68.43,0,0,1-10.64,5.12,74.37,74.37,0,0,0,6.77,11,105.73,105.73,0,0,0,31-18.83C129,54.65,123.51,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z" />
                    </svg>
                  </a>
                  <a href="https://t.me/ulugbekovpy" className="hover:text-black transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                    </svg>
                  </a>
                </div>
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
                  tags: ["Python", "Requests"]
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
                      <h3 className="font-semibold text-lg text-neutral-900 group-hover:underline cursor-pointer">{project.name}</h3>
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
      </main>
    </div>
  );
}