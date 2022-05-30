import React from 'react';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { SxProps } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { InputInterface, WelcomeInfoInterface } from '../interfaces';

const ICON_STYLE: SxProps = {
  mr: 1,
  fontSize: '40px',
  color: 'secondary.light',
};

export const WELCOME_INFO: WelcomeInfoInterface[] = [
  {
    id: 1,
    title: <FormattedMessage id='team' />,
    description: <FormattedMessage id='team_desc' />,
    icon: <GroupsRoundedIcon sx={ICON_STYLE} />,
  },
  {
    id: 2,
    title: <FormattedMessage id='project' />,
    description: <FormattedMessage id='project_desc' />,
    icon: <SchemaRoundedIcon sx={ICON_STYLE} />,
  },
  {
    id: 3,
    title: <FormattedMessage id='course' />,
    description: <FormattedMessage id='course_desc' />,
    icon: <SchoolRoundedIcon sx={ICON_STYLE} />,
  },
];

export const DESCRIPTION_INPUT: InputInterface = {
  type: 'text',
  name: 'description',
  label: 'Task description',
  errorText: 'Description is required',
  rules: { required: true },
};

export const TITLE_INPUT: InputInterface = {
  type: 'text',
  name: 'title',
  label: 'Task title',
  errorText: 'Title is required',
  rules: { required: true },
};

export const VALID_NAME_INPUT = /^[A-zА-я]{3,}$/;
export const VALID_LOGIN_INPUT = /^[A-z]{3,}$/;
export const VALID_PASSWORD_INPUT = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

export const COLUMN_WIDTH = 270;
