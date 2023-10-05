import { useEffect, useState } from "react";

const useOnline = () => {
  const [isOnline, setisOnline] = useState(true);

  useEffect(() => {
    const handlerOnline = () => {
      setisOnline(true);
    };

    const handlerOffline = () => {
      setisOnline(false);
    };

    window.addEventListener("online", handlerOnline);
    window.addEventListener("offline", handlerOffline);

    return () => {
      window.removeEventListener("online", handlerOnline);
      window.removeEventListener("offline", handlerOffline);
    };
  }, []);

  return isOnline;
};

export default useOnline;
