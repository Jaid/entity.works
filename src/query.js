import {parse} from "query-string"

const parsed = parse(document.location.search)
export default {
  mode: "user",
  ...parsed,
}