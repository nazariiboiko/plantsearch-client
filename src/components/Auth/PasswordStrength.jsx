import './ModalForm.css';
function PasswordStrength(props){
    const strengthChecker = () => {      
      	let strengthValue = 0;
      	let regexList = ["[A-Z]", "[a-z]", "[0-9]", /\W/];
      	let strengthText = ["", "unacceptable", "weak", "average", "good", "strong"];
        let strengthLabel = ["", "Недопустимий", "Слабкий", "Середній", "Добрий", "Сильний"];
	
      	regexList.forEach((regex) => {
        	if (new RegExp(regex).test(props.password)) {
          		strengthValue += 1;
        	}
      	});
      	if(props.password.length >=8){
        	strengthValue += 1;
      	}
		props.strengthValue(strengthValue);
      	return { text: strengthText[strengthValue], value: strengthValue, label: strengthLabel[strengthValue] }
    };
    return <div > 
        <progress
            className={`pwd-checker-bar strength-${strengthChecker().text}`}
            value={strengthChecker().value}
            max="5"
          /> {strengthChecker().label}
      </div>;
}
export default PasswordStrength;