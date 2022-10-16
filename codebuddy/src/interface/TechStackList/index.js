import {SkillTag} from '../../components/skillTag/index'

export const TechStackList = ({
    tagList=[]
}) => {

	return (
        <div className="w-full flex-col mb-1">
            <div className="w-full flex space-x-px justify-between align-center">
                <div className="text-xl dark:text-white font-semibold ">
                    Tech Stack
                </div>
            </div>
            {
                tagList.length > 0 &&
                (<div className="w-full flex gap-2 mb-10 mt-4">
                {
                    tagList.map((tag, i) => <SkillTag tagValue={tag} variant={'sm'} key={i}/>)
                }
                </div>)
            }
        </div>
  );
}
