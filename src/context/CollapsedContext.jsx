import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CollapsedContext = createContext();

export const CollapsedProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const cookieValue = Cookies.get("collapsed");
    return cookieValue === "true";
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      Cookies.set("collapsed", newState.toString(), {
        expires: 7,
        sameSite: "Lax",
      });
      return newState;
    });
  };

  useEffect(() => {
    const cookieValue = Cookies.get("collapsed");
    if (cookieValue !== undefined) {
      setCollapsed(cookieValue === "true");
    }
  }, []);

  return (
    <CollapsedContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

export const useCollapsed = () => {
  const context = useContext(CollapsedContext);
  if (context === undefined) {
    throw new Error("useCollapsed must be used within a CollapsedProvider");
  }
  return context;
};
