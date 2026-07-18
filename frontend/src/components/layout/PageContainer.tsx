import type { ReactNode } from "react";

interface Props {

    title: string;

    subtitle?: string;

    children: ReactNode;

}

function PageContainer({
    title,
    subtitle,
    children,
}: Props) {

    return (

        <div className="max-w-7xl mx-auto">

            <div className="mb-6 sm:mb-8">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white">

                    {title}

                </h1>

                {subtitle && (

                    <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">

                        {subtitle}

                    </p>

                )}

            </div>

            <div className="bg-white rounded-2xl shadow p-4 sm:p-6 lg:p-8 dark:bg-slate-800">

                {children}

            </div>

        </div>

    );

}

export default PageContainer;
