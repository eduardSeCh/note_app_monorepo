import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Togglable from './Togglable'
import i18n from '../i18n/index'
describe('<Togglable />', ()=> {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const buttonLabel = 'show'
    let component 
    beforeEach(()=> {
        // eslint-disable-next-line testing-library/no-render-in-setup
        component = render(
            <Togglable buttonLabel={buttonLabel}>
                <div>testDivContent</div>
            </Togglable>
        )
    })

    test('renders its children but its not visible', () => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const el = component.getByText('testDivContent')
        // eslint-disable-next-line testing-library/no-node-access
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const el = component.getByText('testDivContent')
        // eslint-disable-next-line testing-library/no-node-access
        expect(el.parentNode).not.toHaveStyle('display: none')
    })

    test('togled content can be closed', () => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const el = component.getByText('testDivContent')
        // eslint-disable-next-line testing-library/no-node-access
        expect(el.parentNode).not.toHaveStyle('display: none')
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const cancelButton = component.getByText(i18n.TOGGABLE.CANCEL_BUTTON)
        fireEvent.click(cancelButton)
        // eslint-disable-next-line testing-library/no-node-access
        expect(el.parentNode).toHaveStyle('display: none')
    })
})