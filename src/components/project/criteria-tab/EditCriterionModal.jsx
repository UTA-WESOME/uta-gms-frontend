import {
    Checkbox,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";

const EditCriterionModal = ({ isOpen, onClose, categories, criterion }) => {

    const handleCheck = (event, categoryId) => {

        let maxId = Math.max(...criterion.criterion_categories.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        if (event.target.checked) {
            criterion.criterion_categories.push({
                id: maxId + 1,
                category: categoryId,
            })
        } else {
            criterion.criterion_categories = criterion.criterion_categories.filter(cc => cc.category !== categoryId)
        }
    }


    if (criterion === undefined) {
        return (
            <></>
        )
    } else {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent mx={'15px'} pb={5}>
                    <ModalHeader>Categories for {criterion.name}</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody>
                        <Flex spacing={"15px"} direction={'column'}>
                            {categories.map((category, index) => (
                                <Checkbox
                                    key={index}
                                    my={1}
                                    color={category.color}
                                    colorScheme={'teal'}
                                    onChange={(event) => handleCheck(event, category.id)}
                                    defaultChecked={criterion.criterion_categories.some(cc => cc.category === category.id)}
                                >
                                    <Text fontWeight={'bold'}>{category.name}</Text>
                                </Checkbox>
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
}

export default EditCriterionModal;