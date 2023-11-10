import {
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid
} from "@chakra-ui/react";
import { MdColorLens } from "react-icons/md";

const colors = [
    "teal.500",
    "red.500",
    "green.500",
    "blue.500",
    "tomato",
    "yellow.500",
    "orange.700",
    "purple.500",
    "pink.500",
    "teal.400"
];

const ColorPicker = ({pickedColor, pickFunction }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    aria-label={'color-button'}
                    color={'white'}
                    bgColor={pickedColor}
                    _hover={{ bgColor: pickedColor }}
                    icon={<MdColorLens/>}
                />
            </PopoverTrigger>
            <PopoverContent width={'170px'}>
                <PopoverArrow bg={pickedColor}/>
                <PopoverCloseButton color={'white'}/>
                <PopoverHeader
                    height="35px"
                    backgroundColor={pickedColor}
                    borderTopLeftRadius={5}
                    borderTopRightRadius={5}
                    color="white"
                />
                <PopoverBody my={1}>
                    <SimpleGrid columns={5} spacing={2}>
                        <>
                            {colors.map((c) => (
                                <Button
                                    key={c}
                                    aria-label={c}
                                    background={c}
                                    height="22px"
                                    width="22px"
                                    padding={0}
                                    minWidth="unset"
                                    borderRadius={3}
                                    _hover={{ background: c }}
                                    onClick={() => pickFunction(c)}
                                />
                            ))}
                        </>
                    </SimpleGrid>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ColorPicker;