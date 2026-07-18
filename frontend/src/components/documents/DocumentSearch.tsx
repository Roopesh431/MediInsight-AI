interface DocumentSearchProps {

    search: string;

    onSearch: (
        value: string,
    ) => void;

}

function DocumentSearch({
    search,
    onSearch,
}: DocumentSearchProps) {

    return (

        <input
            className="w-full rounded-xl border p-4 mb-6 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            placeholder="🔍 Search documents..."
            value={search}
            onChange={(e) =>
                onSearch(
                    e.target.value,
                )
            }
        />

    );

}

export default DocumentSearch;