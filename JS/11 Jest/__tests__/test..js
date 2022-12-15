//! Snapshot

const persona={
    nombre:'Aaron',
    balance:500,
    tipo:'Premium'
}

describe('Test',()=>{
    test('Es Aaron',()=>{
        expect(persona).toMatchSnapshot();
    })
})