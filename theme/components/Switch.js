import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyleTrack = defineStyle((props) => {
    const { colorschemechecked: c } = props
    const { colorschemeunchecked: u } = props


    if (c !== undefined && u !== undefined) {
        return {
            bg: `${u}.300`,
            _checked: {
                bg: `${c}.400`,
            },
            _dark: {
                bg: `${u}.300`,
                _checked: {
                    bg: `${c}.400`,
                }
            },
        }
    } else {
        return {}
    }

})

const baseStyle = definePartsStyle((props) => ({
    track: baseStyleTrack(props)
}))

export const switchTheme = defineMultiStyleConfig({ baseStyle })