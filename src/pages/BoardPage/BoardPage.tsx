import { Box, Button, Container, IconButton } from '@mui/material';
import React, { FC } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import TaskList from '../../components/TaskList/TaskList';
import { FAKE_TASKS } from '../../constants';
import { ColumnInterface } from '../../interfaces';

const FAKE_COLUMNS: ColumnInterface[] = [
  { id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f', title: 'Project', order: 1, tasks: FAKE_TASKS },
  { id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f', title: 'In progress', order: 2, tasks: FAKE_TASKS.slice(0, 2) },
  { id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f', title: 'Done', order: 3, tasks: [] },
];

const BoardPage: FC = () => (
  <Container maxWidth='xl' sx={{ height: '100%' }}>
    <Box sx={{ display: 'flex', columnGap: 4 }}>
      <IconButton color='primary'>
        <ArrowBackRoundedIcon />
      </IconButton>
      <Button>Add task list</Button>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', columnGap: 3, my: 1 }}>
      {FAKE_COLUMNS.map((column) => {
        const { id, title, tasks } = column;
        return <TaskList key={id} title={title} tasks={tasks} />;
      })}
    </Box>
  </Container>
);

export default BoardPage;
