import {SkillTag} from '../skillTag/index'

export const ProjectCardSmall = ({
    projectData
}) => {

	return (
        <div className="w-full py-2 mt-1">
          <div className="w-full flex text-lg dark:text-white font-bold">
            {projectData.title? projectData.title : "Title"}
          </div>
          <div className="w-full flex text-sm dark:text-light-100">
            {projectData.description? projectData.description : "Description"}
          </div>
          <div className="w-full flex gap-1 mt-3">
          {
            projectData.tags?.length > 0 
            ? projectData.tags.map((tag,i) => <SkillTag tagValue={tag} key={i}/>)
            : ''
          }
          </div>
          <p className="w-full rounded-full bg-light-100 mt-3" style={{height: '2px' , opacity: '0.2'}}></p>
        </div>
  );
}
