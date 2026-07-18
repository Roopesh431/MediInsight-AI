interface Props {

    search: string;

    onSearch: (value: string) => void;

    onCopy: () => void;

    onDownload: () => void;

}

function OCRToolbar({

    search,

    onSearch,

    onCopy,

    onDownload,

}: Props) {

    return (

        <div className="mb-5 flex flex-wrap gap-4">

            <input

                value={search}

                onChange={(e) =>

                    onSearch(e.target.value)

                }

                placeholder="Search OCR text..."

                className="flex-1 rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"

            />

            <button

                onClick={onCopy}

                className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"

            >

                📋 Copy

            </button>

            <button

                onClick={onDownload}

                className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"

            >

                ⬇ Download

            </button>

        </div>

    );

}

export default OCRToolbar;