"use client"
import NextLink from 'next/link';
import { paths } from '@/config/paths';
import * as React from 'react';
import {Button} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar(){
  return (
    <div>
      <div>
        <Button component={NextLink} href={paths.my.getHref()}>
          <PersonIcon/>
          Posts
        </Button>
        <Button component={NextLink} href={paths.my.settings.getHref()}>
         <SettingsIcon/>
          Settings
        </Button>
      </div>
    </div>
  )
}