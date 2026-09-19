import { useEffect, useMemo, useState } from "react"
import { Search, ChevronRight, Play } from "lucide-react"

const ROLES = ["ALL", "DUELIST", "INITIATOR", "CONTROLLER", "SENTINEL"]

const SLOT_ORDER = {
  Ability1: "Q",
  Ability2: "E",
  Grenade: "C",
  Ultimate: "X",
}

function Agents() {
  const [agents, setAgents] = useState([])
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [activeRole, setActiveRole] = useState("ALL")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [failedClips, setFailedClips] = useState({})

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await fetch(
          "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=en-US"
        )

        const data = await response.json()

        const formatted = data.data
          .filter((agent) => agent.isPlayableCharacter)
          .sort((a, b) => a.displayName.localeCompare(b.displayName))

        setAgents(formatted)

        const sova = formatted.find(
          (agent) => agent.displayName.toLowerCase() === "sova"
        )

        setSelectedAgent(sova || formatted[0])
      } catch (error) {
        console.error("Failed to load agents:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  const roleIcons = useMemo(() => {
    const map = {}
    agents.forEach((agent) => {
      const roleName = agent.role?.displayName?.toUpperCase()
      if (roleName && !map[roleName]) {
        map[roleName] = agent.role.displayIcon
      }
    })
    return map
  }, [agents])

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesRole =
        activeRole === "ALL" ||
        agent.role?.displayName?.toUpperCase() === activeRole

      const matchesSearch = agent.displayName
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesRole && matchesSearch
    })
  }, [agents, activeRole, search])

  const abilities = selectedAgent?.abilities || []

  const getAbility = (slot) =>
    abilities.find((ability) => ability.slot === slot)

  const handleImageError = (clip) => {
    setFailedClips((prev) => ({ ...prev, [clip]: true }))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090B] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
          <div className="animate-pulse">
            <div className="h-3 w-20 bg-white/10" />
            <div className="mt-5 h-12 w-72 bg-white/10" />
            <div className="mt-3 h-4 w-96 bg-white/5" />

            <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[0.8] bg-[#0D0F12]"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      {/* HEADER */}
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-[1px] w-8 bg-[#FF4655]" />
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
                  Valorant Agents
                </span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl">
                Choose your
                <br />
                <span className="text-[#FF4655]">agent.</span>
              </h1>

              <p className="mt-4 max-w-xl text-[13px] leading-6 text-[#70737B] sm:mt-5 sm:text-sm">
                Explore every agent, their abilities, and the clips created
                around them.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[300px]">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555960]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="SEARCH AGENTS"
                className="h-11 w-full border border-white/[0.08] bg-[#0D0F12] pl-11 pr-4 font-display text-[10px] font-semibold tracking-[0.12em] text-white outline-none transition focus:border-[#FF4655]/50 placeholder:text-[#50535A]"
              />
            </div>
          </div>

          {/* ROLE FILTERS WITH ICONS */}
          <div className="mt-7 flex gap-2 overflow-x-auto pb-1 sm:mt-10 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {ROLES.map((role) => {
              const active = activeRole === role
              const iconSrc = roleIcons[role]

              return (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`group relative flex shrink-0 items-center gap-2 px-4 py-2.5 font-display text-[9px] font-bold tracking-[0.1em] transition sm:gap-2.5 sm:px-5 sm:text-[10px] sm:tracking-[0.12em] ${
                    active
                      ? "bg-[#FF4655] text-white"
                      : "border border-white/[0.07] bg-[#0C0E11] text-[#686B73] hover:border-white/[0.14] hover:text-white"
                  }`}
                >
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      className={`h-4 w-4 transition ${
                        active
                          ? "brightness-0 invert"
                          : "opacity-60 invert group-hover:opacity-100"
                      }`}
                    />
                  )}
                  <span>{role}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* AGENT SELECTION */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="mb-5 flex items-end justify-between sm:mb-6">
          <div>
            <p className="font-display text-[10px] font-bold tracking-[0.18em] text-[#555960]">
              AGENT SELECT
            </p>

            <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-[-0.02em]">
              All agents
            </h2>
          </div>

          <span className="font-display text-[9px] font-semibold tracking-[0.14em] text-[#555960]">
            {filteredAgents.length} AGENTS
          </span>
        </div>

        {/* AGENT GRID */}
        <div className="grid grid-cols-2 gap-2 min-[380px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
          {filteredAgents.map((agent) => {
            const selected = selectedAgent?.uuid === agent.uuid

            return (
              <button
                key={agent.uuid}
                onClick={() => setSelectedAgent(agent)}
                className={`group relative aspect-[0.78] min-h-0 overflow-hidden border text-left transition-all duration-300 ${
                  selected
                    ? "border-[#FF4655] bg-[#151014]"
                    : "border-white/[0.06] bg-[#0D0F12] hover:border-[#FF4655]/60"
                }`}
              >
                {/* BACKGROUND ART */}
                {agent.background && (
                  <img
                    src={agent.background}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                      selected
                        ? "scale-105 opacity-35"
                        : "scale-100 opacity-20 group-hover:scale-105 group-hover:opacity-30"
                    }`}
                  />
                )}

                {/* PORTRAIT */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={agent.fullPortraitV2 || agent.fullPortrait || agent.displayIcon}
                    alt={agent.displayName}
                    className={`h-full w-full object-contain object-bottom transition duration-300 ${
                      selected
                        ? "scale-[1.04] opacity-100"
                        : "opacity-80 group-hover:scale-[1.03] group-hover:opacity-100"
                    }`}
                  />
                </div>

                {/* GRADIENT */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08090B] via-[#08090B]/70 to-transparent" />

                {/* ROLE */}
                <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3">
                  {agent.role?.displayIcon && (
                    <img
                      src={agent.role.displayIcon}
                      alt=""
                      className="h-4 w-4 opacity-70"
                    />
                  )}
                </div>

                {/* SELECTED MARK */}
                {selected && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center bg-[#FF4655]">
                    <span className="text-[9px] font-bold">✓</span>
                  </div>
                )}

                {/* NAME */}
                <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3">
                  <p
                    className={`font-display text-[10px] font-bold uppercase tracking-[0.02em] min-[380px]:text-[11px] sm:text-[12px] ${
                      selected ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {agent.displayName}
                  </p>

                  <p className="mt-0.5 font-display text-[6px] font-semibold uppercase tracking-[0.1em] text-[#686B73] sm:mt-1 sm:text-[7px] sm:tracking-[0.14em]">
                    {agent.role?.displayName}
                  </p>
                </div>

                {/* HOVER LINE */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#FF4655] transition-all ${
                    selected
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            )
          })}
        </div>
      </section>

      {/* SELECTED AGENT */}
      {selectedAgent && (
        <section className="border-y border-white/[0.06] bg-[#0A0B0E]">
          <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              {/* AGENT INFO */}
              <div className="relative min-h-[360px] overflow-hidden border border-white/[0.06] bg-[#0D0F12] sm:min-h-[420px]">
                {selectedAgent.background && (
                  <img
                    src={selectedAgent.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent" />

                {/* LARGE AGENT PORTRAIT */}
                <img
                  src={
                    selectedAgent.fullPortraitV2 ||
                    selectedAgent.fullPortrait ||
                    selectedAgent.displayIcon
                  }
                  alt={selectedAgent.displayName}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[82%] w-full object-contain object-bottom sm:h-[90%]"
                />

                <div className="absolute left-4 top-4 sm:left-7 sm:top-7">
                  <p className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
                    Selected agent
                  </p>
                </div>

                <div className="absolute bottom-5 left-4 sm:bottom-7 sm:left-7">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF4655]">
                    {selectedAgent.role?.displayName}
                  </p>

                  <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl">
                    {selectedAgent.displayName}
                  </h2>
                </div>
              </div>

              {/* ABILITIES */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-[10px] font-bold tracking-[0.18em] text-[#555960]">
                      ABILITIES
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold uppercase">
                      Know your kit
                    </h3>
                  </div>

                  <button className="hidden items-center gap-2 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#70737B] transition hover:text-white sm:flex">
                    View clips
                    <ArrowIcon />
                  </button>
                </div>

                <div className="mt-5 space-y-2 sm:mt-7">
                  {Object.entries(SLOT_ORDER).map(([slot, key]) => {
                    const ability = getAbility(slot)

                    if (!ability) return null

                    return (
                      <div
                        key={slot}
                        className="group flex gap-3 border border-white/[0.06] bg-[#0D0F12] p-3 transition hover:border-[#FF4655]/30 sm:gap-4 sm:p-4"
                      >
                        {/* KEY */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] bg-[#111317] sm:h-12 sm:w-12">
                          <span className="font-display text-[13px] font-bold text-[#FF4655]">
                            {key}
                          </span>
                        </div>

                        {/* ICON */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#15171B] sm:h-12 sm:w-12">
                          {ability.displayIcon && (
                            <img
                              src={ability.displayIcon}
                              alt={ability.displayName}
                              className="h-7 w-7 object-contain transition group-hover:scale-110 sm:h-8 sm:w-8"
                            />
                          )}
                        </div>

                        {/* INFO */}
                        <div className="min-w-0">
                          <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.04em] text-white">
                            {ability.displayName}
                          </h4>

                          <p className="mt-1 text-[10px] leading-5 text-[#666A72] sm:mt-1.5 sm:text-[11px]">
                            {ability.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* MOBILE VIEW CLIPS */}
                <button className="mt-5 flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#70737B] transition hover:text-white sm:hidden">
                  View {selectedAgent.displayName} clips
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COMMUNITY CLIPS */}
      {selectedAgent && (
        <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-[10px] font-bold tracking-[0.18em] text-[#555960]">
                COMMUNITY
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.03em]">
                {selectedAgent.displayName} clips
              </h2>
            </div>

            <button className="hidden items-center gap-2 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#70737B] transition hover:text-white sm:flex">
              View all clips
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "/clips/clip-1.jpg",
              "/clips/clip-2.jpg",
              "/clips/clip-3.jpg",
              "/clips/clip-4.jpg",
            ].map((clip, index) => {
              const isFailed = failedClips[clip]

              return (
                <div
                  key={clip}
                  className="group relative aspect-video overflow-hidden border border-white/[0.06] bg-[#0D0F12]"
                >
                  {isFailed ? (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center">
                      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-[#70737B]">
                        you not played this player yet
                      </p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={clip}
                        alt={`${selectedAgent.displayName} community clip ${index + 1}`}
                        onError={() => handleImageError(clip)}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 sm:bottom-3 sm:left-3">
                        <div className="flex h-7 w-7 items-center justify-center bg-[#FF4655]">
                          <Play size={11} fill="white" />
                        </div>

                        <div>
                          <p className="font-display text-[9px] font-bold uppercase text-white">
                            Community clip
                          </p>
                          <p className="text-[8px] text-gray-500">
                            {selectedAgent.displayName}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}

function ArrowIcon() {
  return <ChevronRight size={13} />
}

export default Agents