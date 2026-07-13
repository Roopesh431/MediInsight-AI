interface Props {

    className?: string;

}

function Skeleton({
    className = "",
}: Props) {

    return (

        <div
            className={`animate-pulse rounded-xl bg-gray-200 ${className}`}
        />

    );

}

export default Skeleton;