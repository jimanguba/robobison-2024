'use client';
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Box,
  Fab,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LogOutButton from "../authentication/log-out/logoutButton";
import React, { useState, useEffect } from "react";

import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});


const Sidebar = () => {
  // State to control drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Ensure proper client-side rendering without hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Toggle function for opening/closing the drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Floating Button to open Drawer */}
      <Fab
        color="primary"
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: 20,
          left: isDrawerOpen ? 300 : 20,
          backgroundColor: '#8b6f47',
          '&:hover': {
            backgroundColor: '#a07855',
          },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transform: isDrawerOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <MenuIcon />
      </Fab>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "#f9f5f0",
            padding: "20px",
            transition: 'width 0.3s ease-in-out',
          },
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', mb: 2, transition: 'all 0.3s ease-in-out' }}
          className={geistSans.variable} // Applying the custom font
        >
          <HomeIcon sx={{ mr: 1, color: "#8b6f47" }} />
          <Typography
            variant="h5"
            component={Link}
            href="/"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 'bold', fontFamily: 'inherit' }}
          >
            Pet App
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, backgroundColor: '#d4a373' }} />
        <List className={geistSans.variable}>
          <ListItem component={Link} button="true" href="/" onClick={toggleDrawer}>
            <HomeIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          <ListItem component={Link} button="true" href="/cats" onClick={toggleDrawer}>
            <PetsIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="Cat Page"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          <ListItem component={Link} button="true" href="/cats/list" onClick={toggleDrawer}>
            <PetsIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="List of Cats"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          <ListItem component={Link} button="true" href="/cats/add" onClick={toggleDrawer}>
            <NoteAddIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="Add a Cat"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          {/* <ListItem component={Link} button="true" href="/cats/view" onClick={toggleDrawer}>
            <PetsIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="View Individual Cat"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem> */}
          <ListItem component={Link} button="true" href="/journal/list" onClick={toggleDrawer}>
            <NoteAddIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="List of Journal Entries"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          <ListItem component={Link} button="true" href="/journal/add" onClick={toggleDrawer}>
            <NoteAddIcon sx={{ mr: 2, color: "#6b4226" }} />
            <ListItemText
              primary="Add a Journal Entry"
              primaryTypographyProps={{ fontSize: '1.2rem', fontFamily: 'inherit', color: '#6b4226' }}
            />
          </ListItem>
          <Divider sx={{ mt: 2, mb: 2, backgroundColor: '#d4a373' }} />
          <ListItem>
            <LogOutButton />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
