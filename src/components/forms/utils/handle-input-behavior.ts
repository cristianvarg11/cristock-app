export const handleOnlyNumbers = (event: KeyboardEvent) => {
  if (!/^-?[0-9.]+(\.[0-9]+)?$/.test(event.key)) {
    event.preventDefault();
  }
};
