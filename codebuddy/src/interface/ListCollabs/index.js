import {UserTag} from '../../components/userTag/index'

export const ListCollabs = ({
    list=[],
    title
}) => {

	return (
        <div className="w-full flex-col mb-1">
            <div className="w-full flex space-x-px justify-between align-center">
                <div className="text-xl dark:text-white font-semibold ">
                    {`${title}`}
                </div>
            </div>
            {
                list.length > 0 &&
                (<div className="w-full flex gap-2 mb-16 mt-4">
                {
                    list.map((user, i) => <UserTag tagValue={user} key={i}/>)
                }
                </div>)
            }
        </div>
  );
}
