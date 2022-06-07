import { Button, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Visible } from '../../../core/Visible'

export const UnitBlock = (props: any) => {
  const { onTest, name, properties, required, onTerminal } = props
  const [result, setResult] = useState('')
  const { handleSubmit, register } = useForm()

  const handleSubmitTest = (values: any) => {
    const propertyTypes = properties;
    let requestParams: any = {};
    for (const [key, value] of Object.entries(values)) {
      let resValue: any = value;
      if (propertyTypes[key].type == 'integer') {
        resValue = parseInt(resValue);
      }
      requestParams[key] = resValue
    }


    onTest(name, requestParams)
      .then((x: any) => {
        onTerminal({
          message: [x.toString()],
          success: true,
        })
        setResult(x)
      })
      .finally((y: any) => {
        onTerminal({
          message: [y.toString()],
          success: false,
        })
      })
  }

  const isRequired = (field: any) => {
    return required.includes(field)
  }
  return (
    <form noValidate onSubmit={handleSubmit(handleSubmitTest)}>
      <div className="flex flex-col gap-2 mb-5">
        <code className="font-semibold">{name}</code>
        {Object.keys(properties).map((propertyKey: any, index: any) => (
          <div className="flex flex-col" key={index}>
            <div className="grid grid-cols-3 gap-2 items-center">
              <label>{propertyKey}</label>
              <span className="col-span-2">
                <TextInput
                  {...register(propertyKey, {
                    required: isRequired(propertyKey),
                  })}
                />
              </span>
            </div>
          </div>
        ))}
        <Button type="submit" size="sm" variant="default">
          Test
        </Button>
        <Visible visible={result}>Result: {result}</Visible>
      </div>
    </form>
  )
}
