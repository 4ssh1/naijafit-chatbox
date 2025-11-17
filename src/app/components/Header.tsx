import { Dumbbell } from "lucide-react"

function Header() {
  return (
    <div className="bg-linear-to-r from-green-600 to-orange-500 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">NaijaFit AI Coach</h1>
            <p className="text-sm text-white/90">Your Personal Gym Companion 🇳🇬</p>
          </div>
        </div>
      </div>
  )
}

export default Header