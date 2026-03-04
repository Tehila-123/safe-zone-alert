import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Accident {
  id: number;
  time: string;
  location: string;
  status: "New" | "Unit informed" | "Resolved";
  coordinates: string;
  speed: number;
  address: string;
}

interface AccidentContextType {
  accidents: Accident[];
  updateAccidentStatus: (id: number, status: Accident["status"]) => void;
  addAccident: (accident: Omit<Accident, "id" | "status">) => void;
}

const initialAccidents: Accident[] = [
  {
    id: 1,
    time: "08:41",
    location: "Kimironko",
    status: "New",
    coordinates: "-1.9456, 30.0615",
    speed: 0,
    address: "KG 15 Ave, Kimironko",
  },
  {
    id: 2,
    time: "08:30",
    location: "Nyamirambo",
    status: "Unit informed",
    coordinates: "-1.9789, 30.0412",
    speed: 45,
    address: "KN 3 Rd, Nyamirambo",
  },
];

const AccidentContext = createContext<AccidentContextType | undefined>(undefined);

export const AccidentProvider = ({ children }: { children: ReactNode }) => {
  const [accidents, setAccidents] = useState<Accident[]>(initialAccidents);

  const updateAccidentStatus = (id: number, status: Accident["status"]) => {
    setAccidents((prev) =>
      prev.map((accident) =>
        accident.id === id ? { ...accident, status } : accident
      )
    );
  };

  const addAccident = (newAccidentData: Omit<Accident, "id" | "status">) => {
    const newAccident: Accident = {
      ...newAccidentData,
      id: accidents.length + 1,
      status: "New",
    };
    setAccidents((prev) => [newAccident, ...prev]);
  };

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/accidents");
        if (response.ok) {
          const data = await response.json();
          setAccidents(data);
        }
      } catch (error) {
        console.error("Error fetching accidents:", error);
      }
    };

    fetchAccidents();
    const interval = setInterval(fetchAccidents, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AccidentContext.Provider value={{ accidents, updateAccidentStatus, addAccident }}>
      {children}
    </AccidentContext.Provider>
  );
};

export const useAccidents = () => {
  const context = useContext(AccidentContext);
  if (!context) {
    throw new Error("useAccidents must be used within an AccidentProvider");
  }
  return context;
};
