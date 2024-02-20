import { Alert, Button, Container } from "@mui/material";
import { useSnackbar } from "../../context/SnackbarContext";

const Profile = () => {

    const {handleClick} = useSnackbar();

    const handleButtonClick = () => {
        handleClick('success', 'Yay');
    };


    return(
        <Container>
        <Button
        variant="outlined"
        onClick={handleButtonClick}>
            Debug
        </Button>
        <Alert severity="error">error</Alert>
        </Container>
        
    );
}

export default Profile;