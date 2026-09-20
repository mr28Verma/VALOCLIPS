import { useEffect, useState } from "react"
import {
  Play,
  ChevronRight,
  UserPlus,
  Users,
  Heart,
  MessageCircle,
  Eye,
  Upload,
  Sparkles,
  Link2,
} from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const heroImages = [
  "/hero/hero1.png",
  "/hero/hero2.png",
  "/hero/hero3.png",
  "/hero/hero4.png",
  "/hero/hero5.png",
]

const features = [
  {
    number: "01",
    title: "Connect your Riot",
    description:
      "Link your Riot account and create your personal VALORANT profile on valoClips.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Build your squad",
    description:
      "Follow your friends and players you actually care about watching.",
    icon: Users,
  },
  {
    number: "03",
    title: "Never miss a play",
    description:
      "Your feed brings your clips and your squad's best moments together.",
    icon: Sparkles,
  },
]

const previewClips = [
  {
    id: 1,
    image:
      "/clip/ace.jpg",
    title: "MY CLEANEST CLUTCH",
    player: "LOVEDAY",
    agent: "Jett",
    
  },
  {
    id: 2,
    image:
      "/clip/clutch.png",
    title: "NO WAY THAT HIT",
    player: "Mogambo",
    agent: "Sage",
    
  },
  {
    id: 3,
    image: "/clip/funny.png",
    title: "FUNNY MOMENT",
    player: "You",
    agent: "Sova",
    
  },
]

const friendAvatars = [
  {
    name: "Reyna",
    image:
      "reyna.jpg",
  },
  {
    name: "Sage",
    image:
      "sage.png",
  },
  {
    name: "Clove",
    image:
      "clove.png",
  },
]

function PreviewCard({ clip }) {
  return (
    <article className="group overflow-hidden border border-white/[0.07] bg-[#101115]">
      <div className="relative aspect-video overflow-hidden">

        <img
          src={clip.image}
          alt={clip.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        <span className="absolute bottom-3 left-3 bg-[#FF4655] px-2 py-1 text-[8px] font-bold uppercase tracking-wider sm:text-[9px]">
          {clip.agent}
        </span>

        <button
          type="button"
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF4655] text-white opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Play size={16} fill="currentColor" />
        </button>

      </div>

      <div className="p-3 sm:p-4">

        <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
          {clip.title}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3">

          <span className="truncate text-[10px] text-gray-500 sm:text-[11px]">
            {clip.player}
          </span>

          <div className="flex shrink-0 items-center gap-2 text-[9px] text-gray-600 sm:gap-3 sm:text-[10px]">

            <span className="flex items-center gap-1">
              <Eye size={11} />
              {clip.views}
            </span>

            <span className="flex items-center gap-1">
              <Heart size={11} />
              {clip.likes}
            </span>

          </div>

        </div>

      </div>
    </article>
  )
}

function Landing() {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length)
    }, 20000)

    return () => clearTimeout(timeout)
  }, [heroIndex])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0D] text-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[620px] overflow-hidden sm:min-h-[680px]">

        {/* Background */}

        <div className="absolute inset-0">

          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[2500ms] ${
                index === heroIndex
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}

        </div>

        {/* Overlays */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/95 via-[#08090B]/70 to-[#08090B]/20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(40,90,160,0.10),transparent_30%)]" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-[#0A0A0D]/20" />


        {/* Hero content */}

        <div className="relative mx-auto flex min-h-[620px] max-w-[1400px] items-center px-5 py-16 sm:min-h-[680px] sm:px-6 lg:px-10">

          <div className="w-full max-w-[690px]">

            {/* Label */}

            <div className="mb-5 flex items-center gap-3 sm:mb-7">

              <span className="h-px w-7 bg-[#FF4655] sm:w-12" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#FF4655] sm:text-[11px] sm:tracking-[0.3em]">
                THE VALORANT CLIP COMMUNITY
              </span>

            </div>


            {/* Heading */}

            <h1 className="font-display text-[44px] font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-[82px]">

              Your clips.

              <span className="block text-[#FF4655]">
                Your squad.
              </span>

              Your moments.

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-[540px] text-[13px] leading-6 text-gray-400 sm:mt-8 sm:text-base sm:leading-7">
              A home for the rounds worth remembering. Connect your Riot
              account, find your squad, and turn your VALORANT clips into
              your own personal feed.
            </p>


            {/* Buttons */}

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">

              {/* CONNECT RIOT */}

              <Link
                to="/profile"
                className="inline-flex w-full items-center justify-center gap-3 bg-[#FF4655] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e63e4c] sm:w-auto"
              >

                <Link2
                  size={18}
                  strokeWidth={2}
                />

                Connect with Riot

              </Link>


              {/* SEE HOW IT WORKS */}

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] sm:w-auto"
              >
                See how it works
                <ChevronRight size={16} />
              </button>

            </div>


            {/* Mini stats */}

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] text-gray-500 sm:mt-10 sm:gap-6 sm:text-[11px]">

              <span className="flex items-center gap-2">
                <Users
                  size={14}
                  className="text-[#FF4655]"
                />
                Your squad
              </span>

              <span className="hidden h-3 w-px bg-white/10 sm:block" />

              <span className="flex items-center gap-2">
                <Upload
                  size={14}
                  className="text-[#FF4655]"
                />
                Your uploads
              </span>

              <span className="hidden h-3 w-px bg-white/10 sm:block" />

              <span className="flex items-center gap-2">
                <Heart
                  size={14}
                  className="text-[#FF4655]"
                />
                Your favorites
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PERSONAL FEED
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-[#0D0E11]">

        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">

            {/* Text */}

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FF4655] sm:text-[10px] sm:tracking-[0.3em]">
                NOT ANOTHER CLIP FEED
              </p>

              <h2 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-[-0.02em] sm:text-4xl">

                A feed built

                <span className="block text-[#FF4655]">
                  around you.
                </span>

              </h2>

              <p className="mt-5 max-w-[470px] text-sm leading-6 text-gray-500">
                Your homepage changes once you connect. Instead of endlessly
                scrolling through random clips, see your own uploads and the
                moments your squad is sharing.
              </p>


              {/* Friends */}

              <div className="mt-7 flex items-center gap-3 text-xs text-gray-400">

                <div className="flex -space-x-2">

                  {friendAvatars.map((friend) => (
                    <img
                      key={friend.name}
                      src={friend.image}
                      alt={friend.name}
                      className="h-8 w-8 rounded-full border-2 border-[#0D0E11] object-cover"
                    />
                  ))}

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0D0E11] bg-[#FF4655] text-[9px] font-bold text-white">
                    +2
                  </div>

                </div>

                <span className="text-[11px]">
                  Built around your squad
                </span>

              </div>

            </div>


            {/* Feed preview */}

            <div className="relative">

              <div className="absolute -inset-6 bg-[#FF4655]/[0.025] blur-3xl" />

              <div className="relative border border-white/[0.07] bg-[#101115] p-3 sm:p-4">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FF4655] sm:text-[10px]">
                      YOUR FEED
                    </p>

                    <p className="mt-1 text-xs font-semibold sm:text-sm">
                      What's happening
                    </p>

                  </div>

                  <div className="flex items-center gap-1 text-[9px] text-gray-600 sm:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#49D17D]" />
                    Live
                  </div>

                </div>


                {/* Clips */}

                <div className="mt-4 grid gap-3 sm:grid-cols-3">

                  {previewClips.map((clip) => (
                    <PreviewCard
                      key={clip.id}
                      clip={clip}
                    />
                  ))}

                </div>


                {/* Footer */}

                <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-2">

                    <MessageCircle
                      size={13}
                      className="text-gray-600"
                    />

                    <span className="text-[9px] text-gray-600 sm:text-[10px]">
                      Your squad is active
                    </span>

                  </div>

                  <span className="text-[9px] text-[#FF4655] sm:text-[10px]">
                    Personalized
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="max-w-[620px]">

          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FF4655] sm:text-[10px] sm:tracking-[0.3em]">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-3xl font-bold uppercase tracking-[-0.02em] sm:text-4xl">

            One account.

            <span className="block text-[#FF4655]">
              Your entire squad.
            </span>

          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Everything starts with your Riot account. From there, valoClips
            becomes your personal place for VALORANT clips.
          </p>

        </div>


        {/* Feature cards */}

        <div className="mt-10 grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.number}
                className="group bg-[#101115] p-6 transition-colors hover:bg-[#121318] sm:p-7"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center bg-[#FF4655]/10 transition-colors group-hover:bg-[#FF4655] sm:h-11 sm:w-11">

                    <Icon
                      size={19}
                      className="text-[#FF4655] transition-colors group-hover:text-white"
                    />

                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-gray-700">
                    {feature.number}
                  </span>

                </div>

                <h3 className="mt-6 text-base font-semibold text-white sm:mt-7">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

              </div>
            )
          })}

        </div>

      </section>


      {/* =====================================================
          BUILT FOR PLAYERS
      ====================================================== */}

      <section className="border-y border-white/[0.06] bg-[#0D0E11]">

        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">

            {/* Text */}

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FF4655] sm:text-[10px] sm:tracking-[0.3em]">
                BUILT FOR PLAYERS
              </p>

              <h2 className="mt-4 text-3xl font-bold uppercase leading-tight tracking-[-0.02em] sm:text-4xl">

                The clip you hit

                <span className="block text-[#FF4655]">
                  deserves to be seen.
                </span>

              </h2>

              <p className="mt-5 max-w-[500px] text-sm leading-7 text-gray-500">
                Upload your best rounds, keep track of the clips you love, and
                give your friends somewhere to actually see your plays.
              </p>

              <Link
                to="/"
                className="mt-7 inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Explore valoClips
                <ChevronRight size={15} />
              </Link>

            </div>


            {/* Profile card */}

            <div className="relative flex justify-center lg:justify-end">

              <div className="relative w-full max-w-[440px] border border-white/[0.07] bg-[#101115] p-5 sm:p-6">

                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0">

                    <p className="text-[9px] uppercase tracking-[0.18em] text-gray-600 sm:text-[10px] sm:tracking-[0.2em]">
                      YOUR PROFILE
                    </p>

                    <p className="mt-2 truncate text-base font-bold text-white sm:text-lg">
                      Ready when you are.
                    </p>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FF4655]/10 sm:h-11 sm:w-11">

                    <Play
                      size={18}
                      className="text-[#FF4655]"
                    />

                  </div>

                </div>


                {/* Stats */}

                <div className="mt-6 grid grid-cols-3 border-y border-white/[0.06] py-5 sm:mt-7">

                  <div>

                    <p className="text-lg font-bold text-white">
                      0
                    </p>

                    <p className="mt-1 text-[9px] text-gray-600 sm:text-[10px]">
                      Clips
                    </p>

                  </div>

                  <div>

                    <p className="text-lg font-bold text-white">
                      0
                    </p>

                    <p className="mt-1 text-[9px] text-gray-600 sm:text-[10px]">
                      Friends
                    </p>

                  </div>

                  <div>

                    <p className="text-lg font-bold text-white">
                      0
                    </p>

                    <p className="mt-1 text-[9px] text-gray-600 sm:text-[10px]">
                      Favorites
                    </p>

                  </div>

                </div>


                <div className="mt-5 flex items-start gap-3 text-[10px] leading-5 text-gray-500 sm:text-[11px]">

                  <ShieldIcon />

                  <span>
                    Connect Riot to start building your profile.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[#FF4655]/[0.025]" />

        <div className="relative mx-auto max-w-[1400px] px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-10">

          <div className="mx-auto max-w-[700px]">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FF4655] sm:text-[10px] sm:tracking-[0.3em]">
              YOUR GAME. YOUR PEOPLE.
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl">

              Ready to make

              <span className="block text-[#FF4655]">
                your feed?
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-[500px] text-sm leading-6 text-gray-500 sm:leading-7">
              Connect your Riot account and bring your clips, friends, and
              favorite VALORANT moments together.
            </p>


            {/* CONNECT RIOT */}

            <Link
              to="/profile"
              className="mt-7 inline-flex w-full items-center justify-center gap-3 bg-[#FF4655] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e63e4c] sm:mt-8 sm:w-auto"
            >

              <Link2
                size={18}
                strokeWidth={2}
              />

              Connect with Riot

              <ChevronRight size={16} />

            </Link>

          </div>

        </div>

      </section>


      {/* FOOTER */}

     

    </main>
  )
}


function ShieldIcon() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#FF4655]/10">
      <span className="h-2 w-2 rounded-full bg-[#FF4655]" />
    </span>
  )
}

export default Landing 