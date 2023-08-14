import {useNavigate, useOutletContext} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Switch,
    Textarea,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect} from "react";
import {useLocalStorage} from "../utils/useLocalStorage.jsx";

const NewProject = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');

    useEffect(() => {
        if (getAuth() !== true) {
            navigate("/projects");
        }
    })


    const formik = useFormik({
        initialValues: {name: "", description: "", shareable: false},
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required!")
                .min(2, "Should be at least 2 characters long!").max(64, "Name too long!"),
            description: Yup.string().max(256, "Description too long!"),
        }),
        onSubmit: (values, actions) => {
            fetch(`http://localhost:8080/api/projects/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(values)
            }).then(response => {
                if (!response.ok) {
                    toast({
                        title: 'Error!',
                        description: "Error occurred while creating the project.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    throw new Error("error");
                }
                navigate("/projects");
            }).catch(err => {
                console.log(err);
            })
        }
    });


    return (
        <>
            <VStack
                as={"form"}
                w={{base: "90%", md: "650px"}}
                mx={"auto"}
                mt={"5rem"}
                justify={"center"}
                spacing={"1rem"}
                onSubmit={formik.handleSubmit}
            >
                <Heading>
                    New Project
                </Heading>

                <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                    <FormLabel fontSize={"lg"}>Name</FormLabel>
                    <Input
                        name={"name"}
                        placeholder={"Enter project name"}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("name")}
                    />
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={formik.errors.description && formik.touched.description}>
                    <FormLabel fontSize={"lg"}>Description</FormLabel>
                    <Textarea
                        name={"description"}
                        placeholder={"Enter description..."}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("description")}
                    />
                    <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                </FormControl>

                <FormControl display='flex' alignItems='center'>
                    <FormLabel fontSize={"lg"} mb={'0'}>Shareable</FormLabel>
                    <Switch
                        id='shareable'
                        colorScheme={'teal'}
                        {...formik.getFieldProps("shareable")}
                    />
                </FormControl>


                <ButtonGroup pt={"1rem"}>
                    <Button colorScheme={"teal"} type={"submit"}>Create</Button>
                    <Button onClick={() => navigate("/projects")}>Back</Button>
                </ButtonGroup>
            </VStack>
        </>
    )
}

export default NewProject;