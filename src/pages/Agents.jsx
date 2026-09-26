import { useState, useMemo, useEffect } from "react"
import { Search, Play, Radio } from "lucide-react"

/* =========================================================
   AGENT DATABASE
   ========================================================= */

const AGENTS_DATA = [
  {
    id: "astra",
    name: "ASTRA",
    role: "CONTROLLER",
    folder: "astra",
    roleIcon: "/role/controller.png",
    biography:
      "Ghanaian Agent Astra harnesses the energies of the cosmos to reshape battlefields to her will.",
    abilities: [
      ["Q", "NOVA PULSE", "Set a Nova Pulse that briefly concusses players in its area."],
      ["E", "NEBULA", "Place a smoke that blocks vision."],
      ["C", "GRAVITY WELL", "Create a gravity well that pulls players toward its center."],
      ["X", "ASTRAL FORM", "Enter Astral Form and control the battlefield through cosmic energy."],
    ],
  },

  {
    id: "breach",
    name: "BREACH",
    role: "INITIATOR",
    folder: "breach",
    roleIcon: "/role/initiator.png",
    biography:
      "Breach fires powerful kinetic blasts to aggressively clear paths through enemy territory.",
    abilities: [
      ["Q", "FLASHPOINT", "Fire a blinding charge through walls."],
      ["E", "FAULT LINE", "Send a seismic blast that dazes players."],
      ["C", "AFTERSHOCK", "Create a slow-acting burst through a wall."],
      ["X", "ROLLING THUNDER", "Send a cascading seismic blast across the battlefield."],
    ],
  },

  {
    id: "brimstone",
    name: "BRIMSTONE",
    role: "CONTROLLER",
    folder: "brimstone",
    roleIcon: "/role/controller.png",
    biography:
      "Brimstone's orbital arsenal gives his squad precise and reliable battlefield control.",
    abilities: [
      ["Q", "INCENDIARY", "Launch an incendiary grenade that creates a damaging fire zone."],
      ["E", "SKY SMOKE", "Place long-lasting smoke clouds on selected locations."],
      ["C", "STIM BEACON", "Deploy a beacon that grants combat bonuses."],
      ["X", "ORBITAL STRIKE", "Launch an orbital strike that deals heavy damage over time."],
    ],
  },

  {
    id: "chamber",
    name: "CHAMBER",
    role: "SENTINEL",
    folder: "chamber",
    roleIcon: "/role/sentinel.png",
    biography:
      "French weapons designer Chamber uses his custom arsenal to hold positions and punish enemies.",
    abilities: [
      ["Q", "HEADHUNTER", "Equip a powerful precision pistol."],
      ["E", "RENDEZVOUS", "Teleport between placed anchors."],
      ["C", "TRADEMARK", "Place a trap that slows enemies."],
      ["X", "TOUR DE FORCE", "Equip a powerful custom sniper rifle."],
    ],
  },

  {
    id: "clove",
    name: "CLOVE",
    role: "CONTROLLER",
    folder: "clove",
    roleIcon: "/role/controller.png",
    biography:
      "Clove uses immortal energy to influence the fight even after death.",
    abilities: [
      ["Q", "MEDDLE", "Throw immortal energy that applies Decay."],
      ["E", "RUSE", "Place smoke clouds, even after death."],
      ["C", "PICK-ME-UP", "Gain temporary health and speed after damaging enemies."],
      ["X", "NOT DEAD YET", "Return to the fight after being eliminated."],
    ],
  },

  {
    id: "cypher",
    name: "CYPHER",
    role: "SENTINEL",
    folder: "cypher",
    roleIcon: "/role/sentinel.png",
    biography:
      "Cypher is a one-man surveillance network who keeps tabs on every enemy movement.",
    abilities: [
      ["Q", "CYBER CAGE", "Create a vision-blocking cage."],
      ["E", "SPYCAM", "Install and control a surveillance camera."],
      ["C", "TRAPWIRE", "Install a tripwire that reveals and dazes enemies."],
      ["X", "NEURAL THEFT", "Reveal the locations of living enemies."],
    ],
  },

  {
    id: "deadlock",
    name: "DEADLOCK",
    role: "SENTINEL",
    folder: "deadlock",
    roleIcon: "/role/sentinel.png",
    biography:
      "Deadlock uses advanced nanowire technology to secure areas and stop enemy advances.",
    abilities: [
      ["Q", "SONIC SENSOR", "Detect significant sounds and concuss players."],
      ["E", "GRAVNET", "Force affected enemies to crouch and move slowly."],
      ["C", "BARRIER MESH", "Deploy a barrier that blocks movement."],
      ["X", "ANNIHILATION", "Capture an enemy inside a nanowire cocoon."],
    ],
  },

  {
    id: "fade",
    name: "FADE",
    role: "INITIATOR",
    folder: "fade",
    roleIcon: "/role/initiator.png",
    biography:
      "Fade uses nightmares to reveal enemy secrets and hunt targets through darkness.",
    abilities: [
      ["Q", "SEIZE", "Hold enemies in place with nightmare energy."],
      ["E", "HAUNT", "Reveal enemies and track their movement."],
      ["C", "PROWLER", "Send a creature that tracks and nearsights enemies."],
      ["X", "NIGHTFALL", "Deafen, decay and mark enemies with nightmare energy."],
    ],
  },

  {
    id: "gekko",
    name: "GEKKO",
    role: "INITIATOR",
    folder: "geko",
    roleIcon: "/role/initiator.png",
    biography:
      "Gekko leads a crew of creatures that can be recovered and reused throughout the round.",
    abilities: [
      ["Q", "WINGMAN", "Send Wingman forward to concuss enemies or interact with the Spike."],
      ["E", "DIZZY", "Launch Dizzy to impair enemy vision."],
      ["C", "MOSH PIT", "Create a damaging area after throwing Mosh."],
      ["X", "THRASH", "Control Thrash to restrain enemies."],
    ],
  },

  {
    id: "harbor",
    name: "HARBOR",
    role: "CONTROLLER",
    folder: "harbor",
    roleIcon: "/role/controller.png",
    biography:
      "Harbor bends water to protect his team and reshape the battlefield.",
    abilities: [
      ["Q", "COVE", "Create a protective water sphere."],
      ["E", "HIGH TIDE", "Create a controllable wall of water."],
      ["C", "CASCADE", "Send a wave of water forward."],
      ["X", "RECKONING", "Summon geyser energy that targets enemies."],
    ],
  },

  {
    id: "iso",
    name: "ISO",
    role: "DUELIST",
    folder: "iso",
    roleIcon: "/role/duelist.png",
    biography:
      "Iso enters focused combat states and turns the battlefield into isolated duels.",
    abilities: [
      ["Q", "UNDERCUT", "Apply Vulnerable to enemies with a molecular bolt."],
      ["E", "DOUBLE TAP", "Enter a concentration state and gain a shield."],
      ["C", "CONTINGENCY", "Deploy a moving energy wall."],
      ["X", "KILL CONTRACT", "Pull an enemy into a one-on-one dimensional duel."],
    ],
  },

  {
    id: "jett",
    name: "JETT",
    role: "DUELIST",
    folder: "jett",
    roleIcon: "/role/duelist.png",
    biography:
      "Jett's agile and evasive fighting style lets her take risks that few others can.",
    abilities: [
      ["Q", "UPDRAFT", "Propel Jett high into the air."],
      ["E", "TAILWIND", "Dash in the direction Jett is moving."],
      ["C", "CLOUDBURST", "Create a short-lived vision-blocking cloud."],
      ["X", "BLADE STORM", "Equip highly accurate throwing knives."],
    ],
  },

  {
    id: "kayo",
    name: "KAY/O",
    role: "INITIATOR",
    folder: "kayo",
    roleIcon: "/role/initiator.png",
    biography:
      "KAY/O is a machine built to neutralize enemy abilities and suppress opposing forces.",
    abilities: [
      ["Q", "FLASH/DRIVE", "Throw a flash grenade."],
      ["E", "ZERO/POINT", "Suppress enemies caught by the suppression blade."],
      ["C", "FRAG/MENT", "Create damaging explosive zones."],
      ["X", "NULL/CMD", "Suppress enemies and continue fighting after being downed."],
    ],
  },

  {
    id: "killjoy",
    name: "KILLJOY",
    role: "SENTINEL",
    folder: "killjoy",
    roleIcon: "/role/sentinel.png",
    biography:
      "Killjoy secures the battlefield with an arsenal of intelligent inventions.",
    abilities: [
      ["Q", "ALARMBOT", "Deploy a bot that hunts nearby enemies."],
      ["E", "TURRET", "Deploy a turret that fires at enemies."],
      ["C", "NANOSWARM", "Deploy a damaging swarm of nanobots."],
      ["X", "LOCKDOWN", "Detain enemies caught inside the device's radius."],
    ],
  },

  {
    id: "miks",
    name: "MIKS",
    role: "CONTROLLER",
    folder: "miks",
    roleIcon: "/role/controller.png",
    biography:
      "Miks uses sonic energy to coordinate his team and control the rhythm of the battlefield.",
    abilities: [
      ["Q", "HARMONIZE", "Empower an ally through sonic energy."],
      ["E", "RESONANCE", "Deploy sonic energy with multiple battlefield effects."],
      ["C", "DISSONANT PULSE", "Launch a sonic device with combat effects."],
      ["X", "SONIC SHOWSTOPPER", "Unleash a powerful sonic ultimate."],
    ],
  },

  {
    id: "neon",
    name: "NEON",
    role: "DUELIST",
    folder: "neon",
    roleIcon: "/role/duelist.png",
    biography:
      "Neon surges across the battlefield with extreme speed and bioelectric power.",
    abilities: [
      ["Q", "RELAY BOLT", "Throw a bolt that concusses players."],
      ["E", "HIGH GEAR", "Gain increased movement speed and prepare a slide."],
      ["C", "FAST LANE", "Create parallel electric walls."],
      ["X", "OVERDRIVE", "Fire a powerful electric beam while moving."],
    ],
  },

  {
    id: "omen",
    name: "OMEN",
    role: "CONTROLLER",
    folder: "omen",
    roleIcon: "/role/controller.png",
    biography:
      "Omen hunts from the shadows, using blindness, teleportation and paranoia.",
    abilities: [
      ["Q", "PARANOIA", "Fire a shadow projectile through walls."],
      ["E", "DARK COVER", "Create a long-lasting smoke sphere."],
      ["C", "SHROUDED STEP", "Teleport to a selected location."],
      ["X", "FROM THE SHADOWS", "Teleport across the map through the shadows."],
    ],
  },

  {
    id: "phoenix",
    name: "PHOENIX",
    role: "DUELIST",
    folder: "phoenix",
    roleIcon: "/role/duelist.png",
    biography:
      "Phoenix fights with fire and flare, using his abilities to create aggressive openings.",
    abilities: [
      ["Q", "CURVEBALL", "Throw a flash around corners."],
      ["E", "HOT HANDS", "Create a damaging fire zone that heals Phoenix."],
      ["C", "BLAZE", "Create a wall of fire."],
      ["X", "RUN IT BACK", "Fight freely and return to the starting location."],
    ],
  },

  {
    id: "raze",
    name: "RAZE",
    role: "DUELIST",
    folder: "raze",
    roleIcon: "/role/duelist.png",
    biography:
      "Raze specializes in explosive force and clearing enemies from tight spaces.",
    abilities: [
      ["Q", "BLAST PACK", "Throw an explosive pack that can propel players."],
      ["E", "PAINT SHELLS", "Throw a cluster grenade."],
      ["C", "BOOM BOT", "Deploy a bot that hunts enemies."],
      ["X", "SHOWSTOPPER", "Fire a devastating rocket."],
    ],
  },

  {
    id: "reyna",
    name: "REYNA",
    role: "DUELIST",
    folder: "reyna",
    roleIcon: "/role/duelist.png",
    biography:
      "Reyna dominates individual combat and becomes stronger through enemy eliminations.",
    abilities: [
      ["Q", "DEVOUR", "Consume a Soul Orb to heal."],
      ["E", "DISMISS", "Become intangible after consuming a Soul Orb."],
      ["C", "LEER", "Create a destructible eye that nearsights enemies."],
      ["X", "EMPRESS", "Enter a combat frenzy and reset its duration with kills."],
    ],
  },

  {
    id: "sage",
    name: "SAGE",
    role: "SENTINEL",
    folder: "sage",
    roleIcon: "/role/sentinel.png",
    biography:
      "Sage creates safety for her team through healing, barriers and resurrection.",
    abilities: [
      ["Q", "SLOW ORB", "Create an area that slows players."],
      ["E", "HEALING ORB", "Heal an ally or herself."],
      ["C", "BARRIER ORB", "Create a solid wall."],
      ["X", "RESURRECTION", "Bring a dead ally back to life."],
    ],
  },

  {
    id: "skye",
    name: "SKYE",
    role: "INITIATOR",
    folder: "skye",
    roleIcon: "/role/initiator.png",
    biography:
      "Skye uses her animal companions to guide, reveal and support her team.",
    abilities: [
      ["Q", "TRAILBLAZER", "Control a creature that can concuss enemies."],
      ["E", "GUIDING LIGHT", "Send a controllable hawk that can flash enemies."],
      ["C", "REGROWTH", "Heal nearby allies."],
      ["X", "SEEKERS", "Send seekers toward nearby enemies."],
    ],
  },

  {
    id: "sova",
    name: "SOVA",
    role: "INITIATOR",
    folder: "sova",
    roleIcon: "/role/initiator.png",
    biography:
      "Sova tracks, finds and eliminates enemies with precision and advanced scouting abilities.",
    abilities: [
      ["Q", "SHOCK BOLT", "Fire an explosive shock bolt."],
      ["E", "RECON BOLT", "Reveal enemies in the bolt's scanning area."],
      ["C", "OWL DRONE", "Control a drone and reveal enemies with a dart."],
      ["X", "HUNTER'S FURY", "Fire wall-piercing energy blasts."],
    ],
  },

  {
    id: "tejo",
    name: "TEJO",
    role: "INITIATOR",
    folder: "tejo",
    roleIcon: "/role/initiator.png",
    biography:
      "Tejo uses ballistic guidance technology to deliver explosives and clear entrenched enemies.",
    abilities: [
      ["Q", "STICKY GRENADE", "Launch an explosive grenade."],
      ["E", "SPECIAL DELIVERY", "Launch a grenade that can concuss enemies."],
      ["C", "STEALTH DRONE", "Deploy a drone that reveals enemies."],
      ["X", "ARMAGEDDON", "Direct a devastating strike along a selected path."],
    ],
  },

  {
    id: "veto",
    name: "VETO",
    role: "SENTINEL",
    folder: "veto",
    roleIcon: "/role/sentinel.png",
    biography:
      "Veto uses his mutation to nullify enemy powers and technology.",
    abilities: [
      ["Q", "CHOKEHOLD", "Trap enemies and apply disabling effects."],
      ["E", "CROSSCUT", "Create a location that Veto can return to."],
      ["C", "INTERCEPTOR", "Destroy certain enemy utility."],
      ["X", "EVOLUTION", "Activate Veto's enhanced combat state."],
    ],
  },

  {
    id: "viper",
    name: "VIPER",
    role: "CONTROLLER",
    folder: "viper",
    roleIcon: "/role/controller.png",
    biography:
      "Viper controls the battlefield with poisonous chemical devices and vision denial.",
    abilities: [
      ["Q", "POISON CLOUD", "Create a toxic gas cloud."],
      ["E", "TOXIC SCREEN", "Create a long wall of toxic gas."],
      ["C", "SNAKE BITE", "Create a damaging and vulnerable chemical zone."],
      ["X", "VIPER'S PIT", "Create a large toxic cloud that reduces visibility."],
    ],
  },

  {
    id: "vyse",
    name: "VYSE",
    role: "SENTINEL",
    folder: "vyse",
    roleIcon: "/role/sentinel.png",
    biography:
      "Vyse uses liquid metal technology to isolate, trap and disarm enemies.",
    abilities: [
      ["Q", "ARC ROSE", "Place a device that can flash enemies."],
      ["E", "SHEAR", "Create a wall when an enemy triggers the trap."],
      ["C", "RAZORVINE", "Create damaging and slowing metal vines."],
      ["X", "STEEL GARDEN", "Jam the primary weapons of enemies in the area."],
    ],
  },

  {
    id: "waylay",
    name: "WAYLAY",
    role: "DUELIST",
    folder: "waylay",
    roleIcon: "/role/duelist.png",
    biography:
      "Waylay uses radiant light to accelerate across the battlefield and disrupt enemy movement.",
    abilities: [
      ["Q", "SATURATION", "Create an area that disrupts enemy movement."],
      ["E", "LIGHTSPEED", "Dash forward with radiant speed."],
      ["C", "REFRACT", "Create a return point."],
      ["X", "CONVERGENT PATHS", "Launch a powerful radiant pulse."],
    ],
  },

  {
    id: "yoru",
    name: "YORU",
    role: "DUELIST",
    folder: "yoru",
    roleIcon: "/role/duelist.png",
    biography:
      "Yoru tears holes through reality to infiltrate enemy lines unseen.",
    abilities: [
      ["Q", "BLINDSIDE", "Throw a dimensional fragment that flashes enemies."],
      ["E", "GATECRASH", "Teleport using a dimensional tether."],
      ["C", "FAKEOUT", "Create a decoy that can flash enemies."],
      ["X", "DIMENSIONAL DRIFT", "Enter a dimension where Yoru cannot normally be affected."],
    ],
  },
]

/* =========================================================
   HELPERS
   ========================================================= */

const getClipId = (clip) =>
  clip?.id || clip?._id

const getVideoUrl = (clip) =>
  clip?.videoUrl ||
  clip?.video ||
  clip?.url ||
  ""

const getThumbnail = (clip, agent) =>
  clip?.thumbnailUrl ||
  clip?.thumbnail ||
  clip?.image ||
  `/agent/background/${agent.folder}.png`

/* =========================================================
   ALL AGENTS CARD
   ========================================================= */

function AllAgentsCard({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-52 overflow-hidden border text-left transition duration-300 sm:h-60 ${
        active
          ? "border-[#FF4655] bg-[#14171E]"
          : "border-white/[0.08] bg-[#0C0E12] hover:border-white/[0.25]"
      }`}
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[#101318]" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* LARGE MARK */}

      <div className="absolute inset-0 flex items-center justify-center">

        <div
          className={`relative flex h-24 w-24 items-center justify-center border transition duration-300 ${
            active
              ? "border-[#FF4655]/50 bg-[#FF4655]/10"
              : "border-white/[0.1] bg-white/[0.02] group-hover:border-white/[0.2]"
          }`}
        >

          <div className="absolute -left-1 -top-1 h-2 w-2 bg-[#FF4655]" />

          <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-white/20" />

          <span
            className={`font-display text-2xl font-black tracking-widest ${
              active
                ? "text-[#FF4655]"
                : "text-white/80"
            }`}
          >
            ALL
          </span>

        </div>

      </div>

      {/* TOP LABEL */}

      <div className="absolute left-3 top-3">

        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[#FF4655]">
          COMMUNITY
        </p>

      </div>

      {/* BOTTOM GRADIENT */}

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080A] to-transparent" />

      {/* BOTTOM CONTENT */}

      <div className="absolute bottom-0 left-0 right-0 p-3">

        <h3 className="font-display text-base font-black uppercase tracking-wider text-white">
          ALL AGENTS
        </h3>

        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-gray-500">
          VIEW ALL COMMUNITY CLIPS
        </p>

      </div>

      {/* ACTIVE LINE */}

      {active && (
        <div className="absolute left-0 right-0 top-0 h-1 bg-[#FF4655]" />
      )}

      <span
        className={`absolute bottom-0 right-0 h-2 w-2 ${
          active
            ? "bg-[#FF4655]"
            : "bg-white/10"
        }`}
      />

    </button>
  )
}

/* =========================================================
   AGENT CARD
   ========================================================= */

function AgentCard({ agent, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-52 overflow-hidden border text-left transition duration-300 sm:h-60 ${
        active
          ? "border-[#FF4655] bg-[#14171E]"
          : "border-white/[0.08] bg-[#0C0E12] hover:border-white/[0.25]"
      }`}
    >
      {/* BACKGROUND */}

      <img
        src={`/agent/background/${agent.folder}.png`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-500 group-hover:scale-110"
      />

      {/* AGENT */}

      <img
        src={`/agent/picture/${agent.folder}.png`}
        alt={agent.name}
        className={`absolute inset-0 h-full w-full object-cover object-top transition duration-500 ${
          active
            ? "scale-105 brightness-110"
            : "opacity-80 group-hover:scale-105 group-hover:opacity-100"
        }`}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/30 to-transparent" />

      {/* ACTIVE LINE */}

      {active && (
        <div className="absolute left-0 right-0 top-0 h-1 bg-[#FF4655]" />
      )}

      {/* ROLE */}

      <div className="absolute right-2 top-2 border border-white/[0.08] bg-[#07080A]/80 p-1.5 backdrop-blur-md">

        <img
          src={agent.roleIcon}
          alt=""
          className="h-3.5 w-3.5 object-contain opacity-80"
        />

      </div>

      {/* CONTENT */}

      <div className="absolute bottom-0 left-0 right-0 p-3">

        <div className="mb-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
          {agent.role}
        </div>

        <h3 className="font-display text-base font-black uppercase tracking-wider text-white">
          {agent.name}
        </h3>

      </div>

      {/* CORNER */}

      <span
        className={`absolute bottom-0 right-0 h-2 w-2 ${
          active
            ? "bg-[#FF4655]"
            : "bg-white/10"
        }`}
      />

    </button>
  )
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAgentId, setSelectedAgentId] =
    useState("all")

  const [activeAbilityIndex, setActiveAbilityIndex] =
    useState(0)

  const [clips, setClips] = useState([])
  const [loadingClips, setLoadingClips] =
    useState(false)

  const [activeClipVideo, setActiveClipVideo] =
    useState(null)

  /* =======================================================
     SEARCH
     ======================================================= */

  const filteredAgents = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase()

    if (!query) {
      return AGENTS_DATA
    }

    return AGENTS_DATA.filter((agent) => {
      return (
        agent.name
          .toLowerCase()
          .includes(query) ||
        agent.role
          .toLowerCase()
          .includes(query)
      )
    })
  }, [searchQuery])

  /* =======================================================
     SELECTED AGENT
     ======================================================= */

  const selectedAgent =
    AGENTS_DATA.find(
      (agent) =>
        agent.id === selectedAgentId
    ) || AGENTS_DATA[0]

  const isAllAgents =
    selectedAgentId === "all"

  const selectedAbility =
    selectedAgent.abilities[
      activeAbilityIndex
    ]

  /* =======================================================
     RESET WHEN AGENT CHANGES
     ======================================================= */

  useEffect(() => {
    setActiveAbilityIndex(0)
    setActiveClipVideo(null)
  }, [selectedAgentId])

  /* =======================================================
     FETCH CLIPS
     ======================================================= */

  useEffect(() => {
    let mounted = true

    const controller =
      new AbortController()

    setLoadingClips(true)
    setClips([])
    setActiveClipVideo(null)

    const clipsUrl = isAllAgents
      ? "/api/clips"
      : `/api/clips?agent=${encodeURIComponent(
          selectedAgent.id
        )}`

    fetch(clipsUrl, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch clips"
          )
        }

        return response.json()
      })
      .then((data) => {
        if (!mounted) return

        const result =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.clips)
              ? data.clips
              : []

        setClips(result)
      })
      .catch((error) => {
        if (
          error.name !== "AbortError" &&
          mounted
        ) {
          setClips([])
        }
      })
      .finally(() => {
        if (mounted) {
          setLoadingClips(false)
        }
      })

    return () => {
      mounted = false
      controller.abort()
    }
  }, [selectedAgentId, isAllAgents, selectedAgent.id])

  /* =======================================================
     SELECT AGENT
     ======================================================= */

  const handleAgentSelect = (agentId) => {
    setSelectedAgentId(agentId)
    setActiveClipVideo(null)
    setActiveAbilityIndex(0)
  }

  /* =======================================================
     PLAY CLIP
     ======================================================= */

  const handlePlayClip = (clip) => {
    const videoUrl = getVideoUrl(clip)

    if (!videoUrl) return

    setActiveClipVideo(
      getClipId(clip)
    )
  }

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <div className="min-h-screen bg-[#07080A] text-white antialiased">

      {/* BACKGROUND */}

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <main className="relative z-10 mx-auto max-w-[1536px] px-4 py-8 sm:px-8 lg:px-12">

        {/* =================================================
            HEADER
            ================================================= */}

        <header className="mb-8 flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FF4655]">

              <span className="h-1.5 w-1.5 bg-[#FF4655]" />

              01 // AGENT DATABASE

            </div>

            <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">

              AGENTS{" "}

              <span className="text-[#FF4655]">
                //
              </span>{" "}

              DIRECTORY

            </h1>

            <p className="mt-2 max-w-xl text-xs text-gray-400 sm:text-sm">
              Browse the complete agent roster and
              inspect tactical abilities and community
              clips.
            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="SEARCH AGENTS..."
              className="w-full border border-white/[0.1] bg-[#0F1115] py-3 pl-10 pr-4 font-mono text-xs uppercase tracking-widest text-white placeholder-gray-500 outline-none transition focus:border-[#FF4655]"
            />

            <span className="absolute bottom-0 right-0 top-0 w-1 bg-[#FF4655]/50" />

          </div>

        </header>

        {/* =================================================
            AGENT ROSTER
            ================================================= */}

        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <span className="h-1.5 w-1.5 bg-[#FF4655]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                AGENT ROSTER
              </span>

            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
              {filteredAgents.length + 1} /{" "}
              {AGENTS_DATA.length + 1}
            </span>

          </div>

          {/* =================================================
              30 CARD GRID
              ================================================= */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

            {/* ALL AGENTS */}

            <AllAgentsCard
              active={isAllAgents}
              onClick={() =>
                handleAgentSelect("all")
              }
            />

            {/* AGENTS */}

            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                active={
                  selectedAgentId ===
                  agent.id
                }
                onClick={() =>
                  handleAgentSelect(
                    agent.id
                  )
                }
              />
            ))}

          </div>

        </section>

        {/* =================================================
            AGENT INTEL
            HIDDEN FOR ALL AGENTS
            ================================================= */}

        {!isAllAgents && (
          <section
            id="agent-intel"
            className="mb-12 border border-white/[0.1] bg-[#0A0C0F] p-6 sm:p-10 lg:p-12"
          >

            {/* HEADER */}

            <div className="mb-8 flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FF4655]">

                <span className="h-1.5 w-1.5 bg-[#FF4655]" />

                02 // AGENT INTEL

              </div>

              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">

                PROTOCOL ID:{" "}

                {selectedAgent.id.toUpperCase()}

              </span>

            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

              {/* VISUAL */}

              <div className="relative flex h-[380px] items-center justify-center overflow-hidden border border-white/[0.06] bg-[#060709] sm:h-[480px] lg:col-span-5">

                <img
                  src={`/agent/background/${selectedAgent.folder}.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                />

                <img
                  src={`/agent/picture/${selectedAgent.folder}.png`}
                  alt={selectedAgent.name}
                  className="relative z-10 h-full w-auto object-contain transition duration-500 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-[#0A0C0F]/40" />

                <div className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-[#FF4655]" />

                <div className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-[#FF4655]" />

                <div className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#FF4655]" />

                <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#FF4655]" />

              </div>

              {/* DETAILS */}

              <div className="space-y-6 lg:col-span-7">

                <div>

                  <span className="inline-flex items-center gap-2 border border-[#FF4655]/30 bg-[#FF4655]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#FF4655]">

                    <img
                      src={selectedAgent.roleIcon}
                      alt=""
                      className="h-3.5 w-3.5 object-contain"
                    />

                    {selectedAgent.role}

                  </span>

                  <h2 className="mt-3 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl">

                    {selectedAgent.name}

                  </h2>

                  <p className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-300 sm:text-sm">

                    {selectedAgent.biography}

                  </p>

                </div>

                {/* ABILITY HEADER */}

                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">

                    SPECIAL ABILITIES

                  </span>

                  <span className="font-mono text-[10px] text-[#FF4655]">

                    {selectedAbility[1]}

                  </span>

                </div>

                {/* ABILITIES */}

                <div className="grid grid-cols-4 gap-2">

                  {selectedAgent.abilities.map(
                    (ability, index) => {

                      const active =
                        index ===
                        activeAbilityIndex

                      return (
                        <button
                          key={`${selectedAgent.id}-${ability[0]}`}
                          type="button"
                          onClick={() =>
                            setActiveAbilityIndex(
                              index
                            )
                          }
                          className={`flex flex-col items-center justify-center border p-3 transition ${
                            active
                              ? "border-[#FF4655] bg-[#FF4655]/10"
                              : "border-white/[0.08] bg-[#07080A] hover:border-white/[0.2]"
                          }`}
                        >

                          <img
                            src={`/agent/ability/${selectedAgent.folder}/${ability[0]}.png`}
                            alt={ability[1]}
                            className={`h-8 w-8 object-contain ${
                              active
                                ? "brightness-200"
                                : "opacity-60"
                            }`}
                          />

                          <span className="mt-2 font-mono text-xs font-bold text-[#FF4655]">

                            [{ability[0]}]

                          </span>

                        </button>
                      )
                    }
                  )}

                </div>

                {/* DESCRIPTION */}

                <div className="border border-white/[0.08] bg-[#07080A] p-5">

                  <div className="mb-2 flex items-center justify-between">

                    <h3 className="font-display text-sm font-bold uppercase tracking-wider">

                      {selectedAbility[1]}

                    </h3>

                    <span className="font-mono text-[10px] text-[#FF4655]">

                      KEY: {selectedAbility[0]}

                    </span>

                  </div>

                  <p className="text-xs leading-relaxed text-gray-400">

                    {selectedAbility[2]}

                  </p>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            COMMUNITY CLIPS
            ================================================= */}

        <section className="mb-12 border border-white/[0.08] bg-[#0A0C0F] p-6 sm:p-10">

          {/* HEADER */}

          <div className="mb-8 flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FF4655]">

              <span className="h-1.5 w-1.5 bg-[#FF4655]" />

              {isAllAgents
                ? "02 // ALL COMMUNITY CLIPS"
                : "03 // COMMUNITY CLIPS"}

            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">

              {isAllAgents
                ? "ALL AGENTS"
                : selectedAgent.name}

            </span>

          </div>

          {/* LOADING */}

          {loadingClips ? (

            <div className="flex h-48 items-center justify-center border border-white/[0.05] bg-[#07080A]">

              <div className="flex items-center gap-3 font-mono text-xs text-gray-400">

                <span className="h-2 w-2 animate-ping bg-[#FF4655]" />

                RETRIEVING COMMUNITY ARCHIVES...

              </div>

            </div>

          ) : clips.length > 0 ? (

            /* =================================================
               CLIPS
               ================================================= */

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {clips.map((clip) => {

                const clipId =
                  getClipId(clip)

                const videoUrl =
                  getVideoUrl(clip)

                const thumbnail =
                  getThumbnail(
                    clip,
                    selectedAgent
                  )

                const isPlaying =
                  activeClipVideo ===
                  clipId

                return (
                  <div
                    key={clipId}
                    className="group overflow-hidden border border-white/[0.08] bg-[#07080A]"
                  >

                    {/* VIDEO */}

                    <div className="relative aspect-video bg-black">

                      {isPlaying &&
                      videoUrl ? (

                        <video
                          src={videoUrl}
                          controls
                          autoPlay
                          playsInline
                          className="h-full w-full object-cover"
                          onEnded={() =>
                            setActiveClipVideo(
                              null
                            )
                          }
                        />

                      ) : (

                        <>
                          <img
                            src={thumbnail}
                            alt={
                              clip.title ||
                              "Community clip"
                            }
                            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105"
                          />

                          {videoUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                handlePlayClip(
                                  clip
                                )
                              }
                              className="absolute inset-0 flex items-center justify-center bg-black/40"
                              aria-label="Play clip"
                            >

                              <div className="flex h-12 w-12 items-center justify-center bg-[#FF4655] text-white transition group-hover:scale-110">

                                <Play
                                  size={20}
                                  className="ml-0.5 fill-current"
                                />

                              </div>

                            </button>
                          )}

                        </>
                      )}

                    </div>

                    {/* INFO */}

                    <div className="p-4">

                      <h3 className="line-clamp-1 font-display text-sm font-bold uppercase">

                        {clip.title ||
                          "COMMUNITY HIGHLIGHT"}

                      </h3>

                      <p className="mt-1 font-mono text-[10px] text-gray-400">

                        PLAYER:{" "}

                        <span className="text-white">

                          {clip.playerName ||
                            clip.username ||
                            "PLAYER"}

                        </span>

                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[9px] uppercase tracking-wider text-gray-500">

                        <span>
                          MAP:{" "}
                          {clip.map ||
                            "CLASSIFIED"}
                        </span>

                        <span className="text-[#FF4655]">

                          {clip.agent ||
                            clip.type ||
                            "PLAY"}

                        </span>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>

          ) : (

            /* =================================================
               EMPTY
               ================================================= */

            <div className="flex flex-col items-center justify-center border border-white/[0.06] bg-[#07080A] px-4 py-16 text-center">

              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-white/[0.03] text-[#FF4655]">

                <Radio size={24} />

              </div>

              <h3 className="font-display text-lg font-black uppercase tracking-wider">

                {isAllAgents
                  ? "NO COMMUNITY CLIPS YET"
                  : "YOU HAVE NOT PLAYED THIS AGENT YET"}

              </h3>

              <p className="mt-2 max-w-md font-mono text-xs uppercase tracking-widest text-gray-500">

                {isAllAgents
                  ? "Community clips will appear here when available."
                  : "Clips for this agent will appear here when available."}

              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  )
}