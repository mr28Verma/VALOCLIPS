import { ArrowUpRight, Users } from "lucide-react"

const columns = [
  {
    heading: "EXPLORE",
    links: ["Clips", "Players", "Leaderboard", "Agents"],
  },
  {
    heading: "CONNECT",
    links: ["Discord", "Twitter"],
  },
  {
    heading: "LEGAL",
    links: ["Privacy", "Terms", "DMCA"],
  },
]

function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#08090B]">

      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-10 py-10 sm:py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8 lg:gap-12">

          {/* BRAND */}
          <div className="md:pr-8">

            <div className="flex items-center">
              <img
                src="/logo.svg"
                alt="valoClips"
                className="h-[30px] w-auto object-contain"
              />
            </div>

            <p className="mt-4 max-w-[300px] text-[12px] leading-5 text-[#66666F]">
              Your home for VALORANT clips, friends, and the rounds worth
              remembering.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400 transition-colors hover:text-white"
            >
              Connect Riot account

              <ArrowUpRight size={12} />
            </button>
          </div>

          {/* COLUMNS */}

          {columns.map((column) => (
            <div key={column.heading}>

              <p className="font-display text-[10px] font-bold tracking-[0.16em] text-white">
                {column.heading}
              </p>

              <ul className="mt-4 flex flex-col gap-3">

                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-display text-[11px] text-[#66666F] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}

              </ul>
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-5 font-display text-[9px] tracking-wide text-[#55555D] sm:flex-row sm:items-center sm:justify-between">

          <span className="leading-4">
            © {new Date().getFullYear()} valoClips.
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            Not affiliated with Riot Games.
          </span>

          <span className="flex items-center gap-2">
            <Users size={12} />

            <span>VALORANT CLIP PLATFORM</span>
          </span>

        </div>
      </div>
    </footer>
  )
}

export default Footer