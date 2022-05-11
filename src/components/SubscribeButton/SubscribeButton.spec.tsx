import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { SubscribeButton } from '.'

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return { data: null }
    }
  }
})

describe('SubscribeButton component', () => {
  it('renders correctly when user is not authenticated', () => {

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

})