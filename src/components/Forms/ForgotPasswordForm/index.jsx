import React from 'react'
import FormInput from '../../../shared/Inputs/FormInput'
import BlueButton from '../../../shared/Buttons/BlueButton'

const ForgotPasswordForm = () => {
  return (
    <>
      <section>
        <div className='container mx-auto py-[50px]'>
          <h2 className='text-2xl text-center font-bold'>Forgot Password</h2>

          <form className="py-[30px] flex flex-col items-center gap-5">
            <FormInput
              type={"email"}
              placeholder={"Email Id"}
            />
            <BlueButton title={'Send Email'} />
          </form>
        </div>
      </section>
    </>
  )
}

export default ForgotPasswordForm