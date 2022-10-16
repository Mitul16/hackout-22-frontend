import ProfileAvatar from "../../assets/images/ProfileAvatar.png"

export const UserTag = ({
    tagValue={}
}) => {
	return (
        <div className={`px-4 flex gap-3 py-1 text-base text-white`}>
            <div className="rounded-full w-4">
                <img src={tagValue.image? tagValue.image : ProfileAvatar} className="rounded-full" alt="" srcset=""/>
            </div>
            <div className="">
                {`${tagValue.name?tagValue.name:"Name"}`}
            </div>
        </div>
  );
}