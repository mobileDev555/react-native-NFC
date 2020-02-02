
export const CHANGE_REGISTOR = 'CHANGE_REGISTOR'

export function changeResistor(registore) {
  return{
    type: CHANGE_REGISTOR,
    registore: registore
  }
}