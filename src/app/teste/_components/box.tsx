interface BoxProps {
    title: string,
    description: string,
    status: string,
};

export const Box = ({title, description, status}: BoxProps) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "#FBBF24";
            case "in progress":
                return "#3B82F6";   
            case "completed":
                return "#10B981";
            case "cancelled":
                return "#EF4444";
            default:
                return "#6B7280";
        };
    };

    return (
        <div 
            className=" rounded-2xl p-4 w-fit flex flex-col gap-y-2"
            style={{backgroundColor: getStatusColor(status)}}
        >
            <h1 className="text-xl">{title}</h1>
            <p>{description}</p>
        </div>
    );
};