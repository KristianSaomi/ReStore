import { AppBar, Box, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import RightHeaderLinks from "./rightHeaderLinks";
import MidleHeaderLinks from "./MidleHeaderLinks";
interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

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

export default function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <MidleHeaderLinks />
        <Box display="flex" flexDirection="row" alignItems="center">
          <RightHeaderLinks />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
