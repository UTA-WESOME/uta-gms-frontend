import {
    Button,
    IconButton,
    useToast,
} from '@chakra-ui/react';
import { BiDownload } from "react-icons/bi";



const ExportButton = (props) => {
    const toast = useToast();
    const toastId = "toast-import";

    function downloadCsv() {
        fetch(`http://localhost:8080/api/projects/${props.projectId}/export_csv/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                link.download = 'data.csv';

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error while downloading CSV:', error);
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Error!',
                        description: `${error}`,
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    });
                }
            });
    }

    return (
        <>
            {props.desktop
                ? <Button
                    mt={props.margTop}
                    mb={props.margBottom}
                    ml={props.margLeft}
                    mr={props.margRight}
                    colorScheme={'teal'}
                    leftIcon={<BiDownload />}
                    onClick={downloadCsv} >
                    Export to file
                </Button>
                : <IconButton
                    aria-label={'Export to file'}
                    colorScheme={'teal'}
                    icon={<BiDownload />}
                    onClick={downloadCsv} >
                </IconButton>}

        </>
    )
};
export default ExportButton;
