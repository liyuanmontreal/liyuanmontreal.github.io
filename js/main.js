
;(async () => {
  async function loadLocale(lang) {
    const res = await fetch(`i18n/${lang}.json`)
    
    return await res.json()
  }
  const messages = {
    en: await loadLocale('en'),
    zh: await loadLocale('zh'),
    fr: await loadLocale('fr')
  }

  const { createApp, ref, onMounted } = Vue
  const { createI18n } = VueI18n

  const i18n = createI18n({ legacy: false, locale: 'en', messages })

  const App = {
    setup() {
      const { t, locale } = VueI18n.useI18n()
      const research = ref([])
      const applied = ref([])
      const articles = ref([])

      const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const stored = localStorage.getItem('theme')
      const theme = ref(stored ? stored : (preferredDark ? 'dark' : 'light'))
      const applyTheme = () => {
        document.documentElement.classList.toggle('dark', theme.value === 'dark')
        localStorage.setItem('theme', theme.value)
      }
      applyTheme()
      const toggleTheme = () => { theme.value = theme.value === 'dark' ? 'light' : 'dark'; applyTheme() }

      onMounted(async () => {
        research.value = await (await fetch('data/research.json')).json()
        applied.value = await (await fetch('data/applied.json')).json()
        articles.value = await (await fetch('data/articles.json')).json()

        if (window.particlesJS) {
          const colors = theme.value === 'dark' ? ["#60a5fa", "#a78bfa", "#22d3ee"] : ["#7dd3fc", "#a78bfa", "#22d3ee"]
          particlesJS('particles-js', {
            particles: {
              number: { value: 70, density: { enable: true, value_area: 900 } },
              color: { value: colors },
              shape: { type: "circle" },
              //opacity: { value: theme.value === 'dark' ? 0.45 : 0.25 },
              opacity: { value: 0.45 },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 140, color: colors[0], opacity: theme.value === 'dark' ? 0.25 : 0.2, width: 1 },
              move: { enable: true, speed: 1.05, out_mode: "out" }
            },
            interactivity: {
              detect_on: "canvas",
              events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
              modes: { grab: { distance: 160, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
            },
            retina_detect: true
          })
        }
      })

      const switchLang = (l) => {
        locale.value = l
        localStorage.setItem('locale', l)   // project.html 调用
      }

      const links = {
        email: "liyuan.montreal_at_gmail.com",
        linkedin: "https://www.linkedin.com/in/yuan-li-mtl/",
        github: "https://github.com/liyuanmontreal",
        kaggle: "https://www.kaggle.com/yuanlimtl"
      }

      return { t, locale, switchLang, theme, toggleTheme, research, applied, articles, links }
    },
    template: `
      <div class="relative min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors">
        <div id="particles-js" class="fixed inset-0 -z-10"></div>

        <nav class="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div class="text-xl md:text-2xl font-bold tracking-wide text-sky-700 dark:text-sky-300">Yuan Li · AI</div>
          <div class="flex items-center gap-4 md:gap-6 text-sm">
            <a href="#" class="hover:text-sky-700 dark:hover:text-sky-300">{{ t('nav.home') }}</a>
            <a href="#projects" class="hover:text-sky-700 dark:hover:text-sky-300">{{ t('sections.projects') }}</a>           
            <a href="#articles" class="hover:text-sky-700 dark:hover:text-sky-300">{{ t('sections.articles') }}</a>

     
            <div class="flex gap-2">
              <button v-for="l in ['en','zh','fr']"
                :key="l"
                @click="switchLang(l)"
                :class="['px-2 py-1 rounded border transition',
                  theme==='dark' ? (locale===l ? 'bg-sky-500 text-white border-sky-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700')
                                  : (locale===l ? 'bg-sky-600 text-white border-sky-600' : 'bg-white border-slate-300 hover:bg-slate-100')]">
                {{ l.toUpperCase() }}
              </button>
            </div>
          </div>
        </nav>

        <header class="max-w-6xl mx-auto px-6 mt-10 md:mt-20 text-center">
          <img src="assets/avatar.png" alt="avatar" class="mx-auto w-24 h-24 rounded-full mb-6 ring-2 ring-sky-500/40 dark:ring-sky-400/60">
          <h1 class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-fuchsia-600 to-cyan-600 dark:from-sky-400 dark:via-fuchsia-400 dark:to-cyan-300">
            {{ t('hero.greeting') }}
          </h1>
          <h2 class="mt-3 text-lg md:text-2xl text-sky-700 dark:text-sky-200">{{ t('hero.title') }}</h2>
          <p class="mt-2 md:mt-3 text-slate-700 dark:text-slate-300">{{ t('hero.subtitle') }}</p>
        </header>

        <section id="interests" class="max-w-6xl mx-auto px-6 mt-10">
          <h3 class="text-xl md:text-2xl font-semibold  text-sky-700 dark:text-sky-300  mb-3">{{ t('interests.title') }}</h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('interests.text') }}</p>
        </section>

        <!-- PROJECTS 容器：内部再分 Research / Application 两个子块 -->
        <section id="projects" class="max-w-6xl mx-auto px-6 mt-12">
          <h3 class="text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-6">{{ t('sections.projects') }}</h3>

          <!-- 子小节 Research -->
          <div id="projects-research" class="mt-2 mb-3 text-sky-400/90 font-medium">{{ t('sections.research') }}</div>
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="p in research" :key="p.name"
              class="bg-white border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 backdrop-blur rounded-2xl overflow-hidden hover:border-sky-400/50 dark:hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-sky-500/20 transition">
              <img :src="p.image" class="w-full h-44 object-cover" alt="">
              <div class="p-4">
                <div class="text-base md:text-lg font-semibold text-sky-700 dark:text-sky-300">{{ p.name }}</div>
                <p class="mt-1 text-sm text-slate-700 dark:text-slate-300">{{ p.description[locale] }}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="tag in p.tech" :key="tag"
                    class="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-700/70 dark:border-slate-600 dark:text-slate-200">{{ tag }}</span>
                </div>
                <div class="mt-4 flex gap-2">
                  <a v-if="p.github" :href="p.github" target="_blank" rel="noopener"
                    class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition">
                    {{ t('projects.view_code') }}
                  </a>
                  <!-- 新增：Details（跳转到项目详情页） -->
                  <a :href="'project.html?slug=' + (p.slug || encodeURIComponent(p.name))"
                      class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition">
                      {{ t('sections.read_more') }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 子小节 Application -->
          <div id="projects-application" class="mt-10 mb-3 text-sky-400/90 font-medium">{{ t('sections.applied') }}</div>
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="p in applied" :key="p.name"
              class="bg-white border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 backdrop-blur rounded-2xl overflow-hidden hover:border-sky-400/50 dark:hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-sky-500/20 transition">
              <img :src="p.image" class="w-full h-44 object-cover" alt="">
              <div class="p-4">
                <div class="text-base md:text-lg font-semibold text-sky-700 dark:text-sky-300">{{ p.name }}</div>
                <p class="mt-1 text-sm text-slate-700 dark:text-slate-300">{{ p.description[locale] }}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="tag in p.tech" :key="tag"
                    class="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-700/70 dark:border-slate-600 dark:text-slate-200">{{ tag }}</span>
                </div>
                <div class="mt-4 flex gap-2">
                  <a v-if="p.github" :href="p.github" target="_blank" rel="noopener"
                    class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition">
                    {{ t('projects.view_code') }}
                  </a>
                  <!-- 新增：Details -->
                  <a :href="'project.html?slug=' + (p.slug || encodeURIComponent(p.name))"
                    class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition">
                    {{ t('sections.read_more') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Articles（改为 read more 跳 article.html） -->
        <section id="articles" class="max-w-6xl mx-auto px-6 mt-12">
          <h3 class="text-xl md:text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-6">{{ t('sections.articles') }}</h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div v-for="a in articles" :key="a.title.en"
                class="bg-white border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 rounded-2xl p-5 hover:border-sky-400/50 dark:hover:border-sky-500/60 transition">
              <div class="text-lg font-semibold text-sky-700 dark:text-sky-300">{{ a.title[locale] }}</div>
              <div class="text-xs mt-1 text-slate-500 dark:text-slate-400">{{ a.date }}</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="tag in a.tags" :key="tag"
                      class="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-700/70 dark:border-slate-600 dark:text-slate-200">{{ tag }}</span>
              </div>
              <div class="mt-4">
                <a :href="'article.html?slug=' + (a.slug || encodeURIComponent(a.title.en))"
                  class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition">
                  {{ t('sections.read_more') }}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="max-w-6xl mx-auto px-6 mt-16">
          <h3 class="text-xl md:text-2xl font-semibold  text-sky-700 dark:text-sky-300 mb-3">{{ t('about.title') }}</h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ t('about.text') }}</p>
        </section>

        <section id="contact" class="max-w-6xl mx-auto px-6 mt-16">
          <h3 class="text-xl md:text-2xl font-semibold  text-sky-700 dark:text-sky-300  mb-4">{{ t('contact.title') }}</h3>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="text-slate-700 dark:text-slate-300">
              <span class="font-medium">{{ t('contact.email') }}:</span>
              <a :href="'mailto:'+links.email" class=" text-sky-700 dark:text-sky-300  hover:underline">{{ links.email }}</a>
            </div>
            <div class="flex items-center gap-4">
              <a :href="links.linkedin" target="_blank" rel="noopener" class="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-500 hover:shadow-sky-500/30 hover:shadow transition" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-sky-300" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.14V23h-4v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.7-2.5 3.44V23h-4z"/>
                </svg>
              </a>
              <a :href="links.github" target="_blank" rel="noopener" class="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-500 hover:shadow-sky-500/30 hover:shadow transition" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-sky-300" viewBox="0 0 24 24">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.97 0-1.32.47-2.4 1.24-3.24-.13-.31-.54-1.55.12-3.24 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.69.25 2.93.12 3.24.77.84 1.24 1.92 1.24 3.24 0 4.64-2.81 5.66-5.49 5.96.44.38.82 1.12.82 2.27v3.36c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/>
                </svg>
              </a>
              <a :href="links.kaggle" target="_blank" rel="noopener" class="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-sky-500 hover:shadow-sky-500/30 hover:shadow transition" aria-label="Kaggle">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-sky-300" viewBox="0 0 24 24">
                  <path d="M4 3h3v7l6-7h4l-6.8 7.7L18 21h-4l-5-7v7H4V3z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
       
        <footer class="max-w-6xl mx-auto px-6 mt-16 md:mt-20 py-8 text-center text-slate-400">
          <div>{{ t('footer.rights') }}</div>
        </footer>
      </div>
    `
  }

  const app = createApp(App)
  app.use(i18n)
  app.mount('#app')
})()
