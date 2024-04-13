import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, List, ListItem } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../../Context/useStoreContext";

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

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

export default function RightHeaderLinks() {
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <IconButton
        component={Link}
        to="/basket"
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
      >
        <ShoppingCart />
        <Badge badgeContent={itemCount} color="secondary" />
      </IconButton>
      <List sx={{ display: "flex" }}>
        {rightLinks.map(({ title, path }) => (
          <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
            {title.toUpperCase()}
          </ListItem>
        ))}
      </List>
    </>
  );
}
