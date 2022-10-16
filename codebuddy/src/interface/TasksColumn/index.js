import { useState } from 'react';
import {TaskCardWide} from '../../components/TaskCard/index'

export const TaskColumn = ({
    tasksList
}) => {

	return (
        <>
            <div className="w-full flex-col gap-3">
                {
                    tasksList.length > 0 ?
                    (<div className="w-full flex-col mb-12">
                    {
                        tasksList.map((task, i) => <TaskCardWide taskData={task} key={i}/>)
                    }
                    </div>) : 
                    (
                        "No tasks Currently"
                    )
                }
            </div>
        </>
  );
}
