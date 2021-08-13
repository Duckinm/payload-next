import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { fetcher } from 'src/utilities/fetcher'
import useSWR from 'swr'

interface IFormInput {
  mail: string
  tel: number
  message: string
  source: 'Contact'
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, isSubmitting, touchedFields, errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    const result = await response.json()
    if (result.status >= 400) {
      toast.error('Failed, due to internet connection.')
    }

    toast.success('Thanks! We will looking forward.')
  }

  useEffect(() => {
    if (isSubmitted) {
      reset({ message: '', mail: '', tel: undefined })
    }
  }, [isSubmitted, reset])

  return (
    <form
      id="contactForm"
      className="flex flex-col items-center w-full space-y-1 md:w-1/2"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="message" hidden></label>
      <textarea
        placeholder="Details"
        className={` mb-1
          ${
            touchedFields && errors && errors.message?.type === 'required'
              ? 'error'
              : ''
          }`}
        {...register('message', { required: true, maxLength: 200 })}
      />
      <label htmlFor="mail" hidden></label>
      <input
        type="text"
        placeholder="Email"
        className={
          touchedFields && errors && errors.mail?.type === 'required'
            ? 'error'
            : ''
        }
        {...register('mail', {
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        })}
      />
      {touchedFields && errors && (
        <span role="alert" className="error-info">
          {errors.mail?.type === 'pattern' && 'Invalid email format'}
        </span>
      )}
      <label htmlFor="tel" hidden></label>
      <input
        type="number"
        placeholder="Phone"
        className={
          touchedFields && errors && errors.tel?.type === 'required'
            ? 'error'
            : ''
        }
        {...register('tel', { required: true })}
      />
      <button type="submit" disabled={isSubmitting} className="">
        Send Information
      </button>
    </form>
  )
}

export const ContactSection = () => {
  const { locale } = useRouter()
  const { data } = useSWR(`/api/globals/settings?locale=${locale}`, fetcher)

  // console.log(/^(?:\s|<br *\/?>)*$/.test(data?.contactInfo?.desc))

  return (
    <section id="submission" className="container my-20 lg:my-40 lg:max-w-4xl">
      <div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
        <div className="w-full text-center md:w-1/2">
          <h3 className="font-cera tracking-[-4%] text-4xl lg:text-5xl text-primary mb-8">
            {data?.contactInfo?.title
              ? data.contactInfo.title
              : 'Contact Request'}
          </h3>
          <p className="text-paragraph text-tertiary">
            {data?.contactInfo?.desc
              ? data.contactInfo.desc
              : `Are you dreaming about a new home? Ask for a free valuation. The valuation is free of charge and has
            non-obligations. Start by filling out the following form and send it
            to us. We’ll contact you promptly.`}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
