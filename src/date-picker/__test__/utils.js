import createMockRaf from 'mock-raf'
// import sinon from 'sinon'

export function mockRAf(count = 10){
    let mockRaf = createMockRaf();
    // Stub out your `requestAnimationFrame` method
    global.requestAnimationFrame = mockRaf.raf;
    global.cancelAnimationFrame = ()=>{}
    // sinon.stub(global, 'requestAnimationFrame').callsFake(mockRaf.raf);
    // Take 10 `requestAnimationFrame` steps (your callback will fire 10 times)
    mockRaf.step({ count });
}

export const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => { } } }
