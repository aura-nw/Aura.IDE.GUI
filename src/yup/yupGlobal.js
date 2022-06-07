import * as yup from 'yup'

const REGEX_FILENAME = /[^\\\/:*?"<>|\r\n]+$/

yup.addMethod(yup.string, 'fileName', function (
    message,
) {
    return this.matches(REGEX_FILENAME, {
        message,
        excludeEmptyString: true,
    })
})

export default yup