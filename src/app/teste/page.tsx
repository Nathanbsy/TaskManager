import { Box } from "./_components/box";

export default function TestePage(){

 const boxes = [
    {
        "id": 1,
        "title": "Tarefa 1",
        "description": "Descrição da tarefa 1",
        "status": "pending"
    },
    {
        "id": 2,
        "title": "Tarefa 2",
        "description": "Descrição da tarefa 2",
        "status": "in progress"
    },
    {
        "id": 3,
        "title": "Tarefa 3",
        "description": "Descrição da tarefa 3",
        "status": "completed"
    },
    {
        "id": 4,
        "title": "Tarefa 4",
        "description": "Descrição da tarefa 4",
        "status": "cancelled"
    },
];

    return (
        <div className="flex gap-4 p-6">
            {boxes.map((box) => (
                <Box key={box.id} title={box.title} description={box.description} status={box.status}/>
            ))}
        </div>
    )
}