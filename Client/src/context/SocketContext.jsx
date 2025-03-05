import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://financeflow-server.vercel.app", {
      transports: ["websocket", "polling"], // Ensure stable connection
      withCredentials: true, // Fix CORS-related issues
      reconnectionAttempts: 5, // Retry only 5 times
      reconnectionDelay: 2000, // 2s delay before reconnection attempt
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
