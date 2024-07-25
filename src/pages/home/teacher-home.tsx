import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getTasks } from "@/features/teacher-task/teacher-task-slice";
import { serverUrl } from "@/helpers/shared";
import PrivateRoute from "@/private/private-route";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function TeacherHome() {
    const dispatch = useDispatch()
    const { tasks } = useSelector((state: RootState) => state.teacherTasks)
    useEffect(() => {
        (
            async function() {
                try {
                    const res = await apiClient.get("/teacher-tasks");
                    dispatch(getTasks(res.data))
                } catch (error) {
                  const result = error as Error;
                  toast.error(result.message);
                }
            }
        )()
    },[])

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h4 className="font-bold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          voluptates sit dolorum.
        </h4>
        <div className="flex items-center gap-2">
          <PrivateRoute roles={["teacher"]}>
            <p className="bg-green-500 w-max px-2 font-bold rounded-md text-white">
              Y1
            </p>
          </PrivateRoute>
          <Link
            className="text-sm underline text-blue-500"
            to={`${serverUrl}/uploads/`}
            download
          >
            Vazifa
          </Link>
        </div>
      </div>
    </div>
  );
}
