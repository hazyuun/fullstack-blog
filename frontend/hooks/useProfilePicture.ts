import { User } from "@/types/user";
import { useEffect, useState } from "react";

export const useProfilePicture = (user?: Partial<User>) => {
  const [image, setImage] = useState("");
  
  const generateIdenticon = async (input: string) => {
    import("jdenticon").then(({ toSvg }) => {
      const svgString = toSvg(input, 500);
      const base64 = Buffer.from(svgString).toString("base64");
      setImage(`data:image/svg+xml;base64,${base64}`);
    });
  };

  useEffect(() => {
    if(user == null || user == undefined){
      return
    }
    if (user.photo == "default.jpg") generateIdenticon(user.username!);
    else setImage(user.photo!);
  }, [user]);

  return image;
};
