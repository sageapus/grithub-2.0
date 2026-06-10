"use client"

// React is needed for JSX, and useState stores the form's UI state.
import React, { useState } from 'react'
// Component-specific SCSS module used for the form container and submit button styles.
import footer from 'components/navigation/footer.module.scss'
// Next.js Image optimizes the submit icon image.
import Image from 'next/image'
// Server action/helper that sends the email signup data to the backend or external service.
import submitEmailAction from './submitEmailAction'
// Shows a loading indicator inside the submit button while the request is running.
import Loader from 'components/feedback/Loader'
// Arrow icon displayed in the submit button when  the form is not loading.
import chevronRight from '@/public/assets/chevron-right2.svg'

export default function FooterEmailForm() {
  // Tracks which UI state to render: initial form, success message, or error message.
  const [status, setStatus] = useState({ result: 'init' })
  // Tracks whether the form submission is currently in progress.
  const [isLoading, setIsLoading] = useState(false)

  // Handles the newsletter signup form submission.
  const submitForm = async (e) => {
    // Prevents the browser's default full-page form submission.
    e.preventDefault()

    // Guards against a missing form target so the action does not run without form data.
    if (!e.currentTarget) {
      alert('We need your email to subscribe you to our newsletter. Please try again.')
      return
    }

    // Switches the submit button from the arrow icon to the loading spinner.
    setIsLoading(true)

    // Turns the form fields into a plain object for submitEmailAction.
    const formData = Object.fromEntries(new FormData(e.currentTarget))

    // Sends the email signup data, then updates the UI based on the response.
    await submitEmailAction(formData).then((res) => {
      // Shows either the success message or error message returned by the action.
      setStatus({ result: res.result === 'success' ? 'success' : 'error', msg: res.msg })
      // Stops showing the loading spinner after the response comes back.
      setIsLoading(false)
    })
  }

  return (
    // Wraps the form or response message in the footer form styles.
    <div className={footer.formCntr}>
      {
        // Selects which JSX block to render based on status.result.
        {
          // Rendered after a successful newsletter signup.
          success: (
            <div className="d-flex justify-content-start align-items-center align-content-center">
              {/* Visual success mark shown beside the response message. */}
              <strong className="fw-bold fs-1 text-success lh-1 me-2">&check;</strong>
              {/* Message returned by submitEmailAction. */}
              <span className="text-success">{status.msg}</span>
            </div>
          ),

          // Rendered when submitEmailAction reports a failure.
          error: (
            <div className="d-flex justify-content-center align-items-center">
              {/* Visual error mark shown beside the response message. */}
              <strong className="fw-bold fs-1 text-danger lh-1 me-2">&times;</strong>
              {/* Error message returned by submitEmailAction, plus retry guidance. */}
              <span className="text-danger">{status.msg}. Please try again.</span>
            </div>
          ),

          // Default state: renders the email signup form before submission.
          init: (
            <form onSubmit={(e) => submitForm(e)} className="form-floating w-100 position-relative">
              {/* Hidden anti-spam field. Real users should leave it empty; bots may fill it. */}
              <label htmlFor="fieldDB" className={footer.formFieldB}>
                Field
              </label>
              <input
                type="text"
                id="fieldDB"
                name="b_26e45841b4abf188b36813479_e04129a9c8"
                tabIndex="-1"
                className={footer.formFieldB}
                autoComplete="off"
              />

              {/* Bootstrap floating-label wrapper for the email input. */}
              <div className="form-floating">
                {/* Email field sent to the signup action. The name appears to match an external form field ID. */}
                <input
                  type="email"
                  name="fldZtEVbPJXw0mTX4"
                  id="fldZtEVbPJXw0mTX4"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                />
                {/* Label connected to the email input by matching htmlFor and id. */}
                <label htmlFor="fldZtEVbPJXw0mTX4">Your Email</label>
              </div>

              {/* Submit button for the newsletter form. */}
              <button type="submit" className={footer.submitBtn}>
                {/* Show a spinner during submission, otherwise show the arrow icon. */}
                {isLoading ? (
                  <Loader {...{ isLoading }} isDark />
                ) : (
                  <Image src={chevronRight} width={20} height={60} alt="Submit" />
                )}
              </button>
            </form>
          ),
        }[status.result]
      }
    </div>
  )
}
