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
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
});

export const footer = style({
  padding: "2rem",
  backgroundColor: "#f7f7f7",
  borderTop: "1px solid #eaeaea",
  textAlign: "center",
  height: "80px",
});

export const article = style({
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  transition: "box-shadow 0.2s ease",
  minHeight: "200px",
  position: "relative",
  paddingBottom: "5rem",
  ":hover": {
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
});

export const blogTitle = style({
  fontSize: "0.875rem",
  color: "#666",
  marginBottom: "0.5rem",
  fontWeight: "500",
});

export const articleTitle = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "#333",
});

export const articleDescription = style({
  fontSize: "1rem",
  color: "#666",
  marginBottom: "1.5rem",
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  lineHeight: "1.5rem",
});

export const articleFooter = style({
  position: "absolute",
  bottom: "2rem",
  left: "2rem",
  right: "2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const articleDate = style({
  fontSize: "0.875rem",
  marginLeft: "auto",
  color: "#999",
});

export const categoryContainer = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const category = style({
  padding: "0.25rem 0.75rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "999px",
  fontSize: "0.75rem",
  color: "#666",
});
