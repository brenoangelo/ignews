import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { SignInButton } from '.'

jest.mock('next-auth/react')

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: false })

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession as jest.Mock)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires'
      },
      status: 'authenticated'
    })

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})