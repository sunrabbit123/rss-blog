import { style } from "@vanilla-extract/css";

export const header = style({
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  padding: "1rem",
  backgroundColor: "white",
  borderBottom: "1px solid #eaeaea",
  zIndex: 1000,
});

export const main = style({
  padding: "2rem",
  minHeight: "calc(100vh - 160px)", // header + footer height
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
});

export const footer = style({
  padding: "2rem",
  backgroundColor: "#f7f7f7",
  borderTop: "1px solid #eaeaea",
  textAlign: "center",
  height: "80px",
});

export const article = style({
  padding: "1.5rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  transition: "box-shadow 0.2s ease",
  ":hover": {
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
});

export const articleTitle = style({
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
  color: "#333",
});

export const articleDescription = style({
  fontSize: "0.875rem",
  color: "#666",
  marginBottom: "1rem",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const articleDate = style({
  fontSize: "0.75rem",
  color: "#999",
});
