import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";


const UpdateTask = () => {
    const {id} = useParams()
    const loadedData = useLoaderData()
    console.log(id,loadedData);
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    

    const onSubmit = async(data) =>{
        console.log(data)
        
        const taskInfo = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            deadline: data.deadline,
            status: "todo"
        }
        const taskRes = await axiosPublic.patch(`/tasks/${id}`, taskInfo)
            console.log(taskRes.data);
            if(taskRes.data.modifiedCount > 0){
                reset()
                toast.success("Task Updated!")
                navigate("/dashboard")
            }
        
    }
    return (
        <div>
            <h1 className="text-2xl text-center font-bold p-4 bg-rose-600 text-white rounded-md mb-1">Update Task Item </h1>
            <div className=" bg-[#335c67] p-5 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="from-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Task Title</span>
                    </label>
                    <input {...register("title", {required: true})} defaultValue={loadedData.title} type="text" placeholder="Type here" className="input input-bordered input-primary w-full " required />
                </div>
                <div className="from-control w-full my-6">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Task Description</span>
                    </label>
                    <textarea {...register("description")} defaultValue={loadedData.description}
                    className="textarea textarea-primary w-full" placeholder="Recipe"></textarea>
                </div>
                <div className="flex gap-5">
                    <div className="from-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Priority</span>
                        </label>
                        <select {...register("priority", {required: true})} 
                        className="select select-primary w-full ">
                            <option disabled selected>Select Category</option>
                            <option value="low">Low</option>
                            <option value="moderator">Moderator</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="from-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Deadline</span>
                        </label>
                        <input {...register("deadline", {required: true})} defaultValue={loadedData.deadline} type="date" placeholder="Price" className="input input-bordered input-primary w-full " required/>
                    </div>
                    
                </div>
                <button className="btn bg-[#fb8500] hover:bg-[#fb8500] text-white  w-full border-none shadow-md">Update Task </button>
            </form>
            </div>
        </div>
    );
};

export default UpdateTask;