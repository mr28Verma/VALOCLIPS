import { useMemo, useState } from "react"
import { Search, ChevronRight, Play } from "lucide-react"

const ROLES = ["ALL", "DUELIST", "INITIATOR", "CONTROLLER", "SENTINEL"]

const SLOT_ORDER = {
  Ability1: "Q",
  Ability2: "E",
  Grenade: "C",
  Ultimate: "X",
}


const ROLE_ICONS = {
  DUELIST: "/role/duelist.png",
  INITIATOR: "/role/initiator.png",
  CONTROLLER: "/role/controller.png",
  SENTINEL: "/role/sentinel.png",
}

const ABILITY_DESCRIPTIONS = {
  "Nova Pulse": "Concusses players in an area, making it difficult for them to shoot accurately.",
  "Gravity Well": "Pulls players toward its center before trapping and damaging them.",
  "Nebula": "Creates a smoke cloud that blocks vision.",
  "Astral Form": "Allows Astra to enter Astral Form and place stars and use her cosmic abilities.",
  "Flashpoint": "Creates a fast-acting flash that blinds players looking toward it.",
  "Fault Line": "Sends a seismic blast that dazes players caught in its path.",
  "Aftershock": "Fires a fusion charge that damages players caught in its area.",
  "Rolling Thunder": "Sends a powerful seismic wave that knocks up and concusses players.",
  "Incendiary": "Throws a grenade that creates a damaging fire zone.",
  "Sky Smoke": "Deploys smoke clouds that block vision.",
  "Stim Beacon": "Places a beacon that grants combat buffs to nearby players.",
  "Orbital Strike": "Calls down a devastating orbital strike that damages players in its area.",
  "Headhunter": "Equips a powerful heavy pistol.",
  "Rendezvous": "Places teleport anchors that Chamber can teleport between.",
  "Trademark": "Places a trap that slows and holds nearby enemies when triggered.",
  "Tour De Force": "Summons a powerful custom sniper rifle.",
  "Meddle": "Throws a projectile that creates a lingering decay effect.",
  "Ruse": "Creates a smoke cloud that blocks vision.",
  "Pick-Me-Up": "Damaging an enemy allows Clove to gain a temporary combat boost.",
  "Not Dead Yet": "Allows Clove to temporarily revive after being eliminated.",
  "Cyber Cage": "Deploys a cage that blocks vision and slows enemies.",
  "Spycam": "Places a remote camera that can reveal enemies.",
  "Trapwire": "Places a tripwire that restrains and reveals enemies.",
  "Neural Theft": "Reveals the locations of living enemy players.",
  "Sonic Sensor": "Detects significant sound and concusses players in its area.",
  "GravNet": "Throws a grenade that forces affected players to crouch and move slowly.",
  "Barrier Mesh": "Deploys a barrier that blocks movement.",
  "Annihilation": "Captures the first enemy hit and cocoons them.",
  "Seize": "Creates a zone that holds enemies in place and applies decay.",
  "Haunt": "Reveals enemies caught in its area and creates a tracking trail.",
  "Prowler": "Sends a creature that follows nearby enemies and nearsights them.",
  "Nightfall": "Sends a wave of nightmare energy that deafens, decays, and marks enemies.",
  "Wingman": "Sends Wingman to seek enemies or plant or defuse the Spike.",
  "Dizzy": "Fires plasma at enemies and nearsights them.",
  "Mosh Pit": "Throws a grenade that creates a damaging area.",
  "Thrash": "Sends Thrash to capture and detain enemies.",
  "Cove": "Creates a protective sphere that blocks bullets and vision.",
  "High Tide": "Creates a moving wall of water that blocks vision and slows players.",
  "Cascade": "Creates a moving wave that blocks vision and slows players.",
  "Reckoning": "Summons a wave that concusses, knocks back, and reveals enemies.",
  "Undercut": "Throws a molecular bolt that applies a weakened effect.",
  "Double Tap": "Prepares a shielded state after securing a kill.",
  "Contingency": "Creates a moving energy wall that blocks bullets.",
  "Kill Contract": "Challenges an enemy to a one-on-one duel.",
  "Updraft": "Propels Jett upward.",
  "Tailwind": "Activates a burst of movement in Jett's current direction.",
  "Cloudburst": "Throws a projectile that creates a brief smoke cloud.",
  "Blade Storm": "Equips highly accurate throwing knives that recharge after kills.",
  "FLASH/drive": "Throws a flash grenade that blinds players.",
  "ZERO/point": "Throws a suppression blade that disables enemy abilities.",
  "FRAG/ment": "Throws a fragment grenade that creates damaging explosions.",
  "NULL/cmd": "Overloads KAY/O, suppressing enemies and allowing him to be stabilized when downed.",
  "Alarmbot": "Deploys a bot that hunts enemies and applies a vulnerable effect.",
  "Turret": "Deploys a turret that automatically fires at enemies.",
  "Nanoswarm": "Throws a grenade that creates a damaging nanobot swarm.",
  "Lockdown": "Deploys a device that detains enemies caught in its radius.",
  "Relay Bolt": "Throws a bolt that creates a concussive blast.",
  "High Gear": "Channels energy to increase movement speed and activate a slide.",
  "Fast Lane": "Creates energy walls that block vision and damage enemies.",
  "Overdrive": "Channels a powerful lightning beam with high mobility.",
  "Paranoia": "Sends a projectile that nearsights and deafens enemies.",
  "Dark Cover": "Creates a smoke sphere that blocks vision.",
  "Shrouded Step": "Teleports Omen to a selected location.",
  "From the Shadows": "Allows Omen to teleport to a selected location on the map.",
  "Curveball": "Throws a flash orb that blinds players.",
  "Hot Hands": "Throws a fireball that creates a damaging zone and heals Phoenix.",
  "Blaze": "Creates a wall of fire that damages enemies and heals Phoenix.",
  "Run It Back": "Marks Phoenix's location and returns him there when the effect ends or he dies.",
  "Blast Pack": "Throws a satchel that can damage and propel players.",
  "Paint Shells": "Throws a cluster grenade that creates multiple explosions.",
  "Boom Bot": "Deploys a bot that chases detected enemies.",
  "Showstopper": "Equips a rocket launcher that fires a devastating rocket.",
  "Devour": "Consumes a Soul Orb to rapidly heal Reyna.",
  "Dismiss": "Consumes a Soul Orb to become intangible.",
  "Leer": "Throws an eye that nearsights enemies looking toward it.",
  "Empress": "Enters a heightened combat state that can be extended with kills.",
  "Slow Orb": "Throws an orb that creates a slowing field.",
  "Healing Orb": "Heals an ally or Sage herself.",
  "Barrier Orb": "Creates a solid wall that blocks movement.",
  "Resurrection": "Revives a dead ally after a brief channel.",
  "Trailblazer": "Sends a controllable creature that can concuss enemies.",
  "Guiding Light": "Sends a hawk that can flash enemies.",
  "Regrowth": "Heals nearby allies using Skye's healing resource.",
  "Seekers": "Sends seekers that track nearby enemies.",
  "Shock Bolt": "Fires an explosive arrow that damages players in its area.",
  "Recon Bolt": "Fires a reconnaissance arrow that reveals enemies.",
  "Owl Drone": "Deploys a controllable drone that can reveal enemies.",
  "Hunter's Fury": "Fires energy blasts through walls that damage and reveal enemies.",
  "Special Delivery": "Throws a sticky grenade that creates a concussive effect.",
  "Guided Salvo": "Fires missiles that can target locations and enemy utility.",
  "Stealth Drone": "Deploys a drone that reveals and suppresses enemies.",
  "Armageddon": "Designates a path for a massive damaging strike.",
  "Ability 1": "A unique agent ability.",
  "Ability 2": "A unique agent ability.",
  "Ability 3": "A unique agent ability.",
  "Ultimate": "The agent's ultimate ability.",
  "Evolution": "Veto's ultimate ability that activates his evolved combat state.",
  "Poison Cloud": "Throws a gas emitter that creates a toxic cloud.",
  "Toxic Screen": "Deploys a long line of toxic gas that blocks vision.",
  "Snake Bite": "Throws a chemical canister that creates a damaging and vulnerable zone.",
  "Viper's Pit": "Creates a large toxic cloud that reduces enemy vision and health.",
  "Arc Rose": "Places a hidden device that can be activated to flash enemies.",
  "Shear": "Places a trap that creates an impassable wall when triggered.",
  "Razorvine": "Creates a damaging, slowing field of sharp metal.",
  "Steel Garden": "Creates an area that disables enemy weapons temporarily.",
  "Saturate": "Throws a sticky projectile that slows and damages enemies.",
  "Light Speed": "Activates Waylay's speed boost and directional dash.",
  "Refract": "Marks Waylay's location and allows her to return there.",
  "Blindside": "Throws a dimensional fragment that flashes enemies.",
  "Gatecrash": "Places a tether that allows Yoru to teleport.",
  "Fakeout": "Creates a moving decoy that flashes enemies when destroyed.",
  "Dimensional Drift": "Enters another dimension where Yoru cannot be affected normally."
}

const AGENTS = [
  { name: "Astra", role: "CONTROLLER", folder: "astra", abilities: [["Q", "Nova Pulse"], ["E", "Gravity Well"], ["C", "Nebula"], ["X", "Astral Form"]] },
  { name: "Breach", role: "INITIATOR", folder: "breach", abilities: [["Q", "Flashpoint"], ["E", "Fault Line"], ["C", "Aftershock"], ["X", "Rolling Thunder"]] },
  { name: "Brimstone", role: "CONTROLLER", folder: "brime", abilities: [["Q", "Incendiary"], ["E", "Sky Smoke"], ["C", "Stim Beacon"], ["X", "Orbital Strike"]] },
  { name: "Chamber", role: "SENTINEL", folder: "chamber", abilities: [["Q", "Headhunter"], ["E", "Rendezvous"], ["C", "Trademark"], ["X", "Tour De Force"]] },
  { name: "Clove", role: "CONTROLLER", folder: "clove", abilities: [["Q", "Meddle"], ["E", "Ruse"], ["C", "Pick-Me-Up"], ["X", "Not Dead Yet"]] },
  { name: "Cypher", role: "SENTINEL", folder: "cypher", abilities: [["Q", "Cyber Cage"], ["E", "Spycam"], ["C", "Trapwire"], ["X", "Neural Theft"]] },
  { name: "Deadlock", role: "SENTINEL", folder: "deadlock", abilities: [["Q", "Sonic Sensor"], ["E", "GravNet"], ["C", "Barrier Mesh"], ["X", "Annihilation"]] },
  { name: "Fade", role: "INITIATOR", folder: "fade", abilities: [["Q", "Seize"], ["E", "Haunt"], ["C", "Prowler"], ["X", "Nightfall"]] },
  { name: "Gekko", role: "INITIATOR", folder: "geko", abilities: [["Q", "Wingman"], ["E", "Dizzy"], ["C", "Mosh Pit"], ["X", "Thrash"]] },
  { name: "Harbor", role: "CONTROLLER", folder: "harbor", abilities: [["Q", "Cove"], ["E", "High Tide"], ["C", "Cascade"], ["X", "Reckoning"]] },
  { name: "Iso", role: "DUELIST", folder: "iso", abilities: [["Q", "Undercut"], ["E", "Double Tap"], ["C", "Contingency"], ["X", "Kill Contract"]] },
  { name: "Jett", role: "DUELIST", folder: "jett", abilities: [["Q", "Updraft"], ["E", "Tailwind"], ["C", "Cloudburst"], ["X", "Blade Storm"]] },
  { name: "KAY/O", role: "INITIATOR", folder: "kayo", abilities: [["Q", "FLASH/drive"], ["E", "ZERO/point"], ["C", "FRAG/ment"], ["X", "NULL/cmd"]] },
  { name: "Killjoy", role: "SENTINEL", folder: "killjoy", abilities: [["Q", "Alarmbot"], ["E", "Turret"], ["C", "Nanoswarm"], ["X", "Lockdown"]] },
  { name: "Miks", role: "CONTROLLER", folder: "miks", abilities: [["Q", "Ability 1"], ["E", "Ability 2"], ["C", "Ability 3"], ["X", "Ultimate"]] },
  { name: "Neon", role: "DUELIST", folder: "neon", abilities: [["Q", "Relay Bolt"], ["E", "High Gear"], ["C", "Fast Lane"], ["X", "Overdrive"]] },
  { name: "Omen", role: "CONTROLLER", folder: "omen", abilities: [["Q", "Paranoia"], ["E", "Dark Cover"], ["C", "Shrouded Step"], ["X", "From the Shadows"]] },
  { name: "Phoenix", role: "DUELIST", folder: "phoenix", abilities: [["Q", "Curveball"], ["E", "Hot Hands"], ["C", "Blaze"], ["X", "Run It Back"]] },
  { name: "Raze", role: "DUELIST", folder: "raze", abilities: [["Q", "Blast Pack"], ["E", "Paint Shells"], ["C", "Boom Bot"], ["X", "Showstopper"]] },
  { name: "Reyna", role: "DUELIST", folder: "reyna", abilities: [["Q", "Devour"], ["E", "Dismiss"], ["C", "Leer"], ["X", "Empress"]] },
  { name: "Sage", role: "SENTINEL", folder: "sage", abilities: [["Q", "Slow Orb"], ["E", "Healing Orb"], ["C", "Barrier Orb"], ["X", "Resurrection"]] },
  { name: "Skye", role: "INITIATOR", folder: "skye", abilities: [["Q", "Trailblazer"], ["E", "Guiding Light"], ["C", "Regrowth"], ["X", "Seekers"]] },
  { name: "Sova", role: "INITIATOR", folder: "sova", abilities: [["Q", "Shock Bolt"], ["E", "Recon Bolt"], ["C", "Owl Drone"], ["X", "Hunter's Fury"]] },
  { name: "Tejo", role: "INITIATOR", folder: "tejo", abilities: [["Q", "Special Delivery"], ["E", "Guided Salvo"], ["C", "Stealth Drone"], ["X", "Armageddon"]] },
  { name: "Veto", role: "SENTINEL", folder: "veto", abilities: [["Q", "Chokehold"], ["E", "Crosscut"], ["C", "Interceptor"], ["X", "Evolution"]] },
  { name: "Viper", role: "CONTROLLER", folder: "viper", abilities: [["Q", "Poison Cloud"], ["E", "Toxic Screen"], ["C", "Snake Bite"], ["X", "Viper's Pit"]] },
  { name: "Vyse", role: "SENTINEL", folder: "vyse", abilities: [["Q", "Arc Rose"], ["E", "Shear"], ["C", "Razorvine"], ["X", "Steel Garden"]] },
  { name: "Waylay", role: "DUELIST", folder: "waylay", abilities: [["Q", "Saturate"], ["E", "Light Speed"], ["C", "Refract"], ["X", "Convergent Paths"]] },
  { name: "Yoru", role: "DUELIST", folder: "yoru", abilities: [["Q", "Blindside"], ["E", "Gatecrash"], ["C", "Fakeout"], ["X", "Dimensional Drift"]] },
]

function Agents() {
  const [selectedAgent, setSelectedAgent] = useState(
    AGENTS.find((agent) => agent.name === "Sova") || AGENTS[0]
  )
  const [activeRole, setActiveRole] = useState("ALL")
  const [search, setSearch] = useState("")
  const [failedClips, setFailedClips] = useState({})

  const filteredAgents = useMemo(() => {
    return AGENTS.filter((agent) => {
      const matchesRole =
        activeRole === "ALL" || agent.role === activeRole

      const matchesSearch = agent.name
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesRole && matchesSearch
    })
  }, [activeRole, search])

  const handleImageError = (clip) => {
    setFailedClips((prev) => ({ ...prev, [clip]: true }))
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
              const iconSrc = ROLE_ICONS[role]

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
            const selected = selectedAgent?.name === agent.name

            return (
              <button
                key={agent.name}
                onClick={() => setSelectedAgent(agent)}
                className={`group relative aspect-[0.78] min-h-0 overflow-hidden border text-left transition-all duration-300 ${
                  selected
                    ? "border-[#FF4655] bg-[#151014]"
                    : "border-white/[0.06] bg-[#0D0F12] hover:border-[#FF4655]/60"
                }`}
              >
                {/* BACKGROUND ART */}
                <img
                  src={`/agent/background/${agent.folder}.png`}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                    selected
                      ? "scale-105 opacity-35"
                      : "scale-100 opacity-20 group-hover:scale-105 group-hover:opacity-30"
                  }`}
                />

                {/* PORTRAIT */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={`/agent/picture/${agent.folder}.png`}
                    alt={agent.name}
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
                  {ROLE_ICONS[agent.role] && (
                    <img
                      src={ROLE_ICONS[agent.role]}
                      alt=""
                      className="h-4 w-4 object-contain opacity-70"
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
                    {agent.name}
                  </p>

                  <p className="mt-0.5 font-display text-[6px] font-semibold uppercase tracking-[0.1em] text-[#686B73] sm:mt-1 sm:text-[7px] sm:tracking-[0.14em]">
                    {agent.role}
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
                {/* AGENT BACKGROUND */}
                <img
                  src={`/agent/background/${selectedAgent.folder}.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/20 to-transparent" />

                {/* LARGE AGENT PORTRAIT */}
                <img
                  src={`/agent/picture/${selectedAgent.folder}.png`}
                  alt={selectedAgent.name}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[95%] w-full object-contain object-bottom"
                />

                <div className="absolute left-4 top-4 sm:left-7 sm:top-7">
                  <p className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
                    Selected agent
                  </p>
                </div>

                <div className="absolute bottom-5 left-4 sm:bottom-7 sm:left-7">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF4655]">
                    {selectedAgent.role}
                  </p>

                  <h2 className="mt-1 font-display text-4xl font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl">
                    {selectedAgent.name}
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
                  {selectedAgent.abilities.map(([key, abilityName]) => {
                    const abilityImage =
                      `/agent/ability/${selectedAgent.folder}/${key}.png`

                    return (
                      <div
                        key={key}
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
                          <img
                            src={abilityImage}
                            alt={abilityName}
                            className="h-7 w-7 object-contain transition group-hover:scale-110 sm:h-8 sm:w-8"
                          />
                        </div>

                        {/* INFO */}
                        <div className="min-w-0">
                          <h4 className="font-display text-[12px] font-bold uppercase tracking-[0.04em] text-white">
                            {abilityName}
                          </h4>

                          <p className="mt-1 text-[10px] leading-5 text-[#666A72] sm:mt-1.5 sm:text-[11px]">
                            {ABILITY_DESCRIPTIONS[abilityName] || `${abilityName} ability.`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* MOBILE VIEW CLIPS */}
                <button className="mt-5 flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#70737B] transition hover:text-white sm:hidden">
                  View {selectedAgent.name} clips
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
                {selectedAgent.name} clips
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
                        alt={`${selectedAgent.name} community clip ${index + 1}`}
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
                            {selectedAgent.name}
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