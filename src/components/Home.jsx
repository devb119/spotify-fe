import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MailIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const drawerWidth = 245;
const listItems = [
  {
    title: "Trang chủ",
    icon: <FontAwesomeIcon className="h-5" icon={faHouse} />,
  },
  {
    title: "Tìm kiếm",
    icon: <FontAwesomeIcon className="h-5" icon={faMagnifyingGlass} />,
  },
  {
    title: "Thư viện",
    icon: <FontAwesomeIcon className="h-5" icon={faHouse} />,
  },
  {},

  {
    title: "Tạo playlist",
    icon: <FontAwesomeIcon className="h-5" icon={faHouse} />,
  },
  {
    title: "Bài hát đã thích",
    icon: <FontAwesomeIcon className="h-5" icon={faMagnifyingGlass} />,
  },
];

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="bg-black h-20">
          <NavLink to="/" className="bg-black h-20 w-full">
            <img src={Logo} alt="Logo" className="w-32 p-30 mt-6 ml-6" />
          </NavLink>
        </div>
        <List className="bg-black">
          {listItems.map((item, index) => {
            if (index === 3) return <div className="bg-black mt-4 " />;
            else
              return (
                <ListItem
                  key={index}
                  className="text-gray-400 hover:text-white  ml-2 p-2 "
                >
                  {item.icon}
                  <ListItemText
                    primary={item.title}
                    className="ml-4 font-extrabold text-xs"
                  />
                </ListItem>
              );
          })}
        </List>
        <div className="bg-black">
          <hr className="border-t-1 border-gray-700 w-48 ml-6"></hr>
        </div>

        <List className="bg-black"></List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar className="bg-black" />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
