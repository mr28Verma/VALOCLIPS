import { Link, useLocation } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import { Search, Link2, Check, ChevronDown, Minus, Plus } from "lucide-react"

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    label: "PRIVACY",
    intro:
      "This Privacy Policy explains how valoClips handles information when you use this fan-made project.",
    sections: [
      {
        title: "Information We Collect",
        text:
          "The current valoClips prototype does not intentionally collect sensitive personal information. If Riot account authentication or other services are added in the future, the information collected will be limited to what is necessary to provide those features.",
      },
      {
        title: "How Information Is Used",
        text:
          "Information may be used to provide, maintain, secure, and improve valoClips features. We do not intend to sell personal information to third parties.",
      },
      {
        title: "Third-Party Services",
        text:
          "Future versions of valoClips may use third-party services such as Riot Games authentication or APIs. Their own privacy policies and terms may also apply.",
      },
      {
        title: "Data Security",
        text:
          "Reasonable technical measures should be used to protect information handled by the service. No internet-based service can guarantee absolute security.",
      },
      {
        title: "Changes to This Policy",
        text:
          "This Privacy Policy may be updated as valoClips develops. Material changes should be reflected on this page.",
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    label: "TERMS",
    intro:
      "These Terms describe the basic rules for using valoClips, a fan-made VALORANT community project.",
    sections: [
      {
        title: "Fan Project",
        text:
          "valoClips is an independent fan-made project. It is not endorsed, sponsored, or affiliated with Riot Games.",
      },
      {
        title: "Acceptable Use",
        text:
          "You agree not to use valoClips for unlawful activity, abuse, harassment, unauthorized access, cheating, exploitation, or activities that interfere with the service or other users.",
      },
      {
        title: "User Content",
        text:
          "If users upload clips or other content, they are responsible for having the necessary rights and permissions to share that content.",
      },
      {
        title: "Third-Party Services",
        text:
          "valoClips may depend on third-party services. Availability and functionality of those services may change independently of valoClips.",
      },
      {
        title: "Changes and Availability",
        text:
          "Features may be changed, suspended, or removed as the project develops. The prototype may also experience bugs or downtime.",
      },
      {
        title: "Intellectual Property",
        text:
          "VALORANT, Riot Games, and related game content are owned by their respective rights holders. valoClips does not claim ownership of Riot Games intellectual property.",
      },
    ],
  },

  dmca: {
    title: "DMCA / Copyright",
    label: "DMCA",
    intro:
      "valoClips respects the intellectual property rights of creators and rights holders.",
    sections: [
      {
        title: "Copyright Concerns",
        text:
          "If you believe content displayed or hosted through valoClips infringes your copyright, you may contact the project owner with sufficient information to identify the copyrighted work and the allegedly infringing material.",
      },
      {
        title: "Notice Information",
        text:
          "A copyright notice should include the rights holder's contact information, identification of the copyrighted work, identification of the material in question, a statement of good-faith belief that the use is unauthorized, and confirmation that the information provided is accurate.",
      },
      {
        title: "Removal",
        text:
          "Upon receiving a valid copyright complaint, the project owner may review the material and take appropriate action, including removing or restricting access to the content.",
      },
      {
        title: "Contact",
        text:
          "For copyright-related concerns, contact the project owner using the contact information provided on the valoClips website.",
      },
    ],
  },
}

const TABS = [
  { key: "privacy", label: "Privacy" },
  { key: "terms", label: "Terms" },
  { key: "dmca", label: "DMCA" },
]

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

// Splits text around a query and wraps matches in <mark> for highlighting.
function Highlighted({ text, query }) {
  if (!query.trim()) return <>{text}</>
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "ig"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark
            key={i}
            className="rounded-[2px] bg-[#FF4655]/25 text-white"
            style={{ padding: "0 1px" }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function LegalPage() {
  const location = useLocation()
  const pageKey = location.pathname.replace("/", "") || "privacy"
  const page = CONTENT[pageKey] || CONTENT.privacy

  const sections = useMemo(
    () => page.sections.map((s) => ({ ...s, id: slugify(s.title) })),
    [page]
  )

  const [query, setQuery] = useState("")
  const [openIds, setOpenIds] = useState(() => new Set(sections.map((s) => s.id)))
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const [copiedId, setCopiedId] = useState(null)
  const [progress, setProgress] = useState(0)

  const sectionRefs = useRef({})

  // Reset open/active state whenever the document changes.
  useEffect(() => {
    setOpenIds(new Set(sections.map((s) => s.id)))
    setActiveId(sections[0]?.id)
    setQuery("")
  }, [pageKey]) // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll progress ("scan") bar.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy: highlight the section nearest the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sections
    return sections.filter(
      (s) => s.title.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)
    )
  }, [sections, query])

  useEffect(() => {
    if (!query.trim()) return
    setOpenIds(new Set(filtered.map((s) => s.id)))
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSection = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allOpen = openIds.size === sections.length
  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(sections.map((s) => s.id)))
  }

  const copyLink = async (id) => {
    const url = `${window.location.origin}${location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API unavailable — still show the affordance fire.
    }
    setCopiedId(id)
    window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1600)
  }

  const jumpTo = (id) => {
    setOpenIds((prev) => new Set(prev).add(id))
    requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      {/* scan progress bar */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/[0.06]">
        <div
          className="h-full bg-[#FF4655] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        {/* document switcher, replacing the back link */}
        <nav
          aria-label="Legal documents"
          className="mb-14 inline-flex items-center gap-1 border border-white/10 bg-white/[0.02] p-1"
        >
          {TABS.map((tab) => {
            const active = tab.key === pageKey
            return (
              <Link
                key={tab.key}
                to={`/${tab.key}`}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#FF4655] text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-[#FF4655]">
            {page.label}
          </p>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            {page.title}
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/50 sm:text-base">
            {page.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* sticky section navigator */}
          <aside className="lg:sticky lg:top-10 lg:h-fit">
            <div className="mb-4 flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2">
              <Search size={14} className="shrink-0 text-white/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search this document"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <ul className="space-y-1 border-l border-white/10">
              {filtered.map((s, i) => {
                const active = activeId === s.id
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => jumpTo(s.id)}
                      className={`-ml-px flex w-full items-start gap-2 border-l py-1.5 pl-3 pr-2 text-left text-sm transition ${
                        active
                          ? "border-[#FF4655] text-white"
                          : "border-transparent text-white/40 hover:border-white/25 hover:text-white/70"
                      }`}
                    >
                      <span className="mt-[1px] font-mono text-[11px] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </button>
                  </li>
                )
              })}
              {filtered.length === 0 && (
                <li className="py-2 pl-3 text-sm text-white/30">No matching clauses.</li>
              )}
            </ul>

            <button
              onClick={toggleAll}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/40 transition hover:text-white/70"
            >
              {allOpen ? <Minus size={12} /> : <Plus size={12} />}
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </aside>

          {/* clauses */}
          <div>
            {filtered.map((section, i) => {
              const isOpen = openIds.has(section.id)
              return (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="scroll-mt-10 border-t border-white/[0.08] py-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={isOpen}
                      className="group flex flex-1 items-start gap-3 text-left"
                    >
                      <span className="mt-1 font-mono text-xs text-white/25">
                        {String(sections.findIndex((s) => s.id === section.id) + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold transition group-hover:text-white/80 sm:text-xl">
                        <Highlighted text={section.title} query={query} />
                      </span>
                      <ChevronDown
                        size={16}
                        className={`mt-1.5 shrink-0 text-white/30 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => copyLink(section.id)}
                      aria-label="Copy link to this section"
                      className="mt-1 shrink-0 text-white/25 transition hover:text-white/70"
                    >
                      {copiedId === section.id ? <Check size={14} /> : <Link2 size={14} />}
                    </button>
                  </div>

                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 pl-7 text-sm leading-7 text-white/55 sm:text-base">
                        <Highlighted text={section.text} query={query} />
                      </p>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-8">
          <p className="text-xs leading-6 text-white/35">
            valoClips is a fan-made project and is not endorsed, sponsored, or
            affiliated with Riot Games. VALORANT and Riot Games are trademarks
            of Riot Games, Inc.
          </p>
        </div>
      </section>
    </main>
  )
}

export default LegalPage