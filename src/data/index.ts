import { Question } from "@/types";
import { selectBasicsQuestions } from "./select-basics";
import { whereClauseQuestions } from "./where-clause";
import { orderGroupByQuestions } from "./order-group-by";
import { joinQuestions } from "./join";
import { aggregateFunctionsQuestions } from "./aggregate-functions";
import { subqueriesQuestions } from "./subqueries";
import { dmlQuestions } from "./dml";
import { ddlQuestions } from "./ddl";

export const allQuestions: Record<string, Question[]> = {
  "select-basics": selectBasicsQuestions,
  "where-clause": whereClauseQuestions,
  "order-group-by": orderGroupByQuestions,
  join: joinQuestions,
  "aggregate-functions": aggregateFunctionsQuestions,
  subqueries: subqueriesQuestions,
  dml: dmlQuestions,
  ddl: ddlQuestions,
};

export {
  selectBasicsQuestions,
  whereClauseQuestions,
  orderGroupByQuestions,
  joinQuestions,
  aggregateFunctionsQuestions,
  subqueriesQuestions,
  dmlQuestions,
  ddlQuestions,
};
