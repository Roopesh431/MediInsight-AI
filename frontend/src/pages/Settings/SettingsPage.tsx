import PageContainer from "../../components/layout/PageContainer";

function SettingsPage() {

    return (

        <PageContainer
            title="⚙️ Settings"
            subtitle="Application information"
        >

            <div className="rounded-xl bg-white p-8 shadow">

                <h2 className="text-2xl font-bold">

                    MediInsight AI v1.0

                </h2>

                <div className="mt-6 space-y-3">

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
                        PaddleOCR

                    </p>

                    <p>

                        <strong>AI Model</strong>

                        {" "}
                        Gemini 2.5 Flash

                    </p>

                    <p>

                        <strong>Version</strong>

                        {" "}
                        v1.0.0

                    </p>

                </div>

            </div>

        </PageContainer>

    );

}

export default SettingsPage;