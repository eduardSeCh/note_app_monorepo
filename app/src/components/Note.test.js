/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const view = render(<Note note={note} />)
    // view.getByText('This is a test')
    // view.getByText('make not important')
    expect(view.container).toHaveTextContent(note.content)

    // see thath view render
    // eslint-disable-next-line testing-library/no-debugging-utils
    // view.debug()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const li = view.container.querySelector('li')
    console.log(prettyDOM(li))
})

test('clicking the button calls event handle once', () => {
    const note = {
        content: 'This is a test',
        important: true
    }  

    const mockHandler = jest.fn()

    const view = render(<Note note={note} toggleImportance={ mockHandler }/>)
    const button = view.getByText('make not important')
    fireEvent.click(button) 
    fireEvent.click(button) // 2 clicks
    expect(mockHandler).toHaveBeenCalledTimes(2) // 2 clicks
    // expect(mockHandler.mock.calls).toHaveLength(2)
})