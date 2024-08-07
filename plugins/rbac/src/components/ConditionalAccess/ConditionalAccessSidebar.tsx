import React from 'react';

import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { ConditionsForm } from './ConditionsForm';
import { ConditionsData, RulesData } from './types';

const useDrawerStyles = makeStyles(() => ({
  paper: {
    ['@media (max-width: 960px)']: {
      width: '-webkit-fill-available',
    },
    width: '50vw',
    height: '100vh',
    gap: '3%',
    display: '-webkit-inline-box',
  },
}));

const useDrawerContentStyles = makeStyles(theme => ({
  sidebar: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: theme.spacing(2.5),
    fontFamily: theme.typography.fontFamily,
  },
  headerSubtitle: {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    paddingTop: theme.spacing(1),
  },
}));

type ConditionalAccessSidebarProps = {
  open: boolean;
  onClose: () => void;
  onSave: (conditions?: ConditionsData) => void;
  selPluginResourceType: string;
  conditionRulesData?: RulesData;
  conditionsFormVal?: ConditionsData;
};

export const ConditionalAccessSidebar = ({
  open,
  onClose,
  onSave,
  selPluginResourceType,
  conditionRulesData,
  conditionsFormVal,
}: ConditionalAccessSidebarProps) => {
  const classes = useDrawerStyles();
  const contentClasses = useDrawerContentStyles();
  return (
    <Drawer
      anchor="right"
      open={open}
      data-testid="rules-sidebar"
      classes={{
        paper: classes.paper,
      }}
    >
      <Box className={contentClasses.sidebar}>
        <Box className={contentClasses.header}>
          <Typography variant="h5">
            <span style={{ fontWeight: '500' }}>Configure access for the</span>{' '}
            {selPluginResourceType}
            <Typography
              variant="body2"
              className={contentClasses.headerSubtitle}
              align="left"
            >
              By default, the selected resource type will be visible to the
              chosen users in step two. If you want to restrict or grant
              permission to specific plugin resource type rule, select it and
              add the required parameters.
            </Typography>
          </Typography>
          <IconButton
            key="dismiss"
            title="Close the drawer"
            onClick={onClose}
            color="inherit"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <ConditionsForm
          conditionRulesData={conditionRulesData}
          selPluginResourceType={selPluginResourceType}
          conditionsFormVal={conditionsFormVal}
          onClose={onClose}
          onSave={onSave}
        />
      </Box>
    </Drawer>
  );
};
