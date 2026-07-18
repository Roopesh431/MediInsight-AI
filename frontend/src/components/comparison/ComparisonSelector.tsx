import { useEffect, useState } from "react";

import {
    getDocuments,
} from "../../services/documentService";

interface Props {

    first: string;

    second: string;

    onFirstChange: (value: string) => void;

    onSecondChange: (value: string) => void;

}

function ComparisonSelector({

    first,

    second,

    onFirstChange,

    onSecondChange,

}: Props) {

    const [documents, setDocuments] =

        useState<any[]>([]);

    useEffect(() => {

        async function load() {

            const data =

                await getDocuments();

            setDocuments(data);

        }

        load();

    }, []);

    return (

        <div className="grid md:grid-cols-2 gap-6">

            <div>

                <label className="block mb-2 font-medium dark:text-gray-200">

                    First Report

                </label>

                <select

                    value={first}

                    onChange={(e) =>

                        onFirstChange(

                            e.target.value,

                        )

                    }

                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white"

                >

                    <option value="">

                        Select Report

                    </option>

                    {documents.map(

                        (doc) => (

                            <option

                                key={doc.document_id}

                                value={doc.document_id}

                            >

                                {doc.original_filename}

                            </option>

                        ),

                    )}

                </select>

            </div>

            <div>

                <label className="block mb-2 font-medium dark:text-gray-200">

                    Second Report

                </label>

                <select

                    value={second}

                    onChange={(e) =>

                        onSecondChange(

                            e.target.value,

                        )

                    }

                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white"

                >

                    <option value="">

                        Select Report

                    </option>

                    {documents.map(

                        (doc) => (

                            <option

                                key={doc.document_id}

                                value={doc.document_id}

                            >

                                {doc.original_filename}

                            </option>

                        ),

                    )}

                </select>

            </div>

        </div>

    );

}

export default ComparisonSelector;