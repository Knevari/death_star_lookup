export default function(number) {
  return !!Number(number) && Number(number).toLocaleString("pt-BR");
}
