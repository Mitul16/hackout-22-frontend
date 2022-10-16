export const SkillTag = ({
    tagValue,
    variant
}) => {
	return (
        <div className={`px-4 py-1 rounded-full text-${variant} bg-dark-100 text-white`}>
            {tagValue}
        </div>
  );
}