import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";

import { getTimeline } from "../../services/documentService";

import TimelineCard from "../../components/timeline/TimelineCard";

function TimelinePage() {

    const [timeline, setTimeline] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadTimeline() {

            try {

                const data =
                    await getTimeline();

                setTimeline(
                    data.timeline,
                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadTimeline();

    }, []);

    return (

        <PageContainer
            title="🩺 Medical Timeline"
            subtitle="Chronological history of analyzed documents"
        >

            {loading && (

                <p>

                    Loading timeline...

                </p>

            )}

            {!loading &&
                timeline.length === 0 && (

                <div className="rounded-xl border bg-white p-10 text-center">

                    No analyzed documents found.

                </div>

            )}

            <div className="space-y-6">

                {timeline.map(

                    (item) => (

                        <TimelineCard
                            key={
                                item.document_id
                            }
                            item={item}
                        />

                    ),

                )}

            </div>

        </PageContainer>

    );

}

export default TimelinePage;