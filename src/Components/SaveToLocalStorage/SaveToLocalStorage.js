export const SaveToLocalStorage = (name, value) => {
  if(value === null){
    localStorage.removeItem(name)
  } else {
    localStorage.removeItem(name)
    localStorage.setItem(name, value)
  }
}