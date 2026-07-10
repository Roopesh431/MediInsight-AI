function Navbar() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <h1 className="text-2xl font-bold text-blue-600">
                🏥 MediInsight AI
            </h1>

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    LR
                </div>
            </div>
        </header>
    );
}

export default Navbar;