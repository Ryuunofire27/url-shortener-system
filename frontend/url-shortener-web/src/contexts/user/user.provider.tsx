import React, { useMemo } from "react";
import { initialUserContext, UserContext, UserContextType } from "./user.context";
import { useGetUser } from "@/hooks/api/user/use-get-user.hook";
import { setDataToStorage } from "@/lib/utils/set-data-to-storage.util";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userContext, setUserContext] = React.useState<UserContextType>(initialUserContext);

  useGetUser({
    onSuccess: (data) => {
      let _user = { id: userContext.id };
      if (data) {
        _user = data;
      }
      setUserContext(_user);
      setDataToStorage('user', JSON.stringify(_user));
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const data = useMemo(() => userContext, [userContext])
  
  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  )
}