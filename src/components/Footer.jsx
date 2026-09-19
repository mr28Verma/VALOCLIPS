import { ArrowUpRight, Users, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

const columns = [
  {
    heading: "EXPLORE",
    links: [
      { name: "Clips", path: "/" },
      { name: "Profile", path: "/profile" },
      { name: "Leaderboard", path: "/leaderboards" },
      { name: "Agents", path: "/agents" },
    ],
  },
  {
    heading: "CONNECT",
    links: [
      { name: "Discord", external: true },
      { name: "Twitter", external: true },
    ],
  },
  {
    heading: "LEGAL",
    links: [
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
      { name: "DMCA", path: "/dmca" },
    ],
  },
]

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#08090B]">

      {/* TOP ACCENT */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#FF4655]/50 to-transparent" />

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#FF4655]/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-10 py-12 sm:py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-8 lg:gap-12 lg:py-16">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="md:pr-8">

            {/* LOGO */}

            <Link
              to="/"
              className="group inline-flex items-center"
            >
              <img
                src="/logo.svg"
                alt="valoClips"
                className="h-[38px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>


            {/* DESCRIPTION */}

            <p className="mt-5 max-w-[330px] text-[12px] leading-6 text-[#666970]">
              Your home for VALORANT clips, friends, and the rounds worth
              remembering.
            </p>


            {/* CONNECT RIOT */}

            <Link
              to="/profile"
              className="group mt-6 inline-flex items-center gap-2.5 border border-white/[0.08] bg-[#0D0E11] px-4 py-2.5 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#B7B9BD] transition-all duration-200 hover:border-[#FF4655]/40 hover:bg-[#111216] hover:text-white"
            >

              <img
                src="/riot.png"
                alt="Riot"
                className="h-[15px] w-[15px] object-contain"
              />

              <span>
                Connect Riot Account
              </span>

              <ArrowUpRight
                size={12}
                className="text-[#666970] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF4655]"
              />

            </Link>

          </div>


          {/* =================================================
              FOOTER COLUMNS
          ================================================= */}

          {columns.map((column) => (
            <div key={column.heading}>

              {/* HEADING */}

              <p className="font-display text-[9px] font-bold tracking-[0.2em] text-white">
                {column.heading}
              </p>


              {/* HEADING LINE */}

              <div className="mt-3 h-px w-5 bg-[#FF4655]" />


              {/* LINKS */}

              <ul className="mt-5 flex flex-col gap-3.5">

                {column.links.map((link) => (
                  <li key={link.name}>

                    {link.external ? (

                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="group inline-flex items-center gap-1.5 font-display text-[11px] text-[#666970] transition-colors duration-200 hover:text-white"
                      >

                        <span>
                          {link.name}
                        </span>

                        <ExternalLink
                          size={9}
                          className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-70"
                        />

                      </a>

                    ) : (

                      <Link
                        to={link.path}
                        className="group inline-flex items-center gap-1.5 font-display text-[11px] text-[#666970] transition-colors duration-200 hover:text-white"
                      >

                        <span>
                          {link.name}
                        </span>

                        <ArrowUpRight
                          size={9}
                          className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
                        />

                      </Link>

                    )}

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>


        {/* =====================================================
            RIOT DISCLAIMER
        ====================================================== */}

        <div className="border-t border-white/[0.06] py-5">

          <div className="max-w-[850px]">

            <p className="font-display text-[9px] font-semibold uppercase tracking-[0.12em] text-[#555960]">
              Fan Project
            </p>

            <p className="mt-2 text-[10px] leading-5 text-[#4F5258]">
              valoClips is a fan-made project and is not endorsed,
              sponsored, or affiliated with Riot Games. VALORANT and
              Riot Games are trademarks of Riot Games, Inc.
            </p>

          </div>

        </div>


        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="flex flex-col gap-4 border-t border-white/[0.06] py-5 font-display text-[9px] tracking-wide text-[#55555D] sm:flex-row sm:items-center sm:justify-between">

          {/* COPYRIGHT */}

          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">

            <span>
              © {new Date().getFullYear()} valoClips
            </span>

            <span className="hidden text-[#33353A] sm:inline">
              /
            </span>

            <span>
              All rights reserved.
            </span>

          </div>


          {/* PLATFORM LABEL */}

          <div className="flex items-center gap-2">

            <span className="flex h-5 w-5 items-center justify-center border border-white/[0.07] bg-[#0D0E11]">
              <Users size={10} />
            </span>

            <span className="tracking-[0.12em]">
              VALORANT CLIP PLATFORM
            </span>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer