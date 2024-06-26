import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import "./SideBar.scss";
import BoardWidget from "../common/BoardWidget";
import { BACKGROUD_BOARD } from "../../actions/dataBackgroud";
import { apiClient } from "../../Services"
import { alertErrors, alertSuccess, MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "../../Contains/Config";
function SideBar(props) {
	const { projectPerson } = props;
	const [active, setActive] = useState(true)

	const handleClick = () => {
		setActive(false)
	}
	console.log(projectPerson)
	const handleDeleteProject = (idProject, idUser) => {
		apiClient.fetchApiDeleteMemberProject(idProject, idUser).then(res => {
			if (res) {
				alertSuccess("Delete success.", 3000)
			} else {
				alertErrors("Delete Fail.", 3000)
			}
		})

		setTimeout(() => {


		}, 1000)
	},
}
return (
	<div className="side-bar-container">
		<div className="nav-container">
			<Link to="/"
				onClick={handleClick}
			>
				<div className={`content-wrapper ${active === true ? 'active' : null}`}>
					<span>
						<FontAwesomeIcon icon="fa-brands fa-trello" />
					</span>
					<span>Boards</span>
				</div>
			</Link>
			<Link to="/workspace"
				onClick={handleClick}

			>
				<div className={`content-wrapper ${active === false ? 'active' : null}`}>
					<span>
						<FontAwesomeIcon icon="fa-solid fa-bolt" />
					</span>
					<span>Home</span>
				</div>
			</Link>
			<div className="work-space-container">
				<p>Workspaces</p>
				<Link to="" className="icon-plus">
					<FontAwesomeIcon icon="fa-solid fa-plus" />
				</Link>
			</div>
			{
				projectPerson.length > 0 && projectPerson.map((i, _i) => (
					<BoardWidget
						key={i.id}
						id={i.id}
						title={i.name}
						avt={BACKGROUD_BOARD[i.background]}
						largeWidget={true}
					/>
				))
			}

		</div>
	</div>
);
}

export default SideBar;
