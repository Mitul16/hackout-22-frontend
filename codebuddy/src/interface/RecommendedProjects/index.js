import {ProjectCardSmall} from '../../components/ProjectCard/index'

export const RecommendedProjects = ({
    projectsList
}) => {

	return (
        <div className="w-full flex-col mb-1">
            <div className="w-full flex space-x-px justify-between align-center">
                <div className="text-xl dark:text-white font-semibold ">
                    Recommended Projects
                </div>
                <div className="text-sm font-medium dark:text-white hidden md:block ">
                    View All
                </div>
            </div>
            {
                projectsList.length > 0 &&
                (<div className="w-full flex-col mb-16">
                {
                    projectsList.map((project, i) => <ProjectCardSmall projectData={project} key={i}/>)
                }
                </div>)
            }
        </div>
  );
}
