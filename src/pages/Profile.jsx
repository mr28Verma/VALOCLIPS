import { useEffect, useMemo, useRef, useState } from "react"
import {
  Plus,
  Upload,
  X,
  Play,
  MoreHorizontal,
  Share2,
  Settings,
  Users,
  Flame,
  Clock3,
  Star,
  Sparkles,
  Shuffle,
  Crosshair,
  XCircle,
  Loader2,
  AlertCircle,
  Trophy,
  Target,
  Swords,
  Activity,
  MapPin,
  Shield,
  Zap,
  Copy,
} from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || ""

const filters = ["All", "Highlights", "Aces", "Clutches"]

function formatTime(date) {
  if (!date) return ""

  const value = new Date(date)

  if (Number.isNaN(value.getTime())) {
    return ""
  }

  const now = new Date()
  const diff = now.getTime() - value.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 7) return `${days} days ago`

  return value.toLocaleDateString()
}

function formatNumber(value) {
  if (value === undefined || value === null) {
    return "0"
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return "0"
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`
  }

  return number.toString()
}

function RankIcon({ rank, className = "" }) {
  if (!rank) return null

  const icon =
    rank.icon ||
    rank.image ||
    rank.displayIcon ||
    rank.rankIcon

  if (!icon) return null

  return (
    <img
      src={icon}
      alt={rank.name || rank}
      className={className}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display = "none"
      }}
    />
  )
}

function Profile() {
  const [profile, setProfile] = useState(null)
  const [clips, setClips] = useState([])
  const [squad, setSquad] = useState([])
  const [stats, setStats] = useState(null)

  const [agents, setAgents] = useState([])
  const [maps, setMaps] = useState([])

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedClip, setSelectedClip] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [editProfileError, setEditProfileError] = useState("")
  const [editProfileSuccess, setEditProfileSuccess] = useState("")
  const [editForm, setEditForm] = useState({
    agent: "",
    map: "",
  })
  const dropdownRef = useRef(null)

  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState("")

  const [videoFile, setVideoFile] = useState(null)

  const [form, setForm] = useState({
    title: "",
    map: "",
    agent: "",
    type: "",
  })

  /*
   * Close profile actions menu on outside click or Escape.
   */
  useEffect(() => {
    if (!showActionsDropdown) return

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionsDropdown(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowActionsDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [showActionsDropdown])

  /*
   * =========================================================
   * LOAD PROFILE DATA FROM BACKEND
   * =========================================================
   */

  const loadProfile = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem("token")
      const headers = {
        "Content-Type": "application/json",
      }
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/profile/me`, {
        credentials: "include",
        headers,
      })

      if (!response.ok) {
        throw new Error("Failed to load profile")
      }

      const data = await response.json()

      setProfile(data.profile || null)
      setClips(data.clips || [])
      setSquad(data.squad || [])
      setStats(data.stats || null)

      if (data.agents) {
        setAgents(data.agents)
      }

      if (data.maps) {
        setMaps(data.maps)
      }
    } catch (error) {
      console.error("Profile loading error:", error)
    } finally {
      setLoading(false)
    }
  }

  /*
   * =========================================================
   * LOAD CLIPS
   * =========================================================
   */

  const loadClips = async () => {
    try {
      const token = localStorage.getItem("token")
      const headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/clips`, {
        credentials: "include",
        headers,
      })

      if (!response.ok) {
        throw new Error("Failed to load clips")
      }

      const data = await response.json()

      setClips(Array.isArray(data) ? data : data.clips || [])
    } catch (error) {
      console.error("Clips loading error:", error)
    }
  }

  /*
   * =========================================================
   * LOAD VALORANT AGENTS (Riot API)
   * =========================================================
   */

  const loadAgents = async () => {
    try {
      const response = await fetch(
        "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=en-US"
      )

      if (!response.ok) {
        throw new Error("Failed to load agents")
      }

      const data = await response.json()

      setAgents(
        (data.data || [])
          .filter((agent) => agent.isPlayableCharacter)
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
      )
    } catch (error) {
      console.error("Agents loading error:", error)
    }
  }

  /*
   * =========================================================
   * LOAD VALORANT MAPS (Riot API)
   * =========================================================
   */

  const loadMaps = async () => {
    try {
      const response = await fetch(
        "https://valorant-api.com/v1/maps?language=en-US"
      )

      if (!response.ok) {
        throw new Error("Failed to load maps")
      }

      const data = await response.json()

      setMaps(
        (data.data || [])
          .filter((map) => map.displayName)
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
      )
    } catch (error) {
      console.error("Maps loading error:", error)
    }
  }

  useEffect(() => {
    loadProfile()
    loadAgents()
    loadMaps()
  }, [])

  /*
   * =========================================================
   * FILTER CLIPS
   * =========================================================
   */

  const filteredClips = useMemo(() => {
    if (activeFilter === "All") {
      return clips
    }

    const type =
      activeFilter === "Highlights"
        ? "Highlight"
        : activeFilter === "Aces"
        ? "Ace"
        : "Clutch"

    return clips.filter(
      (clip) =>
        String(clip.type || "").toLowerCase() === type.toLowerCase()
    )
  }, [clips, activeFilter])

  /*
   * =========================================================
   * UPLOAD CLIP HANDLER
   * =========================================================
   */

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      setVideoFile(null)
      return
    }

    if (!file.type.startsWith("video/")) {
      setUploadError("Please select a valid video file.")
      return
    }

    const maxSize = 500 * 1024 * 1024

    if (file.size > maxSize) {
      setUploadError("Video must be smaller than 500MB.")
      return
    }

    setUploadError("")
    setVideoFile(file)
  }

  const handleUpload = async (event) => {
    event.preventDefault()

    setUploadError("")
    setUploadSuccess("")

    if (!videoFile) {
      setUploadError("Please select a video.")
      return
    }

    if (!form.title.trim()) {
      setUploadError("Please enter a clip title.")
      return
    }

    if (!form.map) {
      setUploadError("Please choose a map.")
      return
    }

    if (!form.agent) {
      setUploadError("Please choose an agent.")
      return
    }

    if (!form.type) {
      setUploadError("Please choose a clip type.")
      return
    }

    try {
      setUploading(true)

      const formData = new FormData()

      formData.append("video", videoFile)
      formData.append("title", form.title.trim())
      formData.append("map", form.map)
      formData.append("agent", form.agent)
      formData.append("type", form.type)

      const token = localStorage.getItem("token")
      const headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/clips/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.")
      }

      setUploadSuccess(data.message || "Clip uploaded successfully.")

      setForm({
        title: "",
        map: "",
        agent: "",
        type: "",
      })

      setVideoFile(null)

      const input = document.getElementById("clip-upload")
      if (input) {
        input.value = ""
      }

      await loadClips()
      await loadProfile()

      setTimeout(() => {
        setShowUpload(false)
        setUploadSuccess("")
      }, 1200)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error.message || "Something went wrong.")
    } finally {
      setUploading(false)
    }
  }

  /*
   * =========================================================
   * DERIVED PROFILE VALUES
   * =========================================================
   */

  const username = profile?.username || profile?.gameName || profile?.name || ""
  const tagline = profile?.tagline || profile?.tag || ""
  const handle = profile?.handle || profile?.displayName || profile?.riotId || ""
  const playerCard = profile?.playerCard || "/player-card.png"
  const currentRank = profile?.rank || null
  const mainAgent = profile?.mainAgent || profile?.agent || null
  const favoriteMap = profile?.favoriteMap || profile?.favMap || null
  const recentMatches = profile?.recentMatches || stats?.recentMatches || []
  const playstyle = profile?.playstyle || stats?.playstyle || null

  const playerStats = {
    clips: stats?.clips ?? stats?.totalClips ?? clips.length,
    acesAndClutches:
      stats?.acesAndClutches ??
      stats?.acesClutches ??
      clips.filter((clip) => clip.type === "Ace" || clip.type === "Clutch")
        .length,
    bestStreak: stats?.bestStreak ?? stats?.streak ?? 0,
    squad: stats?.squad ?? stats?.squadCount ?? squad.length,
  }

  const onlineCount = squad.filter((player) => player.online === true).length

  const getAgentName = (agent) => {
    if (!agent) return ""
    if (typeof agent === "string") return agent
    return agent.displayName || agent.name || ""
  }

  const getMapName = (map) => {
    if (!map) return ""
    if (typeof map === "string") return map
    return map.displayName || map.name || ""
  }

  const openEditProfile = () => {
    setEditForm({
      agent: getAgentName(mainAgent),
      map: getMapName(favoriteMap),
    })
    setEditProfileError("")
    setEditProfileSuccess("")
    setShowActionsDropdown(false)
    setShowEditProfile(true)
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault()
    setEditProfileError("")
    setEditProfileSuccess("")

    try {
      setSavingProfile(true)

      const token = localStorage.getItem("token")
      const headers = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/profile/me`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({
          mainAgent: editForm.agent || null,
          favoriteMap: editForm.map || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.")
      }

      setEditProfileSuccess(data.message || "Profile updated successfully.")
      await loadProfile()

      setTimeout(() => {
        setShowEditProfile(false)
        setEditProfileSuccess("")
      }, 900)
    } catch (error) {
      console.error("Profile update error:", error)
      setEditProfileError(error.message || "Something went wrong.")
    } finally {
      setSavingProfile(false)
    }
  }

  useEffect(() => {
    if (!showEditProfile) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !savingProfile) {
        setShowEditProfile(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showEditProfile, savingProfile])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090B] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Loading profile
            </span>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      {/* PROFILE HERO */}
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

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowActionsDropdown((prev) => !prev)}
                aria-expanded={showActionsDropdown}
                aria-haspopup="menu"
                className="flex h-9 items-center gap-2 border border-white/[0.08] bg-white/[0.025] px-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 transition hover:border-[#FF4655]/40 hover:bg-[#FF4655]/[0.05] hover:text-[#FF4655]"
              >
                <MoreHorizontal size={15} />
                <span>Actions</span>
              </button>

              {showActionsDropdown && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-40 mt-2 w-48 border border-white/[0.1] bg-[#0D0E11] py-1 shadow-2xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={async () => {
                      setShowActionsDropdown(false)
                      try {
                        await navigator.clipboard.writeText(window.location.href)
                      } catch (error) {
                        console.error("Copy profile link failed:", error)
                      }
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-300 transition hover:bg-[#FF4655]/10 hover:text-[#FF4655]"
                  >
                    <Copy size={14} />
                    <span>Copy Profile Link</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[350px_minmax(0,1fr)] xl:gap-12">
            {/* Left Side: Player Card */}
            <div className="relative flex items-start justify-center lg:justify-start">
              <div className="absolute -inset-10 bg-[#FF4655]/[0.025] blur-3xl" />
              <div className="relative flex aspect-[280/620] h-[min(62vh,430px)] max-h-[430px] min-h-[320px] w-auto items-start justify-center sm:h-[min(68vh,520px)] sm:max-h-[520px] sm:min-h-[340px] lg:h-[min(72vh,560px)] lg:max-h-[560px] lg:min-h-[360px] xl:h-[min(72vh,620px)] xl:max-h-[620px] xl:min-h-[380px]">
                <div className="absolute left-1/2 top-2 h-1 w-20 -translate-x-1/2 bg-[#FF4655]" />
                <img
                  src={playerCard}
                  alt="VALORANT player card"
                  className="relative z-10 h-full w-full object-contain object-top"
                  onError={(event) => {
                    event.currentTarget.src = "/player-card.png"
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-[#08090B] to-transparent" />

                {currentRank && (
                  <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap border border-white/[0.08] bg-[#0D0E11]/90 px-3 py-1.5 backdrop-blur">
                    <RankIcon
                      rank={currentRank}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">
                      {currentRank.name || currentRank.tier || currentRank}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Profile Info & Overview Panel */}
            <div className="flex min-w-0 flex-col justify-start pt-0 lg:pt-1">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  {profile?.riotConnected !== false && (
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4ADE80]">
                        RIOT CONNECTED
                      </span>
                    </div>
                  )}

                  <h1 className="mt-3 text-3xl font-black leading-none tracking-[-0.045em] sm:text-6xl">
                    {username || "Player"}
                    {tagline && (
                      <span className="ml-1.5 text-gray-600 sm:ml-2">
                        #{tagline}
                      </span>
                    )}
                  </h1>

                  {handle && (
                    <p className="mt-2 text-sm text-gray-500">@{handle}</p>
                  )}
                </div>

                <div className="flex w-full flex-wrap gap-2 lg:w-auto">
                  <button
                    type="button"
                    onClick={() => setShowUpload(true)}
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 border border-[#FF4655] bg-[#FF4655] px-3 py-2.5 text-[11px] font-bold uppercase text-white transition hover:bg-[#E03E4D] sm:flex-none sm:px-4"
                  >
                    <Plus size={14} />
                    Upload Clip
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (navigator.share) {
                          await navigator.share({
                            title: `${username || "Player"}'s Profile`,
                            url: window.location.href,
                          })
                        } else {
                          await navigator.clipboard.writeText(window.location.href)
                        }
                      } catch (error) {
                        if (error?.name !== "AbortError") {
                          console.error("Share failed:", error)
                        }
                      }
                    }}
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-[11px] font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-white sm:flex-none sm:px-4"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={openEditProfile}
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-[11px] font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-white sm:flex-none sm:px-4"
                  >
                    <Settings size={14} />
                    Edit
                  </button>
                </div>
              </div>

              {/* PLAYER RECORD */}
              <div className="mt-6 grid w-full max-w-[760px] grid-cols-2 border-y border-white/[0.06] sm:grid-cols-4">
                {/* Current Rank */}
                <div className="border-b border-white/[0.06] px-3 py-4 sm:border-b-0 sm:border-r sm:px-5">
                  <div className="flex min-w-0 items-center gap-2">
                    {currentRank ? (
                      <>
                        <RankIcon
                          rank={currentRank}
                          className="h-7 w-7 shrink-0 object-contain"
                        />
                        <p className="truncate text-sm font-bold text-white">
                          {currentRank.name || currentRank.tier || currentRank}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-gray-600">
                        Not specified
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Current Rank
                  </p>
                </div>

                {/* Main Agent */}
                <div className="border-b border-white/[0.06] px-3 py-4 sm:border-b-0 sm:border-r sm:px-5">
                  <div className="flex min-w-0 items-center gap-2">
                    {mainAgent ? (
                      <>
                        {(mainAgent.image || mainAgent.displayIcon) && (
                          <img
                            src={mainAgent.image || mainAgent.displayIcon}
                            alt={mainAgent.name || mainAgent.displayName || mainAgent}
                            className="h-7 w-7 shrink-0 object-contain"
                          />
                        )}
                        <p className="truncate text-sm font-bold text-white">
                          {mainAgent.name || mainAgent.displayName || mainAgent}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-gray-600">
                        Not specified
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Main Agent
                  </p>
                </div>

                {/* Favorite Map */}
                <div className="border-b border-white/[0.06] px-3 py-4 sm:border-b-0 sm:border-r sm:px-5">
                  <div className="flex min-w-0 items-center gap-2">
                    {favoriteMap ? (
                      <>
                        <MapPin size={17} className="shrink-0 text-[#FF4655]" />
                        <p className="truncate text-sm font-bold text-white">
                          {favoriteMap.name || favoriteMap.displayName || favoriteMap}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-gray-600">
                        Not specified
                      </p>
                    )}
                  </div>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Favorite Map
                  </p>
                </div>

                {/* Clip Count */}
                <div className="px-3 py-4 sm:px-5">
                  <p className="text-xl font-bold">
                    {formatNumber(clips.length)}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                    Clips
                  </p>
                </div>
              </div>

              {/* Your Squad */}
              <div className="mt-6">
                <div className="mb-3 flex flex-col gap-2 border-b border-white/[0.06] pb-3 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#FF4655]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                        Your Squad
                      </span>
                    </div>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-gray-600">
                      Players in your squad
                    </p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-600">
                    {squad.length} {squad.length === 1 ? "Member" : "Members"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                  {/* Current Player */}
                  <div className="group relative min-w-0 overflow-hidden border border-[#FF4655]/30 bg-[#0D0E11] transition hover:border-[#FF4655]/60">
                    <div className="relative h-28 overflow-hidden bg-white/[0.02] min-[420px]:h-24">
                      {profile?.avatar ||
                      profile?.image ||
                      profile?.profileIcon ? (
                        <img
                          src={
                            profile.avatar ||
                            profile.image ||
                            profile.profileIcon
                          }
                          alt={username}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Users size={28} className="text-gray-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-transparent" />
                      <div className="absolute left-2 top-2 flex items-center gap-1.5 border border-[#4ADE80]/20 bg-black/60 px-1.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#4ADE80]">
                          You
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="truncate text-xs font-extrabold uppercase tracking-wide text-white">
                        {username || "Player"}
                        {tagline && (
                          <span className="ml-1 font-medium text-gray-600">
                            #{tagline}
                          </span>
                        )}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          {currentRank ? (
                            <>
                              <RankIcon
                                rank={currentRank}
                                className="h-5 w-5 shrink-0 object-contain"
                              />
                              <span className="truncate text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                                {currentRank.name ||
                                  currentRank.tier ||
                                  currentRank}
                              </span>
                            </>
                          ) : (
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-600">
                              Unranked
                            </span>
                          )}
                        </div>

                        <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-[#FF4655]">
                          Owner
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Squad Members */}
                  {squad.map((member, index) => {
                    const memberName =
                      member.username ||
                      member.gameName ||
                      member.name ||
                      member.riotId ||
                      ""

                    const memberTag =
                      member.tagline || member.tag || ""

                    const memberImage =
                      member.image ||
                      member.avatar ||
                      member.profileIcon ||
                      ""

                    const memberRank = member.rank || null
                    const memberAgent = member.agent || null

                    return (
                      <div
                        key={member._id || member.id || member.uuid || index}
                        className="group relative min-w-0 overflow-hidden border border-white/[0.06] bg-[#0D0E11] transition hover:border-white/[0.15]"
                      >
                        <div className="relative h-28 overflow-hidden bg-white/[0.02] min-[420px]:h-24">
                          {memberImage ? (
                            <img
                              src={memberImage}
                              alt={memberName}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Users size={28} className="text-gray-700" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-transparent" />

                          <div className="absolute left-2 top-2 flex items-center gap-1.5">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                member.online === true
                                  ? "bg-[#4ADE80] shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                                  : "bg-gray-600"
                              }`}
                            />
                            <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                              {member.online === true ? "Online" : "Offline"}
                            </span>
                          </div>
                        </div>

                        <div className="p-3">
                          <p className="truncate text-xs font-extrabold uppercase tracking-wide text-white">
                            {memberName || "Player"}
                            {memberTag && (
                              <span className="ml-1 font-medium text-gray-600">
                                #{memberTag}
                              </span>
                            )}
                          </p>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-1.5">
                              {memberRank ? (
                                <>
                                  <RankIcon
                                    rank={memberRank}
                                    className="h-5 w-5 shrink-0 object-contain"
                                  />
                                  <span className="truncate text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                                    {memberRank.name ||
                                      memberRank.tier ||
                                      memberRank}
                                  </span>
                                </>
                              ) : (
                                <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-600">
                                  Unranked
                                </span>
                              )}
                            </div>

                            {memberAgent &&
                              (memberAgent.image ||
                                memberAgent.displayIcon) && (
                                <img
                                  src={
                                    memberAgent.image ||
                                    memberAgent.displayIcon
                                  }
                                  alt={
                                    memberAgent.name ||
                                    memberAgent.displayName ||
                                    "Agent"
                                  }
                                  className="h-5 w-5 shrink-0 object-contain opacity-70"
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Add Member */}
                  <button
                    type="button"
                    className="group flex min-h-[156px] w-full min-w-0 flex-col items-center justify-center border border-dashed border-white/[0.1] bg-white/[0.01] transition hover:border-[#FF4655]/50 hover:bg-[#FF4655]/[0.03]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center border border-white/[0.08] bg-white/[0.025] text-gray-500 transition group-hover:border-[#FF4655]/40 group-hover:text-[#FF4655]">
                      <Plus size={16} />
                    </span>
                    <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500 transition group-hover:text-gray-300">
                      Add Member
                    </span>
                  </button>
                </div>

                {squad.length === 0 && (
                  <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-gray-700">
                    No squad members yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDIT PROFILE MODAL */}
      {showEditProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !savingProfile) {
              setShowEditProfile(false)
            }
          }}
        >
          <div className="w-full max-w-lg border border-white/[0.08] bg-[#0D0E11] p-5 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Edit Profile
                </h2>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-gray-600">
                  Update your player preferences
                </p>
              </div>
              <button
                type="button"
                disabled={savingProfile}
                onClick={() => setShowEditProfile(false)}
                className="text-gray-500 transition hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-5">
              {editProfileError && (
                <div className="border border-[#FF4655]/20 bg-[#FF4655]/10 p-3 text-xs text-[#FF4655]">
                  {editProfileError}
                </div>
              )}

              {editProfileSuccess && (
                <div className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 p-3 text-xs text-[#4ADE80]">
                  {editProfileSuccess}
                </div>
              )}

              {/* Current Rank */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Current Rank
                  </label>
                  <span className="text-[8px] uppercase tracking-wider text-gray-700">
                    Riot data
                  </span>
                </div>

                <div className="flex min-h-12 items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-3">
                  {currentRank ? (
                    <>
                      <RankIcon
                        rank={currentRank}
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                      <span className="text-xs font-bold text-white">
                        {currentRank.name || currentRank.tier || currentRank}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-gray-600">
                      Not specified
                    </span>
                  )}
                </div>
              </div>

              {/* Main Agent */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Main Agent
                </label>
                <select
                  value={editForm.agent}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      agent: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-white/[0.08] bg-[#0D0E11] px-3 py-3 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                >
                  <option value="">Not specified</option>
                  {agents.map((agent) => (
                    <option key={agent.uuid} value={agent.displayName}>
                      {agent.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favorite Map */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Favorite Map
                </label>
                <select
                  value={editForm.map}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      map: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-white/[0.08] bg-[#0D0E11] px-3 py-3 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                >
                  <option value="">Not specified</option>
                  {maps.map((map) => (
                    <option key={map.uuid} value={map.displayName}>
                      {map.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={savingProfile}
                  onClick={() => setShowEditProfile(false)}
                  className="border border-white/[0.08] px-4 py-2.5 text-xs font-semibold text-gray-400 transition hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex items-center justify-center gap-2 border border-[#FF4655] bg-[#FF4655] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#E03E4D] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingProfile && <Loader2 size={14} className="animate-spin" />}
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-white/[0.08] bg-[#0D0E11] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Upload VALORANT Clip
              </h2>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="mt-4 space-y-4">
              {uploadError && (
                <div className="flex items-center gap-2 bg-[#FF4655]/10 border border-[#FF4655]/20 p-3 text-xs text-[#FF4655]">
                  <AlertCircle size={14} />
                  <span>{uploadError}</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="bg-[#4ADE80]/10 border border-[#4ADE80]/20 p-3 text-xs text-[#4ADE80]">
                  {uploadSuccess}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Clip Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Insane 1v4 Ace Clutch"
                  className="mt-1 w-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Map
                  </label>
                  <select
                    value={form.map}
                    onChange={(e) => setForm({ ...form, map: e.target.value })}
                    className="mt-1 w-full border border-white/[0.08] bg-[#0D0E11] px-3 py-2 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                  >
                    <option value="">Select Map</option>
                    {maps.map((m) => (
                      <option key={m.uuid} value={m.displayName}>
                        {m.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Agent
                  </label>
                  <select
                    value={form.agent}
                    onChange={(e) =>
                      setForm({ ...form, agent: e.target.value })
                    }
                    className="mt-1 w-full border border-white/[0.08] bg-[#0D0E11] px-3 py-2 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                  >
                    <option value="">Select Agent</option>
                    {agents.map((a) => (
                      <option key={a.uuid} value={a.displayName}>
                        {a.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-1 w-full border border-white/[0.08] bg-[#0D0E11] px-3 py-2 text-xs text-white focus:border-[#FF4655] focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="Highlight">Highlight</option>
                  <option value="Ace">Ace</option>
                  <option value="Clutch">Clutch</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Video File
                </label>
                <input
                  id="clip-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="mt-1 w-full border border-white/[0.08] bg-white/[0.02] p-2 text-xs text-gray-400"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="border border-white/[0.08] px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 border border-[#FF4655] bg-[#FF4655] px-4 py-2 text-xs font-bold text-white hover:bg-[#E03E4D] disabled:opacity-50"
                >
                  {uploading && <Loader2 size={14} className="animate-spin" />}
                  {uploading ? "Uploading..." : "Submit Clip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default Profile