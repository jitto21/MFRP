import { selectAppState } from "./app.state"

describe('Auth Selectors', () => {
    it('should return app state', () => {
        expect(selectAppState.projector()).toBeUndefined()
    })
})