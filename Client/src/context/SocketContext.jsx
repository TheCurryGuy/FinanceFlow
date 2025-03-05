import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://financeflow-server.vercel.app", {
      withCredentials: true,
      transports: ["websocket", "polling"], // Ensures it falls back to polling if WS fails
      reconnectionAttempts: 5, // Prevent infinite loops
      reconnectionDelay: 2000, // 2s delay before retry
    });
  
    newSocket.on("connect", () => {
      console.log("✅ WebSocket Connected:", newSocket.id);
    });
  
    newSocket.on("connect_error", (err) => {
      console.error("❌ Connection Error:", err.message);
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
