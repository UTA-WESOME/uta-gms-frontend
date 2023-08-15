import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Icon,
    Input,
    Switch,
    Textarea,
    useToast,
    VStack
} from "@chakra-ui/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useLocalStorage} from "../utils/useLocalStorage.jsx";
import {BiEditAlt} from "react-icons/bi";

const EditProject = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const [hasLoaded, setHasLoaded] = useState(false);
    const [projectName, setProjectName] = useState('');
    const toast = useToast();
    const toastId = "toast-projects-edit";

    let {id} = useParams();


    useEffect(() => {
        if (getAuth() !== true) {
            navigate("/projects");
        } else {
            fetch(`http://localhost:8080/api/projects/${id}`, {
                method: "GET",
                credentials: "include"
            }).then(response => {
                if (!response.ok) {
                    if(response.status === 404) {
                        if(!toast.isActive(toastId)) {
                            toast({
                                id: toastId,
                                title: 'Error!',
                                description: "This project does not exist.",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                        }
                        navigate("/projects");
                    }
                    throw new Error("This project does not exist");
                }
                return response.json();
            }).then(data => {
                formik.setValues({
                    name: data.name,
                    description: data.description,
                    shareable: data.shareable
                });
                setProjectName(data.name);
                setHasLoaded(true);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [])


    const formik = useFormik({
        initialValues: {name: "", description: "", shareable: false},
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required!")
                .min(2, "Should be at least 2 characters long!").max(64, "Name too long!"),
            description: Yup.string().max(256, "Description too long!"),
        }),
        onSubmit: (values, actions) => {
            fetch(`http://localhost:8080/api/projects/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(values)
            }).then(response => {
                if (!response.ok) {
                    toast({
                        title: 'Error!',
                        description: "Error occurred while updating the project.",
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
            {hasLoaded &&
                <VStack
                    as={"form"}
                    w={{base: "90%", md: "800px"}}
                    mx={"auto"}
                    mt={"5rem"}
                    justify={"center"}
                    spacing={"1rem"}
                    onSubmit={formik.handleSubmit}
                >
                    <HStack>
                        <Heading>Edit</Heading>
                        <Icon as={BiEditAlt} minH={'7'} minW={'7'}/>
                    </HStack>

                    <Heading>
                        {projectName}
                    </Heading>

                    <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                        <FormLabel fontSize={"lg"}>Name</FormLabel>
                        <Input
                            name={"name"}
                            defaultValue={'project.name'}
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
                            autoComplete={"off"}
                            size={"lg"}
                            {...formik.getFieldProps("description")}
                        />
                        <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                    </FormControl>

                    <FormControl display='flex' alignItems='center'>
                        <FormLabel fontSize={"lg"} mb={'0'}>Shareable</FormLabel>
                        <Switch
                            name={'shareable'}
                            colorScheme={'teal'}
                            isChecked={formik.values.shareable}
                            {...formik.getFieldProps("shareable")}
                        />
                    </FormControl>


                    <ButtonGroup pt={"1rem"}>
                        <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                        <Button onClick={() => navigate("/projects")}>Back</Button>
                    </ButtonGroup>
                </VStack>
            }
        </>
    )
}

export default EditProject;