import React from 'react';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { SxProps } from '@mui/material';
import {
  BoardsGetInterface,
  ColumnInterface,
  InputInterface,
  TaskInterface,
  WelcomeInfoInterface,
} from '../interfaces';

const ICON_STYLE: SxProps = {
  mr: 1,
  fontSize: '40px',
  color: 'secondary.light',
};

export const WELCOME_INFO: WelcomeInfoInterface[] = [
  {
    title: 'Team',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <GroupsRoundedIcon sx={ICON_STYLE} />,
  },
  {
    title: 'Project',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <SchemaRoundedIcon sx={ICON_STYLE} />,
  },
  {
    title: 'Course',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <SchoolRoundedIcon sx={ICON_STYLE} />,
  },
];

export const FAKE_TASKS: TaskInterface[] = [
  {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    title: 'Task 1',
    order: 1,
    description: 'Domestic cat needs to be stroked gently',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    done: true,
    files: [],
  },
  {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde4',
    title: 'Task 2',
    order: 2,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. More words... And more...',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    done: true,
    files: [],
  },
  {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde5',
    title: 'Task 3',
    order: 3,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    done: false,
    files: [],
  },
  {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde6',
    title: 'Task 4',
    order: 4,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    done: false,
    files: [],
  },
  {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde7',
    title: 'Task 5',
    order: 5,
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    done: false,
    files: [],
  },
];

export const FAKE_BOARDS: BoardsGetInterface[] = [
  {
    id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
    title: 'Homework tasks',
    description: 'Some description',
  },
  {
    id: '9a111e19-24ec-43e1-b8c4-13776842b8d6',
    title: 'Work tasks',
    description: 'Some description',
  },
];

export const FAKE_COLUMNS: ColumnInterface[] = [
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4d',
    title: 'Project',
    order: 1,
    tasks: FAKE_TASKS,
  },
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
    title: 'In progress',
    order: 2,
    tasks: FAKE_TASKS.slice(0, 2),
  },
  {
    id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4e',
    title: 'Done',
    order: 3,
    tasks: [],
  },
];

export const TITLE_INPUT: InputInterface = {
  type: 'text',
  name: 'title',
  label: 'Task title',
  errorText: 'Title is required',
  rules: { required: true },
};

export const DESCRIPTION_INPUT: InputInterface = {
  type: 'text',
  name: 'description',
  label: 'Task description',
  errorText: 'Description is required',
  rules: { required: true },
};

export const VALID_TEXT_INPUT = /^[A-z]{3,}$/;
export const VALID_PASSWORD_INPUT = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

export const COLUMN_WIDTH = 270;
