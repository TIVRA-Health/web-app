import { useAIConsultationAPI } from "api/consultationAPI";
import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import Chats from "../Consultation/Chat/Chat";
import "../Consultation/ChatBot/ChatBot.css";

interface ResponseBotObject {
	purpose: string;
	message: string;
	options?: string[];
	sender: string;
}
export const AIConsultation: React.FC = () => {
	const [userResponse, setUserResponse] = useState<string>("");
	const [step, setStep] = useState<number>(0);
	const [botResponse, setBotResponse] = useState<any>({
		message: "",
	});
	const [sendUserResponse, setSendUserResponse] = useState<string>("");

	const consultationMutation = useAIConsultationAPI();

	// setting next step when there's response and option click
	const setNextStep = (response: string) => {
		// setStep((prevState) => prevState + 1);
		// setSendUserResponse(response);
		// let res = analyzeNextSteps();
		// // setBotResponse({ res, sender: "bot" });
		// setUserResponse("");

		setStep((prevState) => prevState + 1);
		setSendUserResponse(response);
		setBotResponse({ message: "", sender: "" }); // Reset the bot response
		let res = analyzeNextSteps();
		setUserResponse("");
	};

	const analyzeNextSteps = () => {
		consultationMutation(
			{ userResponse },
			{
				onSuccess: (res) => {
					if (res) {
						setBotResponse({ message: res.gptResponse, sender: "bot" });
					}
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	const optionClick = (e: React.MouseEvent<HTMLElement>) => {
		let option = e.currentTarget.dataset.id;
		if (option) {
			setBotResponse(null);
			setNextStep(option);
		}
	};

	// event handlers
	const handleInputChange = (e: any) => {
		setUserResponse(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setNextStep(userResponse);
	};

	return (
		<div className="chat-container">
			<Chats
				userResponse={userResponse}
				botResponse={botResponse}
				sendUserResponse={sendUserResponse}
				optionClick={optionClick}
			/>
			<form onSubmit={(e) => handleSubmit(e)} className="form-container">
				<input onChange={(e) => handleInputChange(e)} value={userResponse}></input>
				<button>
					<i className="fa fa-paper-plane"></i>
				</button>
			</form>
		</div>
	);
};
