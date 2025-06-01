'use client';
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ModeToggle from './mode-toggle';
import Logo from './logo';
import { mainMenu } from '@/config/consts';
import NextLink from 'next/link';
import { paths } from '@/config/paths';
import { User } from '@prisma/client';
import { signOut } from "next-auth/react"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  padding: '8px 12px',
}));

 function LogOutButton(){
   return (
    <Button color="primary" variant="text" size="small" onClick={() => signOut()}>
      ログアウト
    </Button>
   )
}

function LogInButton(){
   return (
    <Button
      color="primary"
      variant="text"
      size="small"
      component={NextLink}
      href={paths.auth.login.getHref()}
    >
      ログイン
    </Button>
   )
}

function SignUpButton(){
   return (
    <Button
      color="primary"
      variant="contained"
      size="small"
      component={NextLink}
      href={paths.auth.login.getHref()}
    >
      登録
    </Button>
   )
}

export default function Header({logInUser}: { logInUser: User | undefined }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <header>
      <AppBar
        position="static"
        enableColorOnDark
        sx={{ boxShadow: 0, bgcolor: 'transparent' }}
      >
        <Container maxWidth="lg" disableGutters>
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
              <Logo />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {mainMenu.map((menu) => (
                  <Button
                    key={menu.label}
                    variant="text"
                    color="info"
                    size="small"
                    href={menu.href}
                    component={NextLink}
                  >
                    {menu.label}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              {logInUser ? <LogOutButton/> :
                <>
                  <LogInButton/>
                  <SignUpButton/>
                </>
              }
              <ModeToggle />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
              <ModeToggle size="medium" />
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    top: 'var(--template-frame-height, 0px)',
                  },
                }}
              >
                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>
                  {mainMenu.map((menu) => (
                    <MenuItem key={menu.label}>
                      <Button
                        key={menu.label}
                        variant="text"
                        color="info"
                        fullWidth
                        href={menu.href}
                        component={NextLink}
                      >
                        {menu.label}
                      </Button>
                    </MenuItem>
                  ))}

                  <Divider sx={{ my: 3 }} />
                  {logInUser ?
                    <MenuItem>
                      <LogOutButton/>
                    </MenuItem>
                  :
                    <>
                      <MenuItem>
                        <SignUpButton/>
                      </MenuItem>
                      <MenuItem>
                        <LogInButton/>
                      </MenuItem>
                    </>
                  }

                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </header>
  );
}
