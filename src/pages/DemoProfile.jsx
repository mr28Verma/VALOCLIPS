import { useState } from "react"
import {
  Plus,
  Upload,
  X,
  Play,
  Heart,
  Eye,
  MoreHorizontal,
  Share2,
  Settings,
  Trophy,
  Users,
  ChevronRight,
  Flame,
  Clock3,
  Star,
} from "lucide-react"
import Footer from "../components/Footer"

const clips = [
  {
    id: 1,
    title: "1 HP. 3 KILLS. NO WAY.",
    image:
      "https://interfaceingame.com/wp-content/uploads/valorant/valorant-clutch.png",
    map: "ASCENT",
    agent: "JETT",
    views: "4.8K",
    likes: "621",
    type: "Clutch",
    time: "2 days ago",
  },
  {
    id: 2,
    title: "THE CLEANEST OP SHOT",
    image:
      "https://cdn.gameboost.com/article-images/2024-10-21/56aab95b-af04-4cf8-b36d-bc5839b4d7bf.webp",
    map: "ICEBOX",
    agent: "JETT",
    views: "3.2K",
    likes: "418",
    type: "Highlight",
    time: "4 days ago",
  },
  {
    id: 3,
    title: "THEY REALLY PUSHED ME",
    image: "https://i.ytimg.com/vi/pVGQuBlo46g/maxresdefault.jpg",
    map: "HAVEN",
    agent: "JETT",
    views: "2.7K",
    likes: "306",
    type: "Highlight",
    time: "6 days ago",
  },
  {
    id: 4,
    title: "ACE TO END THE GAME",
    image:
      "https://interfaceingame.com/wp-content/uploads/valorant/valorant-clutch.png",
    map: "BIND",
    agent: "JETT",
    views: "8.1K",
    likes: "904",
    type: "Ace",
    time: "1 week ago",
  },
  {
    id: 5,
    title: "ONE TAP AFTER ONE TAP",
    image:
      "https://cdn.gameboost.com/article-images/2024-10-21/56aab95b-af04-4cf8-b36d-bc5839b4d7bf.webp",
    map: "SUNSET",
    agent: "JETT",
    views: "1.9K",
    likes: "244",
    type: "Highlight",
    time: "1 week ago",
  },
  {
    id: 6,
    title: "LAST ROUND CLUTCH",
    image: "https://i.ytimg.com/vi/pVGQuBlo46g/maxresdefault.jpg",
    map: "LOTUS",
    agent: "JETT",
    views: "5.6K",
    likes: "713",
    type: "Clutch",
    time: "2 weeks ago",
  },
]

const squad = [
  {
    name: "ZALZALA",
    tag: "4444",
    image: "friends/ZALZALA.png",
    rank: "Bronze 2",
    agent: "SOVA",
    online: true,
    owner: true,
  },
  {
    name: "Moganbo",
    tag: "haha",
    image: "/friends/Mogambo.png",
    rank: "Silver 2",
    agent: "Sage",
    online: true,
  },
  {
    name: "DaRk",
    tag: "UR01",
    image: "/friends/DaRk.png",
    rank: "Gold 3",
    agent: "REYNA",
    online: false,
  },
  {
    name: "PewPewPotato",
    tag: "RJV",
    image: "/friends/PewPewPotato.png",
    rank: "Platinum 1",
    agent: "JETT",
    online: false,
  },
  {
    name: "PaNKhRr",
    tag: "001B",
    image: "/friends/PaNKhRr.png",
    rank: "Silver 3",
    agent: "Clove",
    online: true,
  },
]

const filters = ["All", "Highlights", "Aces", "Clutches"]

const agents = [
  "Astra",
  "Breach",
  "Brimstone",
  "Chamber",
  "Clove",
  "Cypher",
  "Deadlock",
  "Fade",
  "Gekko",
  "Harbor",
  "Iso",
  "Jett",
  "KAY/O",
  "Killjoy",
  "Neon",
  "Omen",
  "Phoenix",
  "Raze",
  "Reyna",
  "Sage",
  "Skye",
  "Sova",
  "Tejo",
  "Viper",
  "Vyse",
  "Waylay",
  "Yoru",
]

// Riot's official asset CDN, exposed via the public valorant-api.com
// "competitivetiers" endpoint. Tier indices 0-2 are unused/reserved,
// 3-26 are Iron 1 through Immortal 3, and 27 is Radiant.
const RANK_TIER_BASE =
  "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04"

const ranks = [
  { name: "Iron 1", icon: `${RANK_TIER_BASE}/3/largeicon.png` },
  { name: "Iron 2", icon: `${RANK_TIER_BASE}/4/largeicon.png` },
  { name: "Iron 3", icon: `${RANK_TIER_BASE}/5/largeicon.png` },

  { name: "Bronze 1", icon: `${RANK_TIER_BASE}/6/largeicon.png` },
  { name: "Bronze 2", icon: `${RANK_TIER_BASE}/7/largeicon.png` },
  { name: "Bronze 3", icon: `${RANK_TIER_BASE}/8/largeicon.png` },

  { name: "Silver 1", icon: `${RANK_TIER_BASE}/9/largeicon.png` },
  { name: "Silver 2", icon: `${RANK_TIER_BASE}/10/largeicon.png` },
  { name: "Silver 3", icon: `${RANK_TIER_BASE}/11/largeicon.png` },

  { name: "Gold 1", icon: `${RANK_TIER_BASE}/12/largeicon.png` },
  { name: "Gold 2", icon: `${RANK_TIER_BASE}/13/largeicon.png` },
  { name: "Gold 3", icon: `${RANK_TIER_BASE}/14/largeicon.png` },

  { name: "Platinum 1", icon: `${RANK_TIER_BASE}/15/largeicon.png` },
  { name: "Platinum 2", icon: `${RANK_TIER_BASE}/16/largeicon.png` },
  { name: "Platinum 3", icon: `${RANK_TIER_BASE}/17/largeicon.png` },

  { name: "Diamond 1", icon: `${RANK_TIER_BASE}/18/largeicon.png` },
  { name: "Diamond 2", icon: `${RANK_TIER_BASE}/19/largeicon.png` },
  { name: "Diamond 3", icon: `${RANK_TIER_BASE}/20/largeicon.png` },

  { name: "Ascendant 1", icon: `${RANK_TIER_BASE}/21/largeicon.png` },
  { name: "Ascendant 2", icon: `${RANK_TIER_BASE}/22/largeicon.png` },
  { name: "Ascendant 3", icon: `${RANK_TIER_BASE}/23/largeicon.png` },

  { name: "Immortal 1", icon: `${RANK_TIER_BASE}/24/largeicon.png` },
  { name: "Immortal 2", icon: `${RANK_TIER_BASE}/25/largeicon.png` },
  { name: "Immortal 3", icon: `${RANK_TIER_BASE}/26/largeicon.png` },

  { name: "Radiant", icon: `${RANK_TIER_BASE}/27/largeicon.png` },
]

const currentRank = "Bronze 2"

function getRank(rankName) {
  return ranks.find((rank) => rank.name === rankName)
}

function RankIcon({ rank, className = "" }) {
  const rankData = getRank(rank)

  if (!rankData) return null

  return (
    <img
      src={rankData.icon}
      alt={rank}
      className={className}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display = "none"
      }}
    />
  )
}

function DemoProfile() {
  const [showUpload, setShowUpload] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  const onlineCount = squad.filter((player) => player.online).length

  const filteredClips =
    activeFilter === "All"
      ? clips
      : clips.filter((clip) => clip.type === activeFilter.slice(0, -1))

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,70,85,0.08),transparent_30%)]" />

        <div className="absolute right-0 top-0 h-full w-[45%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.012))]" />

        <div className="relative mx-auto max-w-[1400px] px-4 pb-7 pt-6 sm:px-6 sm:pb-8 sm:pt-7 lg:px-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#FF4655]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF4655]">
                  PLAYER PROFILE
                </span>
              </div>

              <p className="mt-2 text-[11px] text-gray-600">
                VALORANT · PLAYER CARD · CLIPS
              </p>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-white/[0.025] text-gray-500 transition hover:border-white/[0.15] hover:text-white"
            >
              <MoreHorizontal size={17} />
            </button>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[350px_minmax(0,1fr)] lg:items-center xl:grid-cols-[370px_minmax(0,1fr)]">
            <div className="relative flex items-start justify-center lg:justify-start">
              <div className="absolute -inset-10 bg-[#FF4655]/[0.025] blur-3xl" />

              <div className="relative flex aspect-[280/620] h-[min(72vh,560px)] max-h-[560px] min-h-[360px] sm:h-[min(72vh,620px)] sm:max-h-[620px] sm:min-h-[380px] w-auto items-start justify-center">
                <div className="absolute left-1/2 top-2 h-1 w-20 -translate-x-1/2 bg-[#FF4655]" />

                <img
                  src="/player-card.png"
                  alt="VALORANT player card"
                  className="relative z-10 h-full w-full object-contain object-top"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-[#08090B] to-transparent" />

                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-white/[0.08] bg-[#0D0E11]/90 px-3 py-1.5 backdrop-blur">
                  <RankIcon
                    rank={currentRank}
                    className="h-6 w-6 object-contain"
                  />
                  
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-start pt-8 sm:pt-10 lg:pt-0">
              <div className="flex flex-col gap-7 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4ADE80]">
                      RIOT CONNECTED
                    </span>
                  </div>

                  <h1 className="mt-4 text-3xl font-black leading-none tracking-[-0.045em] sm:text-6xl">
                    ZALZALA
                    <span className="ml-1.5 text-gray-600 sm:ml-2">#4444</span>
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    @saksham
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-[11px] font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Share2 size={14} />
                    Share
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2 border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-[11px] font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Settings size={14} />
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="mt-6 grid max-w-[760px] sm:mt-8 grid-cols-2 border-y border-white/[0.06] sm:grid-cols-4">
                <div className="border-b border-white/[0.06] px-3 py-4 sm:px-5 sm:py-5 sm:border-b-0 sm:border-r">
                  <p className="text-xl font-bold">128</p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Clips
                  </p>
                </div>

                <div className="border-b border-white/[0.06] px-3 py-4 sm:px-5 sm:py-5 sm:border-b-0 sm:border-r">
                  <p className="text-xl font-bold">24.8K</p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Views
                  </p>
                </div>

                <div className="px-3 py-4 sm:px-5 sm:py-5 sm:border-r sm:border-white/[0.06]">
                  <p className="text-xl font-bold">3.2K</p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Likes
                  </p>
                </div>

                <div className="px-3 py-4 sm:px-5 sm:py-5">
                  <p className="text-xl font-bold">5</p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Squad
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-3 border border-white/[0.06] bg-[#0D0E11] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center">
                    <RankIcon
                      rank={currentRank}
                      className="h-9 w-9 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.16em] text-gray-600">
                      Current Rank
                    </p>

                    <p className="mt-0.5 text-xs font-bold">
                      Bronze 2
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border border-white/[0.06] bg-[#0D0E11] px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden bg-[#FF4655]/10">
                    <img
                      src="https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png"
                      alt="Sova"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.16em] text-gray-600">
                      Main Agent
                    </p>

                    <p className="mt-0.5 text-xs font-bold">
                      Sova
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border border-white/[0.06] bg-[#0D0E11] px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center bg-[#FF4655]/10">
                    <Flame size={15} className="text-[#FF4655]" />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.16em] text-gray-600">
                      Best Streak
                    </p>

                    <p className="mt-0.5 text-xs font-bold">
                      7 clips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-white/[0.06] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#FF4655]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF4655]">
                THE VAULT
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-bold uppercase tracking-[-0.03em]">
              Saksham's clips
            </h2>

            <p className="mt-1 text-[11px] text-gray-600">
              The rounds worth remembering.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="group relative flex w-full items-center justify-center gap-3 sm:w-fit overflow-hidden bg-[#FF4655] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
          >
            <span className="absolute inset-0 translate-x-[-101%] bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />

            <span className="relative flex items-center gap-2">
              <Plus size={15} />
              Add Clip
            </span>
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                activeFilter === filter
                  ? "bg-[#FF4655] text-white"
                  : "border border-white/[0.06] bg-white/[0.02] text-gray-600 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredClips.length > 0 && (
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2">
            <article className="group relative overflow-hidden border border-white/[0.07] bg-[#101115] lg:row-span-2">
              <div className="relative aspect-[16/10] h-full min-h-[300px] sm:min-h-[360px] overflow-hidden">
                <img
                  src={filteredClips[0].image}
                  alt={filteredClips[0].title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 bg-[#FF4655] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </span>

                  <span className="bg-black/60 px-2.5 py-1.5 text-[9px] font-bold tracking-wider text-gray-300 backdrop-blur">
                    {filteredClips[0].map}
                  </span>
                </div>

                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF4655] opacity-0 shadow-[0_0_35px_rgba(255,70,85,0.3)] transition-all duration-300 group-hover:opacity-100"
                >
                  <Play size={21} fill="currentColor" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4655]">
                    {filteredClips[0].agent} · {filteredClips[0].type}
                  </p>

                  <h3 className="text-xl font-black uppercase leading-tight tracking-[-0.03em] sm:text-2xl">
                    {filteredClips[0].title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[9px] sm:mt-4 sm:gap-5 sm:text-[10px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Eye size={12} />
                      {filteredClips[0].views}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Heart size={12} />
                      {filteredClips[0].likes}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={12} />
                      {filteredClips[0].time}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              {filteredClips.slice(1, 5).map((clip) => (
                <article
                  key={clip.id}
                  className="group overflow-hidden border border-white/[0.07] bg-[#101115]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={clip.image}
                      alt={clip.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                    <div className="absolute left-3 top-3 flex gap-1.5">
                      <span className="bg-black/70 px-2 py-1 text-[8px] font-bold tracking-wider text-gray-300 backdrop-blur">
                        {clip.map}
                      </span>

                      <span className="bg-[#FF4655] px-2 py-1 text-[8px] font-bold tracking-wider">
                        {clip.agent}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF4655] opacity-0 transition group-hover:opacity-100"
                    >
                      <Play size={15} fill="currentColor" />
                    </button>

                    <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[9px] text-gray-300">
                      <Eye size={11} />
                      {clip.views}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="truncate text-xs font-bold text-white">
                      {clip.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.12em] text-gray-600">
                        {clip.type}
                      </span>

                      <span className="flex items-center gap-1 text-[9px] text-gray-600">
                        <Heart size={11} />
                        {clip.likes}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-white/[0.06] bg-[#0C0D10]">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#FF4655]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF4655]">
                  5-STACK
                </p>
              </div>

              <h2 className="mt-3 text-2xl font-bold uppercase tracking-[-0.03em]">
                Your squad
              </h2>

              <p className="mt-1 text-[11px] text-gray-600">
                The five players you queue with.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                {onlineCount} ONLINE · {squad.length} TOTAL
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {squad.map((player) => (
              <div
                key={player.name}
                className={`group relative overflow-hidden border bg-[#101115] transition ${
                  player.owner
                    ? "border-[#FF4655]/40"
                    : "border-white/[0.06] hover:border-white/[0.14]"
                }`}
              >
                {player.owner && (
                  <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-[#FF4655]" />
                )}

                <div className="relative h-[165px] overflow-hidden sm:h-[190px] bg-[#0B0C0F]">
                  <img
                    src={player.image}
                    alt={player.name}
                    className={`h-full w-full object-contain transition duration-500 ${
                      player.owner
                        ? "opacity-70 group-hover:scale-105 group-hover:opacity-90"
                        : "group-hover:scale-105"
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#101115] via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        player.online ? "bg-[#4ADE80]" : "bg-gray-700"
                      }`}
                    />

                    <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                      {player.online ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>

                  {player.owner && (
                    <span className="absolute right-3 top-3 bg-[#FF4655] px-2 py-1 text-[7px] font-bold uppercase tracking-wider">
                      YOU
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="truncate text-sm font-bold">
                    {player.name}
                    <span className="ml-1 text-gray-600">
                      #{player.tag}
                    </span>
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-gray-600">
                      <RankIcon
                        rank={player.rank}
                        className="h-5 w-5 object-contain"
                      />
                      {player.rank}
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF4655]">
                      {player.agent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 border border-dashed border-white/[0.06] py-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-700">
            <Users size={13} />
            5 players · one squad · endless rounds
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
        <div className="relative overflow-hidden border border-white/[0.06] bg-[#0D0E11]">
          <div className="absolute right-0 top-0 h-full w-[40%] bg-[radial-gradient(circle,rgba(255,70,85,0.08),transparent_65%)]" />

          <div className="relative flex flex-col gap-6 px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Flame size={14} className="text-[#FF4655]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
                  KEEP THE VAULT GROWING
                </span>
              </div>

              <h3 className="mt-2 text-xl font-bold">
                Got another round worth showing?
              </h3>

              <p className="mt-1 text-[11px] text-gray-600">
                Upload your next clip and add it to your profile.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="flex items-center justify-center gap-2 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-black transition hover:bg-gray-200"
            >
              <Plus size={15} />
              Add a clip
            </button>
          </div>
        </div>
      </section>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-4 sm:px-5 sm:py-6 backdrop-blur-md">
          <div className="w-full max-w-[600px] max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-h-[calc(100vh-3rem)] border border-white/[0.08] bg-[#101115] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#FF4655]" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FF4655]">
                    NEW CLIP
                  </p>
                </div>

                <h3 className="mt-2 text-lg font-bold">
                  Add a moment to your vault
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-white/[0.05] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <label className="group flex min-h-[180px] cursor-pointer sm:min-h-[220px] flex-col items-center justify-center border border-dashed border-white/[0.12] bg-[#0B0C0F] transition hover:border-[#FF4655]/50">
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4655]/10 transition group-hover:bg-[#FF4655]">
                  <Upload
                    size={23}
                    className="text-[#FF4655] transition group-hover:text-white"
                  />
                </div>

                <p className="mt-5 text-sm font-semibold">
                  Drop your clip here
                </p>

                <p className="mt-2 text-[11px] text-gray-600">
                  or click anywhere to browse
                </p>

                <p className="mt-5 text-[9px] uppercase tracking-[0.16em] text-gray-700">
                  MP4 · MOV · WEBM · MAX 500MB
                </p>
              </label>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Clip title"
                  className="border border-white/[0.07] bg-[#0B0C0F] px-4 py-3 text-xs text-white outline-none placeholder:text-gray-700 focus:border-[#FF4655]/50"
                />

                <select className="border border-white/[0.07] bg-[#0B0C0F] px-4 py-3 text-xs text-gray-500 outline-none focus:border-[#FF4655]/50">
                  <option value="">Choose map</option>
                  <option value="Ascent">Ascent</option>
                  <option value="Bind">Bind</option>
                  <option value="Breeze">Breeze</option>
                  <option value="Fracture">Fracture</option>
                  <option value="Haven">Haven</option>
                  <option value="Icebox">Icebox</option>
                  <option value="Lotus">Lotus</option>
                  <option value="Pearl">Pearl</option>
                  <option value="Split">Split</option>
                  <option value="Sunset">Sunset</option>
                  <option value="Abyss">Abyss</option>
                  <option value="Corrode">Corrode</option>
                </select>

                <select className="border border-white/[0.07] bg-[#0B0C0F] px-4 py-3 text-xs text-gray-500 outline-none focus:border-[#FF4655]/50 sm:col-span-2">
                  <option value="">Choose agent</option>

                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-[#FF4655] py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:bg-[#E83F4D]"
              >
                <Upload size={14} />
                Upload Clip
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

export default DemoProfile