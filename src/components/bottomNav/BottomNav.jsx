import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const BottomNav = () => {
  return (
    <BottomNavigation>
      <BottomNavigationAction label="Recents" icon={<ContactsOutlinedIcon />} />
      <BottomNavigationAction
        label="Favorites"
        icon={<CelebrationOutlinedIcon />}
      />
      <BottomNavigationAction label="Nearby" icon={<CheckBoxOutlinedIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
