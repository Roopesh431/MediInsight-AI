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
            className="w-full rounded-xl border p-4 mb-6"
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