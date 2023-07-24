import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {email: "", username: "", password: "", passwordConfirmation: ""},
        validationSchema: Yup.object({
            email: Yup.string().required("Email required!").email("Email should be valid!"),
            username: Yup.string().required("Username is required!")
                .min(2, "Username too short!").max(28, "Username too long!"),
            password: Yup.string().required("Password required!")
                .min(6, "Password too short!").max(28, "Password too long!"),
            passwordConfirmation: Yup.string().required("Password confirmation required!")
                .oneOf([Yup.ref('password')], "Passwords must match!")
        }),
        onSubmit: (values, actions) => {
            fetch(`http://localhost:8080/api/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name": values.username,
                    "email": values.email,
                    "password": values.password,
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    navigate("/signin");
                })
                .catch(err => {
                    // TODO
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
                    Sign Up
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

                <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                    <FormLabel fontSize={"lg"}>Username</FormLabel>
                    <Input
                        name={"username"}
                        placeholder={"Enter username"}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("username")}
                        />
                    <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
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

                <FormControl isInvalid={formik.errors.passwordConfirmation && formik.touched.passwordConfirmation}>
                    <FormLabel fontSize={"lg"}>Password Confirmation</FormLabel>
                    <Input
                        name={"passwordConfirmation"}
                        type={"password"}
                        placeholder={"Confirm password"}
                        autoComplete={"off"}
                        size={"lg"}
                        {...formik.getFieldProps("passwordConfirmation")}
                    />
                    <FormErrorMessage>{formik.errors.passwordConfirmation}</FormErrorMessage>
                </FormControl>

                <ButtonGroup pt={"1rem"}>
                    <Button colorScheme={"teal"} type={"submit"}>Sign Up</Button>
                    <Button onClick={() => navigate("/")}>Back</Button>
                </ButtonGroup>
            </VStack>
        </>
    )
}

export default SignUp;