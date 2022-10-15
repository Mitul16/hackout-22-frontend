import {ProjectCardSmall} from '../../components/ProjectCard/index'

export const PastProjects = ({
    projectsList
}) => {

	return (
        <div className="w-full flex-col">
            <div className="w-full flex space-x-px justify-between align-center">
                <div className="text-xl dark:text-white font-semibold ">
                    Past Projects
                </div>
            </div>
            {
                projectsList.length > 0 &&
                (<div className="w-full flex-col mb-12">
                {
                    projectsList.map((project, i) => <ProjectCardSmall projectData={project} key={i}/>)
                }
                </div>)
            }
        </div>
  );
}
