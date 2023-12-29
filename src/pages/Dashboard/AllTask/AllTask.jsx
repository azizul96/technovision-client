import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";



const AllTask = () => {
    const axiosPublic = useAxiosPublic()
    const {data: tasks =[], refetch} = useQuery({
        queryKey: ['tasks'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/tasks`)
            return res.data;
        }
    })
    const todoTask = tasks.filter(todo => todo.status == "todo")
    const ongoingTask = tasks.filter(ongoing => ongoing.status == "ongoing")
    const completedTask = tasks.filter(completed => completed.status == "completed")
    console.log(completedTask, todoTask);


    const handleDragEnd = (result) => {
        if (!result.destination) return; // Dragged outside of droppable area
    
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);
    
        // TODO: Update the order of tasks in the backend or wherever your data is stored.
        // You may want to make an API call to update the task order.
        console.log(result);
        if(result?.destination?.droppableId == "completed"){
            console.log('drop on completed');
            axiosPublic.patch(`/tasks/completed/${result.draggableId}`)
            .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success("Drop into Completed!")
                refetch()
            }
        })
        }
        if(result?.destination?.droppableId == "ongoing"){
            console.log('drop on ongoing');
            axiosPublic.patch(`/tasks/ongoing/${result.draggableId}`)
            .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success("Drop into Ongoing!")
                refetch()
            }
        })
        }
        if(result?.destination?.droppableId == "todo"){
            console.log('drop on todo');
            axiosPublic.patch(`/tasks/todo/${result.draggableId}`)
            .then(res =>{
            if(res.data.modifiedCount > 0){
                toast.success("Drop into Todo!")
                refetch()
            }
        })
        }
      };


    const handleDelete = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              
            axiosPublic.delete(`/tasks/${id}`)
            .then(res =>{
                // console.log(res);
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            })
            }
          });
    }
    

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h1 className="text-2xl text-center font-bold p-4 bg-rose-600 text-white rounded-md mb-1">Task Board </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <Droppable droppableId="todo">
            {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-[#395775] rounded-md p-2 h-fit"
                >
                <h1 className="text-white text-center font-bold mb-10">To-Do</h1>
                <div className="flex flex-col justify-center gap-2">
                    {todoTask.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card bg-base-100 shadow-xl rounded-md"
                        >
                            <div className="card-body p-5">
                            <h2 className="card-title">{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Deadline: {task.deadline}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="card-actions justify-end">
                                <Link to={`update-task/${task._id}`}>
                                <button className="btn btn-sm btn-success text-white rounded-full">Update</button>
                                </Link>
                                <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error text-white rounded-full">Delete</button>
                            </div>
                            </div>
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                </div>
            )}
            </Droppable>

            <Droppable droppableId="ongoing">
                
            {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="bg-[#fb8500] rounded-md p-2 your-ongoing-droppable-area-styles" >
              <h1 className="text-white text-center font-bold mb-10">Ongoing</h1>
              <div className="flex flex-col justify-center gap-2 ">
                    {ongoingTask.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card bg-base-100 shadow-xl rounded-md"
                        >
                            <div className="card-body p-5">
                            <h2 className="card-title">{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Deadline: {task.deadline}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="card-actions justify-end">
                                <Link to={`update-task/${task._id}`}>
                                <button className="btn btn-sm btn-success text-white rounded-full">Update</button>
                                </Link>
                                <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error text-white rounded-full">Delete</button>
                            </div>
                            </div>
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            </div> 
            )}
            </Droppable>
                

            <Droppable droppableId="completed">
            {(provided) => ( <div ref={provided.innerRef} {...provided.droppableProps} className="bg-[#4fac46] rounded-md p-2  your-completed-droppable-area-styles" >
              <h1 className="text-white text-center font-bold mb-10">Completed</h1>
              <div className="flex flex-col justify-center gap-2">
                    {completedTask.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card bg-base-100 shadow-xl rounded-md"
                        >
                            <div className="card-body p-5">
                            <h2 className="card-title">{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Deadline: {task.deadline}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="card-actions justify-end">
                                <Link to={`update-task/${task._id}`}>
                                <button className="btn btn-sm btn-success text-white rounded-full">Update</button>
                                </Link>
                                <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error text-white rounded-full">Delete</button>
                            </div>
                            </div>
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            </div>
            )}
            </Droppable>
        </div>
        </DragDropContext>
    );
};

export default AllTask;