import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getVersions,
    restoreVersion,
} from "../../services/documentService";

import type { ReportVersion } from "../../services/documentService";

interface Props {

    documentId: string;

    // Bumped by the parent whenever a new analysis run completes, so this
    // component knows to refetch the version list.
    refreshKey: number;

    onViewVersion: (versionNumber: number | null) => void;

    viewingVersion: number | null;

    onRestored: () => void;

}

function formatDate(iso: string): string {

    return new Date(iso).toLocaleString(undefined, {

        dateStyle: "medium",

        timeStyle: "short",

    });

}

function VersionHistory({
    documentId,
    refreshKey,
    onViewVersion,
    viewingVersion,
    onRestored,
}: Props) {

    const [versions, setVersions] = useState<ReportVersion[]>([]);

    const [loading, setLoading] = useState(true);

    const [restoringVersion, setRestoringVersion] =
        useState<number | null>(null);

    useEffect(() => {

        let cancelled = false;

        async function load() {

            setLoading(true);

            try {

                const data = await getVersions(documentId);

                if (!cancelled) {

                    setVersions(data.versions);

                }

            }

            catch (error) {

                console.error(error);

            }

            finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        }

        load();

        return () => {
            cancelled = true;
        };

    }, [documentId, refreshKey]);

    async function handleRestore(versionNumber: number) {

        setRestoringVersion(versionNumber);

        try {

            await restoreVersion(documentId, versionNumber);

            toast.success(`Version ${versionNumber} restored as current.`);

            onViewVersion(null);

            onRestored();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to restore this version.");

        }

        finally {

            setRestoringVersion(null);

        }

    }

    if (loading) {

        return null;

    }

    if (versions.length <= 1) {

        // Nothing meaningful to show until there's more than one run.
        return null;

    }

    return (

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">

            <h3 className="mb-3 font-semibold dark:text-white">

                🕓 Report History

            </h3>

            <div className="space-y-2">

                {versions.map((version) => {

                    const isViewing =
                        viewingVersion === version.version_number;

                    return (

                        <div

                            key={version.version_number}

                            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                                isViewing
                                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
                                    : "border-transparent bg-slate-50 dark:bg-slate-900/40"
                            }`}

                        >

                            <div>

                                <p className="font-medium dark:text-gray-100">

                                    Version {version.version_number}

                                    {version.is_current && (

                                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">

                                            Current

                                        </span>

                                    )}

                                </p>

                                <p className="text-xs text-gray-500 dark:text-gray-400">

                                    {formatDate(version.created_at)}

                                </p>

                            </div>

                            <div className="flex items-center gap-2">

                                <button

                                    onClick={() =>

                                        onViewVersion(

                                            isViewing
                                                ? null
                                                : version.version_number,

                                        )

                                    }

                                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"

                                >

                                    {isViewing ? "Viewing" : "View"}

                                </button>

                                {!version.is_current && (

                                    <button

                                        onClick={() =>

                                            handleRestore(
                                                version.version_number,
                                            )

                                        }

                                        disabled={
                                            restoringVersion ===
                                            version.version_number
                                        }

                                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"

                                    >

                                        {restoringVersion ===
                                        version.version_number
                                            ? "Restoring..."
                                            : "Restore"}

                                    </button>

                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default VersionHistory;
