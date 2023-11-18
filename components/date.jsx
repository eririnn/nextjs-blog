import { parseISO, format } from "date-fns";

export default function NewDate() {
  const dateNow =  new Date()
  //console.log(dateNow);
  const date = parseISO(dateNow);
  return <time dateTime={dateNow}>{format(dateNow, "LLLL d, yyyy")}</time>;
}