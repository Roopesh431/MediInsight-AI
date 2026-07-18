import PageContainer from "../../components/layout/PageContainer";
import ThemeToggle from "../../components/layout/ThemeToggle";

function SettingsPage() {

    return (

        <PageContainer
            title="⚙️ Settings"
            subtitle="Application information"
        >

            <div className="rounded-xl bg-white p-6 sm:p-8 shadow dark:bg-slate-800">

                <div className="flex items-center justify-between flex-wrap gap-4">

                    <h2 className="text-xl sm:text-2xl font-bold dark:text-white">

                        MediInsight AI v1.1

                    </h2>

                </div>

                <div className="mt-6 space-y-3 dark:text-gray-200">

                    <p>

                        <strong>Frontend</strong>

                        {" "}
                        React + TypeScript + Tailwind CSS

                    </p>

                    <p>

                        <strong>Backend</strong>

                        {" "}
                        FastAPI

                    </p>

                    <p>

                        <strong>Database</strong>

                        {" "}
                        SQLite

                    </p>

                    <p>

                        <strong>OCR</strong>

                        {" "}
                        Tesseract + Poppler

                    </p>

                    <p>

                        <strong>AI Gateway</strong>

                        {" "}
                        Groq &rarr; Gemini 2.5 Flash &rarr; OpenRouter (automatic failover)

                    </p>

                    <p>

                        <strong>Version</strong>

                        {" "}
                        v1.1.0

                    </p>

                </div>

                <div className="mt-8 border-t pt-6 flex items-center justify-between dark:border-slate-700">

                    <div>

                        <p className="font-medium dark:text-white">

                            Appearance

                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">

                            Toggle light or dark mode.

                        </p>

                    </div>

                    <ThemeToggle />

                </div>

            </div>

        </PageContainer>

    );

}

export default SettingsPage;
