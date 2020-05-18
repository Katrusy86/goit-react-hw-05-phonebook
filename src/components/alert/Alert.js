import React from "react";
import alert from './alertMessage.module.css'



const Alert = () => ( 
<div className={alert.alert}>
	<h2 className={alert.alert_title}>Fields must be filled out
<span role="img" arial-label="emoji">
😏
</span>
</h2>
</div>
)

export default Alert;
