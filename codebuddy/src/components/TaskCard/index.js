export const TaskCardWide = ({
    taskData = {}
}) => {

	return (
        <div className="w-fullmt-1 bg-dark-200 px-4 py-2 rounded-lg">
          <div className="w-full flex text-lg dark:text-white font-bold">
            <p className="pr-1">
                {taskData.title? taskData.title : "Task Title"}
            </p>
            {"/"}
            <p className="pl-1">
                {taskData.project? taskData.project : "Project Name"}
            </p>
          </div>
          <div className="w-full flex text-sm dark:text-light-200">
            {taskData.description? taskData.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </div>
          <div className="w-full flex gap-1 mt-3">
          {/* {
            taskData.tags?.length > 0 
            ? taskData.tags.map((tag,i) => <SkillTag tagValue={tag} key={i}/>)
            : ''
          } */}
          </div>
        </div>
  );
}
