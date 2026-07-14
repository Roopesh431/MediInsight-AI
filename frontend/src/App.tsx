import {
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import DocumentsPage from "./pages/Documents/DocumentsPage";
import HistoryPage from "./pages/History/HistoryPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import OCRPage from "./pages/OCR/OCRPage";
import AIAnalysisPage from "./pages/AI/AIAnalysisPage";
import ChatPage from "./pages/chat/ChatPage";
import TimelinePage from "./pages/Timeline/TimelinePage";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<MainLayout />}
            >

                <Route
                    index
                    element={<Dashboard />}
                />

                <Route
                    path="documents"
                    element={<DocumentsPage />}
                />

                <Route
                    path="timeline"
                    element={<TimelinePage />}
                />

                <Route
                    path="history"
                    element={<HistoryPage />}
                />

                <Route
                    path="settings"
                    element={<SettingsPage />}
                />

                <Route
                    path="ocr/:documentId"
                    element={<OCRPage />}
                />

                <Route
                    path="ai/:documentId"
                    element={<AIAnalysisPage />}
                />

                <Route
                    path="chat/:documentId"
                    element={<ChatPage />}
                />

            </Route>

        </Routes>

    );

}

export default App;