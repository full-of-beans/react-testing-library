import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import 'jest-axe/extend-expect'
import React from 'react'
import {render} from 'react-testing-library'
import {axe} from 'jest-axe'

const InaccessibleForm = () => {
  return (
    <form>
      <input placeholder="username" name="username" />
    </form>
  )
}

const AccessibleForm = () => {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" name="username" />
    </form>
  )
}

test('inaccessible forms fail axe', async () => {
  const {container} = render(<InaccessibleForm />)
  const results = await axe(container.innerHTML)
  expect(results).not.toHaveNoViolations()
})

test('accessible forms fail axe', async () => {
  const {container} = render(<AccessibleForm />)
  const results = await axe(container.innerHTML)
  expect(results).toHaveNoViolations()
})
