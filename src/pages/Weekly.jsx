import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Sparkles,
  Play,
  Upload,
  RefreshCw,
  Search,
  Video,
  Info,
  ChevronRight,
  X,
  AlertCircle,
  User,
  Layers,
  Calendar,
} from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || ""

const FILTERS = [
  { id: "All", label: "ALL" },
  { id: "Highlights", label: "HIGHLIGHTS" },
  { id: "Aces", label: "ACES" },
  { id: "Clutches", label: "CLUTCHES" },
]

export default function Weekly() {
  const navigate = useNavigate()

  const [leaderboardData, setLeaderboardData] = useState([])
  const [weeklyClipData, setWeeklyClipData] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")
      const headers = { "Content-Type": "application/json" }
      if (token) headers["Authorization"] = `Bearer ${token}`

      // Fetch Weekly Best Clip
      try {
        const weeklyRes = await fetch(`${API_URL}/api/leaderboard/weekly`, {
          credentials: "include",
          headers,
        })
        if (weeklyRes.ok) {
          const weeklyJson = await weeklyRes.json()
          setWeeklyClipData(weeklyJson)
        } else {
          setWeeklyClipData(null)
        }
      } catch (e) {
        console.warn("Weekly clip endpoint fetch error:", e)
        setWeeklyClipData(null)
      }

      // Fetch Community Highlights & Leaderboard
      let clipsData = []
      let playersData = []

      try {
        const lbRes = await fetch(`${API_URL}/api/leaderboard`, {
          credentials: "include",
          headers,
        })
        if (lbRes.ok) {
          const lbJson = await lbRes.json()
          playersData = Array.isArray(lbJson) ? lbJson : lbJson.leaderboard || lbJson.players || []
        }
      } catch (e) {
        console.warn("Leaderboard fetch error:", e)
      }

      try {
        const clipsRes = await fetch(`${API_URL}/api/clips`, {
          credentials: "include",
          headers,
        })
        if (clipsRes.ok) {
          const clipsJson = await clipsRes.json()
          clipsData = Array.isArray(clipsJson) ? clipsJson : clipsJson.clips || []
        }
      } catch (e) {
        console.warn("Clips fetch error:", e)
      }

      if (!playersData.length && clipsData.length > 0) {
        playersData = aggregateLeaderboardFromClips(clipsData)
      }

      setLeaderboardData(playersData)
    } catch (err) {
      console.error("Community highlights fetch error:", err)
      setError(err.message || "Unable to load community highlights.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function aggregateLeaderboardFromClips(clips) {
    const userMap = {}
    clips.forEach((clip) => {
      const user = clip.user || clip.player || {}
      const userId = user._id || user.id || clip.username || "anonymous"
      const username = user.username || clip.username || "Unknown Player"
      const tagline = user.tagline || clip.tagline || ""
      const avatar = user.avatar || user.image || null

      if (!userMap[userId]) {
        userMap[userId] = {
          id: userId,
          player: { username, tagline, avatar },
          clips: 0,
          aces: 0,
          clutches: 0,
          highlights: 0,
        }
      }

      userMap[userId].clips += 1
      const type = String(clip.type || "").toLowerCase()
      if (type === "ace") userMap[userId].aces += 1
      else if (type === "clutch") userMap[userId].clutches += 1
      else if (type === "highlight") userMap[userId].highlights += 1
    })
    return Object.values(userMap)
  }

  const filteredLeaderboard = useMemo(() => {
    let list = [...leaderboardData]

    if (activeFilter === "Aces") {
      list = list.filter((p) => (p.aces || 0) > 0)
      list.sort((a, b) => (b.aces || 0) - (a.aces || 0) || (b.clips || 0) - (a.clips || 0))
    } else if (activeFilter === "Clutches") {
      list = list.filter((p) => (p.clutches || 0) > 0)
      list.sort((a, b) => (b.clutches || 0) - (a.clutches || 0) || (b.clips || 0) - (a.clips || 0))
    } else if (activeFilter === "Highlights") {
      list = list.filter((p) => (p.highlights || 0) > 0)
      list.sort((a, b) => (b.highlights || 0) - (a.highlights || 0) || (b.clips || 0) - (a.clips || 0))
    } else {
      list.sort((a, b) => (b.clips || 0) - (a.clips || 0))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((item) => {
        const name = item.player?.username || item.username || ""
        const tag = item.player?.tagline || item.tagline || ""
        return name.toLowerCase().includes(q) || tag.toLowerCase().includes(q)
      })
    }

    return list
  }, [leaderboardData, activeFilter, searchQuery])

  const handleRowClick = (player) => {
    const id = player.id || player._id
    if (id) {
      navigate(`/profile?id=${id}`)
    } else {
      navigate("/profile")
    }
  }

  const featuredClip = weeklyClipData?.clip
  const weekLabel = weeklyClipData?.week

  return (
    <main className="min-h-screen bg-[#08090B] text-white selection:bg-[#FF4655] selection:text-white">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-none bg-[#FF4655]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-none bg-[#FF4655]/5 blur-[150px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}
        <header className="mb-10 border-b border-white/[0.08] pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-2 w-2 bg-[#FF4655]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#FF4655]">
                  01 // WEEKLY FEATURE
                </span>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                BEST CLIP <span className="text-[#FF4655]">OF THE WEEK</span>
              </h1>
              <p className="mt-2 text-xs font-medium text-gray-400 sm:text-sm">
                One clip. One week. The moment worth remembering.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex h-10 items-center gap-2 border border-[#FF4655] bg-[#FF4655] px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E03E4D]"
              >
                <Upload size={14} />
                <span>Upload Clip</span>
              </button>
            </div>
          </div>
        </header>

        {/* BEST CLIP OF THE WEEK HERO */}
        <section className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FF4655]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-300">
                BEST CLIP OF THE WEEK
              </span>
            </div>
            {weekLabel && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-400 border border-white/[0.08] bg-[#0D0E11] px-2.5 py-0.5">
                <Calendar size={12} className="text-[#FF4655]" />
                <span>{weekLabel}</span>
              </div>
            )}
          </div>

          <div className="relative border border-white/[0.08] bg-[#0D0E11] p-1">
            {/* Tactical Corner Brackets */}
            <div className="absolute right-0 top-0 h-0 w-0 border-r-[12px] border-t-[12px] border-r-transparent border-t-[#FF4655]" />
            <div className="absolute bottom-0 left-0 h-0 w-0 border-b-[12px] border-l-[12px] border-b-[#FF4655] border-l-transparent" />

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <RefreshCw size={24} className="animate-spin text-[#FF4655] mb-3" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Loading weekly feature...
                </span>
              </div>
            ) : featuredClip ? (
              <div className="grid grid-cols-1 items-center gap-6 bg-white/[0.01] p-5 lg:grid-cols-12 lg:gap-8">
                {/* Thumbnail / Video Box */}
                <div className="relative aspect-video overflow-hidden border border-white/[0.08] bg-black lg:col-span-7">
                  {featuredClip.thumbnail || featuredClip.thumbnailUrl ? (
                    <img
                      src={featuredClip.thumbnail || featuredClip.thumbnailUrl}
                      alt={featuredClip.title || "Best Clip of the Week"}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-black via-[#0D0E11] to-[#15181E]">
                      <Video size={48} className="text-white/10" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {featuredClip.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedVideoUrl(featuredClip.videoUrl)}
                      className="group/btn absolute inset-0 flex items-center justify-center"
                      aria-label="Watch Best Clip of the Week"
                    >
                      <div className="flex h-14 w-14 items-center justify-center border border-[#FF4655] bg-[#FF4655]/90 text-white transition group-hover/btn:scale-110 group-hover/btn:bg-[#FF4655]">
                        <Play size={24} className="ml-1 fill-white" />
                      </div>
                    </button>
                  )}

                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="border border-[#FF4655]/40 bg-black/80 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#FF4655]">
                      WEEKLY FEATURE
                    </span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#FF4655]" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4655]">
                      {featuredClip.type || "FEATURED MOMENT"}
                    </span>
                  </div>

                  <h2 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
                    {featuredClip.title || "Untitled Weekly Feature"}
                  </h2>

                  <div className="mt-4 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.1] bg-white/[0.03]">
                      <User size={18} className="text-[#FF4655]" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-wide text-white">
                        {featuredClip.username || "Unknown Player"}
                      </p>
                      {featuredClip.tagline && (
                        <p className="text-xs font-mono text-gray-400">
                          #{featuredClip.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-y border-white/[0.06] py-3">
                    <div>
                      <p className="text-[9px] font-semibold uppercase text-gray-500">AGENT</p>
                      <p className="text-xs font-bold text-gray-200">
                        {featuredClip.agent || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold uppercase text-gray-500">MAP</p>
                      <p className="text-xs font-bold text-gray-200">
                        {featuredClip.map || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    {featuredClip.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setSelectedVideoUrl(featuredClip.videoUrl)}
                        className="flex items-center gap-2 border border-[#FF4655] bg-[#FF4655] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E03E4D]"
                      >
                        <Play size={12} className="fill-current" />
                        <span>Watch Clip</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                  <Video size={20} className="text-gray-600" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
                  No Best Clip of the Week yet.
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Submit clips to qualify for next week's featured spot.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* COMMUNITY HIGHLIGHTS LEADERBOARD SECTION */}
        <section>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#FF4655]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">
                  02 // COMMUNITY METRICS
                </span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                COMMUNITY HIGHLIGHTS
              </h2>
              <p className="mt-1 text-xs font-medium text-gray-400">
                Clips, aces and memorable moments shared by the community.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-1.5">
                {FILTERS.map((tab) => {
                  const active = activeFilter === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id)}
                      className={`relative px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition ${
                        active
                          ? "border border-[#FF4655] bg-[#FF4655] text-white"
                          : "border border-white/[0.06] bg-[#0D0E11] text-gray-400 hover:border-white/[0.15] hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH PLAYER..."
                  className="w-full border border-white/[0.08] bg-[#0D0E11] py-1.5 pl-9 pr-3 text-xs uppercase tracking-wider text-white placeholder-gray-600 transition focus:border-[#FF4655] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABLE / CARDS CONTAINER */}
          <div className="border border-white/[0.08] bg-[#0D0E11]">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <RefreshCw size={24} className="animate-spin text-[#FF4655] mb-3" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Syncing Community Activity...
                </span>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <AlertCircle size={28} className="text-[#FF4655] mb-3" />
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  Unable to load community highlights.
                </p>
                <p className="mt-1 text-xs text-gray-500">{error}</p>
                <button
                  type="button"
                  onClick={fetchData}
                  className="mt-4 flex items-center gap-2 border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase text-white transition hover:bg-white/[0.08]"
                >
                  <RefreshCw size={14} />
                  <span>Retry Connection</span>
                </button>
              </div>
            )}

            {!loading && !error && filteredLeaderboard.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                  <Layers size={24} className="text-gray-600" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white">
                  COMMUNITY HIGHLIGHTS
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  No clips have been shared yet.
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Upload your first clip to start building community activity.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="mt-6 flex items-center gap-2 border border-[#FF4655] bg-[#FF4655] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E03E4D]"
                >
                  <Upload size={14} />
                  <span>Upload First Clip</span>
                </button>
              </div>
            )}

            {!loading && !error && filteredLeaderboard.length > 0 && (
              <>
                {/* DESKTOP TABLE */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.08] bg-white/[0.01] text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-500">
                        <th className="py-3.5 pl-6 pr-3 w-20">POS</th>
                        <th className="py-3.5 px-4">PLAYER</th>
                        <th className="py-3.5 px-4 text-right">CLIPS</th>
                        <th className="py-3.5 px-4 text-right">ACES</th>
                        <th className="py-3.5 px-4 text-right">CLUTCHES</th>
                        <th className="py-3.5 pr-6 pl-4 text-right">HIGHLIGHTS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {filteredLeaderboard.map((item, index) => {
                        const position = String(index + 1).padStart(2, "0")
                        const username = item.player?.username || item.username || "Unknown Player"
                        const tagline = item.player?.tagline || item.tagline || ""
                        const avatar = item.player?.avatar || item.avatar || null

                        const clipsCount = item.clips ?? 0
                        const acesCount = item.aces ?? 0
                        const clutchesCount = item.clutches ?? 0
                        const highlightsCount = item.highlights ?? 0

                        const isTop3 = index < 3

                        return (
                          <tr
                            key={item.id || item._id || index}
                            onClick={() => handleRowClick(item)}
                            className="group cursor-pointer transition hover:bg-white/[0.02]"
                          >
                            <td className="py-4 pl-6 pr-3">
                              <span
                                className={`font-mono text-xs font-bold tracking-wider ${
                                  index === 0
                                    ? "text-[#FF4655]"
                                    : isTop3
                                    ? "text-white"
                                    : "text-gray-500"
                                }`}
                              >
                                {position}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                                  {avatar ? (
                                    <img
                                      src={avatar}
                                      alt={username}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <User size={16} className="text-gray-600" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold uppercase tracking-wide text-white transition group-hover:text-[#FF4655]">
                                      {username}
                                    </span>
                                    {tagline && (
                                      <span className="text-[10px] font-mono text-gray-500">
                                        #{tagline}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] font-mono uppercase text-gray-600">
                                    COMMUNITY CONTRIBUTOR
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <span className="font-mono text-xs font-bold text-white">
                                {clipsCount}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  Number(acesCount) > 0 ? "text-white" : "text-gray-600"
                                }`}
                              >
                                {acesCount}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  Number(clutchesCount) > 0 ? "text-white" : "text-gray-600"
                                }`}
                              >
                                {clutchesCount}
                              </span>
                            </td>

                            <td className="py-4 pr-6 pl-4 text-right">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  Number(highlightsCount) > 0 ? "text-white" : "text-gray-600"
                                }`}
                              >
                                {highlightsCount}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARDS VIEW */}
                <div className="divide-y divide-white/[0.06] md:hidden">
                  {filteredLeaderboard.map((item, index) => {
                    const position = String(index + 1).padStart(2, "0")
                    const username = item.player?.username || item.username || "Unknown Player"
                    const tagline = item.player?.tagline || item.tagline || ""
                    const avatar = item.player?.avatar || item.avatar || null

                    const clipsCount = item.clips ?? 0
                    const acesCount = item.aces ?? 0
                    const clutchesCount = item.clutches ?? 0
                    const highlightsCount = item.highlights ?? 0

                    return (
                      <div
                        key={item.id || item._id || index}
                        onClick={() => handleRowClick(item)}
                        className="p-4 transition active:bg-white/[0.02]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono text-xs font-bold ${
                                index === 0 ? "text-[#FF4655]" : "text-gray-500"
                              }`}
                            >
                              {position}
                            </span>
                            <div className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.02]">
                              {avatar ? (
                                <img
                                  src={avatar}
                                  alt={username}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User size={14} className="text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase text-white">
                                {username}
                                {tagline && (
                                  <span className="ml-1 text-[10px] font-mono text-gray-500">
                                    #{tagline}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-600" />
                        </div>

                        <div className="mt-3 grid grid-cols-4 gap-2 border-t border-white/[0.04] pt-2.5 text-center">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-gray-500">CLIPS</p>
                            <p className="font-mono text-xs font-bold text-white">{clipsCount}</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-gray-500">ACES</p>
                            <p className="font-mono text-xs font-bold text-gray-300">
                              {acesCount}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-gray-500">CLUTCHES</p>
                            <p className="font-mono text-xs font-bold text-gray-300">
                              {clutchesCount}
                            </p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold uppercase text-gray-500">
                              HIGHLIGHTS
                            </p>
                            <p className="font-mono text-xs font-bold text-gray-300">
                              {highlightsCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* SUBTLE INFORMATIONAL DISCLAIMER */}
        <footer className="mt-8 border-t border-white/[0.06] pt-4">
          <div className="flex items-start gap-2 text-gray-500">
            <Info size={14} className="mt-0.5 shrink-0 text-gray-600" />
            <p className="text-[11px] leading-relaxed">
              These statistics describe clips and memorable gameplay moments shared within the
              community. They are not an official VALORANT ranking, MMR, ELO, or skill rating.
            </p>
          </div>
        </footer>
      </div>

      {/* VIDEO PREVIEW MODAL */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl border border-white/[0.1] bg-[#0D0E11] p-2">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-2 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4655]">
                COMMUNITY CLIP PREVIEW
              </span>
              <button
                type="button"
                onClick={() => setSelectedVideoUrl(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative mt-2 aspect-video w-full bg-black">
              <video src={selectedVideoUrl} controls autoPlay className="h-full w-full">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}