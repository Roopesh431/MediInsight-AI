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

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    {title}

                </h1>

                {subtitle && (

                    <p className="mt-2 text-gray-500">

                        {subtitle}

                    </p>

                )}

            </div>

            <div className="bg-white rounded-2xl shadow p-8">

                {children}

            </div>

        </div>

    );

}

export default PageContainer;