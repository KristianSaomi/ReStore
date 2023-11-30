import { List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLink = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    transition: "250ms ease-in-out",
    color: "secondary.main",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function MidleHeaderLinks() {
  return (
    <List sx={{ display: "flex" }}>
      {midLink.map(({ title, path }) => (
        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
          {title.toUpperCase()}
        </ListItem>
      ))}
    </List>
  );
}
