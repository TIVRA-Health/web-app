import { appLinks, dashboardLinks } from "main";
import Dashboard1 from "../../assets/images/dasboard.png";
import "../../css/Overview.css";

import { useNavigate } from "react-router-dom";

interface IEmptyProps {
    name: string;
}
export const EmptyDashboardCard: React.FC<IEmptyProps> = ({ name: name }) => {
    const navigate = useNavigate();
    return (
        <div className="overlap">
            <div className="content">
                <img className="no-data-found" alt="No data found" src={Dashboard1} />
                <p className="it-seems-like-you">
                    It seems like you have not
                    <br />
                    set any device to track your {name}  parameters.
                </p>
                <div className="go-to-CD-button" onClick={() => {
                    navigate(`${appLinks.dashboard}/${dashboardLinks.configureDashboard}`);
                }}>
                    <div className="overlap-group">
                        <div className="text-wrapper-9"  >Go to Configure Dashboard</div>
                    </div>
                </div>
            </div>
        </div>
    );
}