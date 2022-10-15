import {SkillTag} from '../skillTag/index'

export const ProjectCardWide = ({
    projectData={},
}) => {
    return(
        <div className="w-full mt-4 bg-dark-200 px-5 py-3 rounded-lg border-solid -b border-[#30363D]">
            <div className="w-full flex text-lg dark:text-white font-bold">
              <p className="pr-1">
                  {projectData.title? projectData.title : "Project Title"}
              </p>
            </div>
            <div className="w-full flex text-sm dark:text-light-200">
              {projectData.description? projectData.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </div>
            <div className="w-full flex gap-1 mt-3">
            {
              projectData.tags?.length > 0 
              ? projectData.tags.map((tag,i) => <SkillTag tagValue={tag} key={i}/>)
              : ['NodeJS','CSS','React','NextJS'].map((tag,i) => <SkillTag variant={'sm'} tagValue={tag} key={i}/>)
            }
            </div>
          </div>
      )
}
