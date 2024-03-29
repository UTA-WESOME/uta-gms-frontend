import {Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate, useOutletContext} from "react-router-dom";
import {useLocalStorage} from "../utils/useLocalStorage.jsx";

const SignIn = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const {toggleRefresh} = useOutletContext();

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        validationSchema: Yup.object({
            email: Yup.string().required("Email required!").email("Email should be valid!"),
            password: Yup.string().required("Password required!")
                .min(6, "Password too short!").max(28, "Password too long!"),
        }),
        onSubmit: (values, actions) => {
            fetch(`${import.meta.env.VITE_BACKEND}/api/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(values)
            })
                .then((response) => {
                    if(!response.ok) {
                        return response.json().then((data) => {
                            if(data.detail.includes('User')){
                                actions.setFieldError("email", data.detail);
                            }
                            if(data.detail.includes('password')) {
                                actions.setFieldError("password", data.detail);
                            }
                            throw new Error("wrong credentials");
                        })
                    }
                    return response.json()
                })
                .then((data) => {
                    setAuth(true);
                    toggleRefresh(true);
                    navigate("/projects");
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });

    return (
        <>
            <VStack
                as={"form"}
                w={{base: "90%", md: "500px"}}
                mx={"auto"}
                mt={"5rem"}
                justify={"center"}
                spacing={"1rem"}
                onSubmit={formik.handleSubmit}
            >
                <Heading>
                    Sign In
                </Heading>

                <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                    <FormLabel fontSize={"lg"}>Email</FormLabel>
                    <Input
                        name={"email"}
                        placeholder={"Enter email"}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("email")}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                    <FormLabel fontSize={"lg"}>Password</FormLabel>
                    <Input
                        name={"password"}
                        type={"password"}
                        placeholder={"Enter password"}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("password")}
                    />
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>


                <ButtonGroup pt={"1rem"}>
                    <Button colorScheme={"teal"} type={"submit"}>Log In</Button>
                    <Button onClick={() => navigate("/")}>Back</Button>
                </ButtonGroup>
            </VStack>
        </>
    )
}

export default SignIn;