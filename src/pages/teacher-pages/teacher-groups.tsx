import { apiClient } from "@/api/api-client"
import { RootState } from "@/app/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

export default function TeacherGroups() {
    const dispatch = useDispatch()
    const { group, auth } = useSelector((state: RootState) => state)

    useEffect(() => {
        (
            async function () {
                try {
                    const res = await apiClient.get(`/groups/teacher/${auth?.auth?._id}`);
                } catch (error) {
                  const result = error as Error;
                  toast.error(result.message);
                }
            }
        )()
    }, [])

  return (
    <div>
        sdasd
    </div>
  )
}
