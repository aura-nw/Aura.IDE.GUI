import { TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoIosAirplane } from 'react-icons/io'
import { connect } from 'react-redux'
import * as actions from '../../../actions/tree.actions'

const Terminal = (props: any) => {
  const { terminalLogs, addTerminalLog } = props
  const { register, handleSubmit, reset } = useForm()

  const onSendRequest = (data: any) => {
    // if success
    addTerminalLog({
      message: [data.commandLine],
      success: true,
    })
    reset({
      commandLine: '',
    })
  }

  return (
    <div className="h-1/3 overflow-auto bg-black flex flex-col justify-between">
      <div className="bg-black px-8 pt-5 text-xs leading-5 text-white flex-grow">
        <p>AURA TERMINAL V0.1</p>
        <p>Check transactions details and start debugging</p>
        <ul>
          Execute JavaScript scripts:
          <li>- Input a script directly in the command line interface</li>
          <li>
            - Right click on a JavaScript file in the file explorer and then
            click \`Run\`
          </li>
        </ul>
        {console.log('terminalLogs', terminalLogs)}

        {terminalLogs &&
          terminalLogs.map((x: any, idx: any) => (
            <div key={idx}>
              {x?.message &&
                x.message.map((y: any, idy: any) => (
                  <p key={idy} className="font-semibold"> 
                    {y}
                  </p>
                ))}
              <div>
                {x.success ? (
                  <p className="text-green-600 font-bold">SUCCESS!</p>
                ) : (
                  <p className="text-red-600 font-bold">FAILED</p>
                )}
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit(onSendRequest)}>
        <TextInput
          {...register('commandLine')}
          icon={<IoIosAirplane className="text-blue-50" />}
          className="text-white"
          size="xs"
          variant="unstyled"
          radius={0}
          classNames={{
            input: 'text-white font-semibold',
          }}
        />
        <button type="submit" className="hidden" />
      </form>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  ...state,
})

export default connect(mapStateToProps, actions)(Terminal)
