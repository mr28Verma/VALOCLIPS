import { useMemo } from "react"
import {
  Trophy,
  Flame,
  Target,
  Shield,
  Brain,
  Sparkles,
} from "lucide-react"

/* =========================================================
   YOUR 5 FRIENDS
   ---------------------------------------------------------
   These are community clip statistics only.
   They are NOT used to calculate rank, MMR, ELO,
   or any official VALORANT skill rating.
========================================================= */

const friends = [
  {
    name: "ZALZALA",
    tag: "4444",
    image: "/friends/ZALZALA.png",
    agent: "SOVA",
    rank: "BRONZE 2",

    plays: {
      Highlight: 10,
      "2K": 4,
      "3K": 3,
      "4K": 2,
      "1v2 Clutch": 2,
      "1v3 Clutch": 1,
      "1v4 Clutch": 1,
      "1v5 Clutch": 0,
      Ace: 2,
      "Insane Shot": 3,
      "Big Brain": 2,
    },
  },

  {
    name: "Mogambo",
    tag: "haha",
    image: "/friends/Mogambo.png",
    agent: "JETT",
    rank: "SILVER 2",

    plays: {
      Highlight: 8,
      "2K": 5,
      "3K": 3,
      "4K": 2,
      "1v2 Clutch": 2,
      "1v3 Clutch": 1,
      "1v4 Clutch": 0,
      "1v5 Clutch": 0,
      Ace: 1,
      "Insane Shot": 3,
      "Big Brain": 2,
    },
  },

  {
    name: "DaRk",
    tag: "UR01",
    image: "/friends/DaRk.png",
    agent: "REYNA",
    rank: "GOLD 3",

    plays: {
      Highlight: 6,
      "2K": 4,
      "3K": 3,
      "4K": 2,
      "1v2 Clutch": 2,
      "1v3 Clutch": 1,
      "1v4 Clutch": 0,
      "1v5 Clutch": 0,
      Ace: 1,
      "Insane Shot": 2,
      "Big Brain": 2,
    },
  },

  {
    name: "PewPewPotato",
    tag: "RJV",
    image: "/friends/PewPewPotato.png",
    agent: "JETT",
    rank: "PLATINUM 1",

    plays: {
      Highlight: 5,
      "2K": 4,
      "3K": 2,
      "4K": 2,
      "1v2 Clutch": 2,
      "1v3 Clutch": 1,
      "1v4 Clutch": 0,
      "1v5 Clutch": 0,
      Ace: 1,
      "Insane Shot": 2,
      "Big Brain": 1,
    },
  },

  {
    name: "PaNKhRr",
    tag: "001B",
    image: "/friends/PaNKhRr.png",
    agent: "CLOVE",
    rank: "SILVER 3",

    plays: {
      Highlight: 5,
      "2K": 3,
      "3K": 2,
      "4K": 1,
      "1v2 Clutch": 2,
      "1v3 Clutch": 1,
      "1v4 Clutch": 0,
      "1v5 Clutch": 0,
      Ace: 1,
      "Insane Shot": 2,
      "Big Brain": 1,
    },
  },
]

/* =========================================================
   PREPARE COMMUNITY STATS
========================================================= */

function preparePlayers() {
  return friends.map((player) => {
    const totalHighlights = Object.values(player.plays).reduce(
      (total, count) => total + count,
      0
    )

    const aces = player.plays.Ace || 0
    const clutches =
      (player.plays["1v2 Clutch"] || 0) +
      (player.plays["1v3 Clutch"] || 0) +
      (player.plays["1v4 Clutch"] || 0) +
      (player.plays["1v5 Clutch"] || 0)

    const multikills =
      (player.plays["2K"] || 0) +
      (player.plays["3K"] || 0) +
      (player.plays["4K"] || 0)

    return {
      ...player,
      totalHighlights,
      aces,
      clutches,
      multikills,
    }
  })
}

/* =========================================================
   MAIN
========================================================= */

function Leaderboards() {
  const players = useMemo(
    () => preparePlayers(),
    []
  )

  return (
    <main className="min-h-screen bg-[#08090B] text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-white/[0.06]">

        <div className="mx-auto max-w-[1400px] px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">

            <div>

              <div className="flex items-center gap-2 sm:gap-3">

                <span className="h-px w-8 bg-[#FF4655]" />

                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4655]">
                  Squad Highlights
                </span>

              </div>

              <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-[-0.05em] sm:mt-4 sm:text-6xl">

                Best
                <span className="text-[#FF4655]">
                  {" "}moments.
                </span>

              </h1>

              <p className="mt-4 max-w-xl text-xs leading-5 text-[#70737B] sm:mt-5 sm:text-sm sm:leading-6">

                A private space to celebrate the best
                gameplay moments from the squad.

              </p>

            </div>

            {/* FRIEND COUNT */}

            <div className="self-start text-left sm:self-auto sm:text-right">

              <p className="font-display text-3xl font-bold text-white">
                05
              </p>

              <p className="mt-1 font-display text-[8px] font-bold uppercase tracking-[0.18em] text-[#555960]">
                FRIENDS
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COMMUNITY NOTICE
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">

        <div className="border border-white/[0.06] bg-[#0B0D10] px-4 py-4 sm:px-5">

          <div className="flex gap-3">

            <Sparkles
              size={15}
              className="mt-0.5 shrink-0 text-[#FF4655]"
            />

            <div>

              <p className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-[#A0A3AA]">
                Community highlights
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#666970] sm:text-xs">

                These statistics describe clips and memorable
                gameplay moments shared within the community.
                They are not an official VALORANT ranking,
                MMR, ELO, or skill rating.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURED PLAYERS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">

        <div className="mb-5">

          <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-[#555960]">
            COMMUNITY MOMENTS
          </p>

          <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-[-0.02em]">
            Featured players
          </h2>

        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">

          {players.slice(0, 3).map((player, index) => (

            <PlayerCard
              key={player.name}
              player={player}
              featured
              position={index}
            />

          ))}

        </div>

      </section>

      {/* =====================================================
          OTHER PLAYERS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-10">

        <div className="mb-5">

          <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-[#555960]">
            THE REST OF THE SQUAD
          </p>

        </div>

        <div className="overflow-hidden border border-white/[0.06] bg-[#0B0D10]">

          {players.slice(3).map((player, index) => (

            <PlayerRow
              key={player.name}
              player={player}
              position={index + 4}
            />

          ))}

        </div>

      </section>

      {/* =====================================================
          MOMENT TYPES
      ====================================================== */}

      <section className="border-t border-white/[0.06] bg-[#0A0B0E]">

        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* TITLE */}

            <div className="max-w-sm">

              <div className="flex items-center gap-2 sm:gap-3">

                <span className="h-px w-7 bg-[#FF4655]" />

                <span className="font-display text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF4655]">
                  Clip categories
                </span>

              </div>

              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-[-0.04em] sm:text-4xl">

                Play.
                <br />
                Capture.
                <br />

                <span className="text-[#FF4655]">
                  Remember.
                </span>

              </h2>

              <p className="mt-4 text-xs leading-5 text-[#666970] sm:mt-5">

                Clips can be categorized by the type of
                gameplay moment they contain.

              </p>

            </div>

            {/* CATEGORIES */}

            <div className="grid w-full max-w-[760px] grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2">

              <MomentItem
                icon={<Target size={14} />}
                name="ACE"
              />

              <MomentItem
                icon={<Flame size={14} />}
                name="1V5 CLUTCH"
              />

              <MomentItem
                icon={<Flame size={14} />}
                name="1V4 CLUTCH"
              />

              <MomentItem
                icon={<Shield size={14} />}
                name="1V3 CLUTCH"
              />

              <MomentItem
                icon={<Target size={14} />}
                name="4K"
              />

              <MomentItem
                icon={<Shield size={14} />}
                name="1V2 CLUTCH"
              />

              <MomentItem
                icon={<Target size={14} />}
                name="3K"
              />

              <MomentItem
                icon={<Brain size={14} />}
                name="BIG BRAIN"
              />

              <MomentItem
                icon={<Target size={14} />}
                name="INSANE SHOT"
              />

              <MomentItem
                icon={<Target size={14} />}
                name="2K"
              />

              <MomentItem
                icon={<Flame size={14} />}
                name="HIGHLIGHT"
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

/* =========================================================
   FEATURED PLAYER CARD
========================================================= */

function PlayerCard({
  player,
  position,
}) {

  const isFirst = position === 0

  return (

    <div
      className={`group relative overflow-hidden border bg-[#0D0F12] ${
        isFirst
          ? "border-[#FF4655]/50"
          : "border-white/[0.06]"
      }`}
    >

      {/* IMAGE */}

      <div className="relative h-[300px] overflow-hidden min-[380px]:h-[330px] sm:h-[350px]">

        <img
          src={player.image}
          alt={player.name}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-black/10 to-transparent" />

        {/* FEATURE MARKER */}

        <div
          className={`absolute left-5 top-5 flex h-11 w-11 items-center justify-center ${
            isFirst
              ? "bg-[#FF4655]"
              : "border border-white/[0.1] bg-black/60"
          }`}
        >

          {isFirst ? (

            <Trophy
              size={17}
              className="text-white"
            />

          ) : (

            <span className="font-display text-sm font-bold">
              {String(position + 1).padStart(2, "0")}
            </span>

          )}

        </div>

        {/* AGENT */}

        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">

          <p className="font-display text-[9px] font-bold uppercase tracking-[0.16em] text-[#FF4655]">
            {player.agent}
          </p>

        </div>

      </div>

      {/* DETAILS */}

      <div className="p-4 sm:p-6">

        <div className="flex flex-col gap-3 min-[380px]:flex-row min-[380px]:items-start min-[380px]:justify-between sm:gap-4">

          <div>

            <h3 className="font-display text-lg font-bold sm:text-xl">

              {player.name}

              <span className="ml-1 text-[#555960]">
                #{player.tag}
              </span>

            </h3>

          </div>

          <span className="self-start border border-white/[0.07] bg-[#111317] px-2.5 py-1.5 font-display text-[7px] font-bold uppercase tracking-[0.08em] text-[#777A82] sm:px-3 sm:text-[8px]">
            {player.rank}
          </span>

        </div>

        <div className="my-4 h-px bg-white/[0.06] sm:my-5" />

        {/* HIGHLIGHT STATS */}

        <div className="grid grid-cols-3 gap-2">

          <Stat
            value={player.totalHighlights}
            label="MOMENTS"
          />

          <Stat
            value={player.aces}
            label="ACES"
          />

          <Stat
            value={player.clutches}
            label="CLUTCHES"
          />

        </div>

      </div>

    </div>
  )
}

/* =========================================================
   PLAYER ROW
========================================================= */

function PlayerRow({
  player,
  position,
}) {

  return (

    <div className="group flex items-center gap-2.5 border-b border-white/[0.06] px-3 py-4 transition last:border-b-0 hover:bg-white/[0.025] sm:gap-4 sm:px-5 sm:py-5">

      {/* POSITION */}

      <div className="flex w-6 shrink-0 justify-center sm:w-8">

        <span className="font-display text-xs font-bold text-[#555960] sm:text-sm">
          {String(position).padStart(2, "0")}
        </span>

      </div>

      {/* PLAYER */}

      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">

        <div className="h-10 w-10 shrink-0 overflow-hidden border border-white/[0.08] bg-[#111317] sm:h-12 sm:w-12">

          <img
            src={player.image}
            alt={player.name}
            className="h-full w-full object-cover"
          />

        </div>

        <div className="min-w-0">

          <p className="truncate font-display text-sm font-bold text-white">

            {player.name}

            <span className="ml-1 text-[#555960]">
              #{player.tag}
            </span>

          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:mt-1.5 sm:gap-2">

            <span className="font-display text-[8px] font-bold uppercase tracking-[0.12em] text-[#FF4655]">
              {player.agent}
            </span>

            <span className="text-[#33363B]">
              •
            </span>

            <span className="font-display text-[8px] font-bold uppercase tracking-[0.1em] text-[#666970]">
              {player.rank}
            </span>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="hidden gap-6 sm:flex">

        <SmallStat
          value={player.totalHighlights}
          label="MOMENTS"
        />

        <SmallStat
          value={player.aces}
          label="ACES"
        />

        <SmallStat
          value={player.clutches}
          label="CLUTCHES"
        />

      </div>

    </div>
  )
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
}) {

  return (

    <div className="text-center">

      <p className="font-display text-xl font-bold text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 font-display text-[7px] font-bold uppercase tracking-[0.12em] text-[#555960]">
        {label}
      </p>

    </div>
  )
}

/* =========================================================
   SMALL STAT
========================================================= */

function SmallStat({
  value,
  label,
}) {

  return (

    <div className="w-16">

      <p className="font-display text-xs font-bold text-white sm:text-sm">
        {value}
      </p>

      <p className="mt-1 font-display text-[7px] font-bold uppercase tracking-[0.12em] text-[#555960]">
        {label}
      </p>

    </div>
  )
}

/* =========================================================
   MOMENT ITEM
========================================================= */

function MomentItem({
  icon,
  name,
}) {

  return (

    <div className="flex items-center gap-2 border border-white/[0.06] bg-[#0D0F12] px-3 py-3 sm:gap-3 sm:px-4">

      <div className="text-[#FF4655]">
        {icon}
      </div>

      <span className="font-display text-[8px] font-bold uppercase tracking-[0.06em] text-[#777A82] sm:text-[9px] sm:tracking-[0.08em]">
        {name}
      </span>

    </div>
  )
}

export default Leaderboards