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
import { toast } from "sonner";

export default function UserForm({
  id,
  name,
  lastname,
  phone
}: {
  id?: string;
  name?: string;
  lastname?: string;
  phone?: string;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
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
        filial: checkFilials,
        name: nameRef?.current?.value,
        lastname: lastnameRef?.current?.value,
        photo: photoRef?.current?.files ? photoRef?.current?.files[0] : null,
        phone: phoneRef?.current?.value,
        password: passwordRef?.current?.value
      };

      if (id) {
        const res = await apiClient.put(`users/update/${id}`, userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(res.data.user) {
          dispatch(changeUser(res.data.user));
          toast.success(res.data.message)
          return
        }
        toast.error(res.data.message)
        return;
      }

      if (
        !id
      ) {
        const res = await apiClient.post("/users/add", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(res.data.user) {
          dispatch(addUser(res.data.user));
          toast.success(res.data.message)
          return
        }
        toast.error(res.data.message)
        return;
      }
    } catch (error) {
      const result = error as Error
      toast.error(result.message)
    }
  };

  useEffect(() => {
    getAllFilials();
  }, [getAllFilials]);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
      <Input
        required
        ref={phoneRef}
        defaultValue={phone ?? "+998"}
        type="text"
        placeholder="+998*********"
      />
      <Input
        required
        ref={passwordRef}
        type="password"
        placeholder="********"
      />
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
      <Input ref={photoRef} type="file" />
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
