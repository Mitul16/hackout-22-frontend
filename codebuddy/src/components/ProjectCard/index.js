import {SkillTag} from '../skillTag/index'
import {useNavigate} from "react-router-dom";

export const ProjectCardSmall = ({
    projectData={}
}) => {

	return (
        <div className="w-full py-2 mt-1 border-b border-[#30363D]">
          <div className="w-full flex text-lg dark:text-white font-bold">
            {projectData.name? projectData.name : "Name"}
          </div>
          <div className="w-full flex text-sm text-light-100 line-clamp-2">
            {projectData.description? projectData.description : "Description"}
          </div>
          <div className="w-full flex gap-1 mt-3">
          {
            projectData.tags?.length > 0 
            ? projectData.tags.map((tag,i) => <SkillTag variant={'sm'} tagValue={tag} key={i}/>)
            : ''
          }
          </div>
        </div>
  );
}

export const ProjectCardWide = ({
  projectData = {}
}) => {
  const navigate = useNavigate();

  return(
    <div onClick={() => navigate(`${projectData._id?`/project/${projectData._id}`:'/404'}`)} className="cursor-pointer">
      <div className="w-full mt-4 bg-dark-200 px-5 py-6 pb-10 rounded-lg border border-[#30363D]">
          <div className="w-full flex text-lg dark:text-white font-bold">
            <p className="pr-1">
                {projectData.name? projectData.name : "Project Title"}
            </p>
          </div>
          <div className="w-full flex text-sm dark:text-light-200 line-clamp-3">
            {projectData.description? projectData.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </div>
          <div className="w-full flex gap-1 mt-3 align-bottom">
          {
            projectData.tags?.length > 0 
            ? projectData.tags.map((tag,i) => <SkillTag tagValue={tag} key={i}/>)
            : ['NodeJS','CSS','React','NextJS'].map((tag,i) => <SkillTag variant={'sm'} tagValue={tag} key={i}/>)
          }
          </div>
        </div>
      </div>
  )
}
