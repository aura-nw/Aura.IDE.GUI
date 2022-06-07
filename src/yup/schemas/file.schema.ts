import yup from '../yupGlobal'

export const fileNameSchema = yup.object().shape({
  name: (yup.string() as any).required('Required').fileName(),
})
