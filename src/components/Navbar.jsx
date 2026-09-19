import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  ChevronDown,
  UserRound,
} from "lucide-react"

const navLinks = [
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Agents",
    path: "/agents",
  },
  {
    name: "Leaderboard",
    path: "/leaderboards",
  },
]

function Navbar({ user }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Landing page shows Connect Riot.
  // Other pages show the demo profile.
  const isLoggedIn = location.pathname !== "/"

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090B]/95 backdrop-blur-xl">

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center"
        >
          <img
            src="/logo.svg"
            alt="valoClips"
            className="h-[50px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03] sm:h-[46px]"
          />
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative px-3 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 lg:px-4 ${
                  isActive
                    ? "text-white"
                    : "text-[#666970] hover:text-white"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-[#FF4655] transition-all duration-200 ${
                    isActive
                      ? "w-5"
                      : "w-0 group-hover:w-3"
                  }`}
                />
              </Link>
            )
          })}

        </nav>


        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-2">

          {/* =================================================
              DESKTOP ACCOUNT / CONNECT
          ================================================== */}

          {isLoggedIn ? (

            <button
              type="button"
              className="group hidden items-center gap-2.5 border border-white/[0.07] bg-[#0D0E11] px-2.5 py-2 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#111216] sm:flex"
            >

              {/* Generic account icon */}

              <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#FF4655]">
                <UserRound
                  size={15}
                  strokeWidth={2}
                  className="text-white"
                />
              </div>


              {/* User information */}

              <div className="hidden text-left md:block">

                <div className="flex items-center gap-1.5">

                  <span className="font-display text-[10px] font-bold tracking-wide text-white">
                    {user?.username || "Saksham"}
                  </span>

                  <span className="font-display text-[9px] text-[#555860]">
                    #{user?.tagline || "1402"}
                  </span>

                </div>


                <div className="mt-1 flex items-center gap-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFB020]" />

                  <span className="font-display text-[7px] font-semibold uppercase tracking-[0.14em] text-[#646970]">
                    Demo Account
                  </span>

                </div>

              </div>


              <ChevronDown
                size={12}
                className="text-[#555960] transition-colors group-hover:text-white"
              />

            </button>

          ) : (

            /* =================================================
               CONNECT RIOT
            ================================================== */

            <Link
              to="/profile"
              className="hidden items-center gap-2 border border-white/[0.08] bg-[#0D0E11] px-3 py-2.5 font-display text-[9px] font-bold uppercase tracking-[0.12em] text-[#B7B9BD] transition-all duration-200 hover:border-[#FF4655]/40 hover:bg-[#111216] hover:text-white sm:flex"
            >

              <UserRound
                size={15}
                strokeWidth={2}
                className="text-[#FF4655]"
              />

              <span>
                Connect Riot
              </span>

            </Link>

          )}


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            className="flex h-10 w-10 items-center justify-center border border-white/[0.08] bg-[#0D0E11] text-[#8B8E95] transition hover:border-white/[0.15] hover:text-white md:hidden"
          >

            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-[#090A0C] transition-all duration-300 md:hidden ${
          mobileOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="px-4 pb-5 pt-3 sm:px-6">

          {/* =================================================
              MOBILE LINKS
          ================================================== */}

          <nav className="flex flex-col">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between border-b border-white/[0.05] py-4 font-display text-[11px] font-bold uppercase tracking-[0.14em] ${
                    isActive
                      ? "text-white"
                      : "text-[#696C73]"
                  }`}
                >

                  <span>
                    {link.name}
                  </span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 bg-[#FF4655]" />
                  )}

                </Link>
              )
            })}

          </nav>


          {/* =================================================
              MOBILE ACCOUNT
          ================================================== */}

          <div className="mt-4">

            {isLoggedIn ? (

              <div className="flex items-center gap-3 border border-white/[0.07] bg-[#0D0E11] p-3">

                {/* Generic account icon */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FF4655]">
                  <UserRound
                    size={17}
                    strokeWidth={2}
                    className="text-white"
                  />
                </div>


                {/* User information */}

                <div>

                  <div className="flex items-center gap-1.5">

                    <span className="font-display text-[11px] font-bold text-white">
                      {user?.username || "Saksham"}
                    </span>

                    <span className="font-display text-[9px] text-[#555860]">
                      #{user?.tagline || "1402"}
                    </span>

                  </div>


                  <div className="mt-1 flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFB020]" />

                    <span className="font-display text-[8px] uppercase tracking-[0.14em] text-[#646970]">
                      Demo Account
                    </span>

                  </div>

                </div>

              </div>

            ) : (

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 bg-[#FF4655] px-4 py-3 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#e63d4c]"
              >

                <UserRound
                  size={16}
                  strokeWidth={2}
                />

                Connect Riot

              </Link>

            )}

          </div>

        </div>

      </div>

    </header>
  )
}

export default Navbar