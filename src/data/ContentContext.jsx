import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULTS } from "../data/content.js";

const ContentContext = createContext(DEFAULTS);

export function ContentProvider({ children }) {
  const [data, setData] = useState(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (active && json) setData(json);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={data}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}