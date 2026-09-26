import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Link2, UserRound, ShieldCheck, LogOut, User } from "lucide-react"

const navLinks = [
  { name: "Profile", path: "/profile" },
  { name: "Agents", path: "/agents" },
  { name: "Weekly", path: "/weekly" },
]

export default function Navbar({ user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef(null)

  // Landing page shows "Connect Riot". Other pages show connected profile state.
  const isLoggedIn = location.pathname !== "/"

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  // Handle click outside to close account menu dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = (e) => {
    e.stopPropagation()
    setAccountMenuOpen(false)
    setMobileOpen(false)

    if (typeof onLogout === "function") {
      onLogout()
    } else if (typeof user?.logout === "function") {
      user.logout()
    }

    navigate("/")
  }

  const checkIsActive = (path) => {
    if (path === "/weekly") {
      return (
        location.pathname === "/weekly" ||
        location.pathname === "/leaderboards" ||
        location.pathname === "/leaderboard"
      )
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#07080A]/95 backdrop-blur-md">
      {/* Top Tactical Line */}
      <div className="flex h-[2px] w-full items-center bg-[#0d0f14]">
        <div className="h-full w-32 bg-[#FF4655]" />
        <div className="h-full flex-1 bg-gradient-to-r from-[#FF4655]/40 via-white/[0.04] to-transparent" />
      </div>

      {/* Main Navbar Interface */}
      <div className="mx-auto flex h-[72px] w-full max-w-[1536px] items-center justify-between px-4 sm:px-8 lg:px-12">
        
        {/* Logo Section */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center py-2 focus:outline-none"
        >
          <img
            src="/logo.svg"
            alt="valoClips"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex lg:gap-4">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.path)

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 font-display text-[11px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-150 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#FF4655]" />
                    <span className="absolute left-0 top-1 h-1 w-1 bg-[#FF4655]" />
                    <span className="absolute right-0 top-1 h-1 w-1 bg-[#FF4655]" />
                  </>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Section: Account Control & Mobile Toggle */}
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            /* Connected Account Control (Integrated Layout with Popover) */
            <div className="relative hidden sm:block" ref={accountMenuRef}>
              <button
                type="button"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 text-left transition opacity-90 hover:opacity-100 focus:outline-none"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center bg-white/[0.04] text-white">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user?.username || "PLAYER"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={16} className="text-[#FF4655]" />
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 bg-[#FF4655]" />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-display text-xs font-extrabold uppercase tracking-wider text-white">
                      {user?.username || "PLAYER"}
                    </span>
                    {user?.tagline && (
                      <span className="font-mono text-[10px] text-gray-500">
                        #{user.tagline}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-gray-400">
                    <ShieldCheck size={10} className="text-[#FF4655]" />
                    <span>CONNECTED</span>
                  </div>
                </div>
              </button>

              {/* Compact Tactical Account Menu Dropdown */}
              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 border border-white/[0.1] bg-[#0A0C0F] p-1 shadow-2xl backdrop-blur-md">
                  <div className="h-[2px] w-full bg-[#FF4655]" />
                  <Link
                    to="/profile"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    <User size={14} className="text-gray-400" />
                    <span>Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:bg-[#FF4655]/10 hover:text-[#FF4655]"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Disconnected State */
            <Link
              to="/profile"
              className="group relative hidden h-9 items-center gap-2 bg-[#FF4655] px-4 font-display text-xs font-extrabold uppercase tracking-widest text-white transition duration-200 hover:bg-[#E03E4D] focus:outline-none sm:flex"
            >
              <Link2 size={13} className="transition-transform duration-200 group-hover:rotate-45" />
              <span>Connect Riot</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center text-gray-300 transition hover:text-white focus:outline-none md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#07080A] px-6 pb-8 pt-4 md:hidden">
          <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-2">
            <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#FF4655]">
              // NAVIGATION
            </span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.path)

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between border-l-2 px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "border-[#FF4655] bg-[#FF4655]/10 text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="h-1.5 w-1.5 bg-[#FF4655]" />}
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3 py-1">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.04]">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user?.username || "PLAYER"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={16} className="text-[#FF4655]" />
                    )}
                  </div>
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-wide text-white">
                      {user?.username || "PLAYER"}
                      {user?.tagline && (
                        <span className="ml-1.5 font-mono text-[10px] text-gray-500">
                          #{user.tagline}
                        </span>
                      )}
                    </p>
                    <p className="font-mono text-[9px] uppercase text-gray-400">
                      CONNECTED ACCOUNT
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 pt-2">
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 py-2 font-display text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:text-white"
                  >
                    <User size={14} className="text-gray-400" />
                    <span>Profile</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 font-display text-xs font-bold uppercase tracking-wider text-[#FF4655] transition hover:text-[#e03e4d]"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 bg-[#FF4655] py-3 font-display text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-[#E03E4D]"
              >
                <Link2 size={15} />
                <span>Connect Riot</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}