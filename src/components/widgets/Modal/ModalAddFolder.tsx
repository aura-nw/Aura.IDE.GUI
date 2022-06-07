import { Button, Modal, TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'

const ModalAddFolder = (props: any) => {
  const { opened, onSave, onDiscard } = props

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <Modal opened={opened} onClose={onDiscard} title="Add new folder" size="xs">
      <form onSubmit={handleSubmit(onSave)} noValidate>
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <TextInput {...register('name')} />
          </div>
          <Button
            type="submit"
            radius={'lg'}
            size="xs"
            color="blue"
            variant="default"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ModalAddFolder
