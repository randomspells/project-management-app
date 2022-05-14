import React, { FC } from 'react';
import { Button, Dialog, DialogTitle, TextField, Box } from '@mui/material';

const NewTaskForm: FC = () => (
  <Dialog open={!false}>
    <DialogTitle>New task</DialogTitle>
    <Box component="form" sx={{p: 5}}>
      <TextField
        helperText=""
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoFocus
        error = {false}
      />
      <TextField
        helperText=""
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        multiline
        name="description"  
        error = {false}
      />
      <Button type='submit' fullWidth variant='contained' size='large' sx={{ mt: 2, mb: 2 }} disabled={false}>
        Create task
      </Button>
    </Box>
  </Dialog>
)

export default NewTaskForm;