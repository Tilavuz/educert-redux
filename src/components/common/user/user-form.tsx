import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addUser, changeUser } from "@/features/user/user-slice";
import useGetFilials from "@/hooks/use-get-filials";
import { CornerRightDown } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserForm({
  id,
  name,
  lastname,
}: {
  id?: string;
  name?: string;
  lastname?: string;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const { auth } = useSelector((state: RootState) => state.auth);
  const [checkFilials, setCheckFilials] = useState<string[]>([]);

  const { filials } = useSelector((state: RootState) => state.filial);
  const dispatch = useDispatch();
  const { getAllFilials } = useGetFilials();

  const handleCheckbox = (e: boolean, id: string) => {
    if (e) {
      setCheckFilials((prev) => {
        if (prev && !prev.includes(id)) {
          return [...prev, id];
        }
        return [id];
      });
    } else {
      setCheckFilials((prev) => {
        return prev.filter((filial) => filial !== id);
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        auth: auth?._id,
        filial: checkFilials,
        name: nameRef?.current?.value,
        lastname: lastnameRef?.current?.value,
        photo: photoRef?.current?.files ? photoRef?.current?.files[0] : null,
      };

      if (
        id &&
        userData.auth &&
        userData.filial &&
        userData.name &&
        userData.lastname &&
        userData.photo
      ) {
        const res = await apiClient.put(`users/update/${id}`, userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(changeUser(res.data.user));
        return;
      }

      if (
        !id &&
        userData.auth &&
        userData.filial &&
        userData.name &&
        userData.lastname && userData.photo
      ) {
        const res = await apiClient.post("/users/add", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(addUser(res.data.user));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFilials();
  }, [getAllFilials]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <Input
        required
        ref={nameRef}
        defaultValue={name ?? ""}
        type="text"
        placeholder="Ism"
      />
      <Input
        required
        ref={lastnameRef}
        defaultValue={lastname ?? ""}
        type="text"
        placeholder="Familya"
      />
      <Input required ref={photoRef} type="file" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-start gap-2"
            variant={"outline"}
            type="button"
          >
            Filiallar
            <CornerRightDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 max-h-[160px] overflow-y-auto">
          {filials?.map((filial) => {
            return (
              <Label className="flex items-center gap-2" key={filial._id}>
                {filial.title} - {filial.address}
                <Checkbox
                  checked={checkFilials.includes(filial._id)}
                  onCheckedChange={(e: boolean) =>
                    handleCheckbox(e, filial._id)
                  }
                />
              </Label>
            );
          })}
        </PopoverContent>
      </Popover>
      <Button>Kiritish</Button>
    </form>
  );
}