import React from 'react';
import { columns } from './table/columns';
import { Status } from '@/types/enums/status.enum';
import { DataTable } from './table/data-table';

function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      status: Status.active,
      user: { id: 1, username: "@john", isPasswordExist: true, email: null, avatar: null },
        date: new Date()
    },
    // ...
  ]
}

function TasksUpdates() {
    const data = getData()

    return (
    <div className="container py-10">
      <DataTable columns={columns} data={data} />
    </div>
    );
}

export default TasksUpdates;