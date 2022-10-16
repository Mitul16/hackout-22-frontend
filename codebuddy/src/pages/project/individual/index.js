import React, { useEffect, useState } from "react";
import { Radio } from "antd";
// import {get} from "../../../utils/API/index";
import toast from "react-hot-toast";
import {useLocation,useNavigate} from "react-router-dom";

import {TechStackList} from '../../../interface/TechStackList/index'
import {ListCollabs} from '../../../interface/ListCollabs/index'
import {TaskColumn} from '../../../interface/TasksColumn/index'
import {NavLinkBtn} from '../../../interface/NavLinks/index'
import {ConfirmModal} from '../../../interface/confirmModal/index'
import { FiUserPlus } from "react-icons/fi";


const ModalForm = ({value,setValue}) => {
	
	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};

	return(
		<div className="pl-11">
			<div className="text-white text-lg font-medium">Submit your Profile as?</div>
			<Radio.Group onChange={onChange} value={value} className="flex text-[#A6A7AB] text-md">
				<Radio value={'Mentor'}><p className="text-[#A6A7AB] text-base">Mentor</p></Radio>
				<Radio value={'Developer'}><p className="text-[#A6A7AB] text-base">Developer</p></Radio>
			</Radio.Group>
		</div>
	)
}

const ProjectIndividual = () =>{
	const navigate = useNavigate();
	const { state } = useLocation();

	const [projectData, setProjectData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [role, setRole] = useState('Mentor');
	
	const joinProject = () => {

	}

	const getDashboardData = async e => {
		// const data = await get("profile/user_dashboard")
		// setDashboardData(data);
		// console.log(data);
		// toast.success("Dashboard details fetched Successfully!");
	};
	useEffect(() => {
		getDashboardData();
	}, []);

	return (
		<>
		<ConfirmModal 
			visible={showConfirmModal}
			setVisible={setShowConfirmModal}
			ModalTitle={'You\'re about to Submit your Profile!'}
			ModalForm={<ModalForm value={role} setValue={setRole}/>}
			onClick={joinProject}
		/>
		<div className="flex gap-6 flex-row px-8 py-12 pr-24">
		<div className="w-full">
			<h3 className="text-2xl font-bold text-white">
			Project
			</h3>
			<div className="flex flex-col w-full">
				<div className="flex flex-row w-full justify-between align-center">
					<div className="flex flex-col w-4/5 mt-6">
							<div className="text-2xl font-bold text-white">
								Project Title
							</div>
						<div className="text-base text-[#A6A7AB] self-center mt-2">
							{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
						</div>
					</div>
					<div className="h-[min-content] mt-2">
						<NavLinkBtn
							icon={<FiUserPlus />}
							title={"Join Project"}
							standAlone={true}
							isSelected={false}
							onClick={()=>{setShowConfirmModal(true)}}
						/>
					</div>
			</div>
			<div className="flex flex-col w-full mt-10">
				<div className="text-2xl font-bold text-white">
					Tasks
				</div>
				<TaskColumn
					tasksList={
					projectData.projects
						? projectData.tasks
						: [
							{
							title: "title",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
							tags: ["NodeJS", "CSS"],
							completeionAmt: 0.65,
							},
							{
							title: "Hackout",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
							tags: ["NodeJS", "CSS", "React.JS", "Flutter"],
							},
						]
					}
				/>
			</div>
			</div>
		</div>
		<div className="flex flex-col w-1/2 mt-20 gap-12">
			<TechStackList tagList={projectData.tags?projectData.tags : ["NodeJS", "CSS", "React.JS", "Flutter"]} />
			<ListCollabs title={'Mentors'} list={projectData.mentors? projectData.mentors : []} />
			<ListCollabs title={'Developers'} list={projectData.developers? projectData.developers : []} />
		</div>
		</div>
	</>
  );
}

export default ProjectIndividual;
