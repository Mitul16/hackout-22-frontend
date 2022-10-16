import {ProjectCardSmall} from '../../components/ProjectCard/index'

export const RecommendedProjects = ({
    projectsList=[]
}) => {

	return (
        <div className="w-full flex-col mb-1">
            <div className="w-full flex space-x-px justify-between align-center">
                <div className="text-xl text-white font-semibold ">
                    Recommended Projects
                </div>
                {
                    (projectsList.length>3) &&
                    <div className="text-sm font-medium dark:text-white hidden md:block ">
                        View All
                    </div>
                }
            </div>
            {
                projectsList.length > 0 ?
                (<div className="w-full flex-col">
                {
                    projectsList.map((project, i) => <ProjectCardSmall projectData={project[1]} key={i}/>)
                }
                </div>) :
                (<div className="w-full flex-col text-[#A6A7AB] text-sm flex items-center pt-4"><p>No Projects Recommended Projects </p> </div>)
            }
        </div>
  );
}
