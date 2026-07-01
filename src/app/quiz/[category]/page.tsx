import { notFound } from "next/navigation";
import { CATEGORIES } from "@/types";
import { allQuestions } from "@/data";
import QuizClient from "@/components/QuizClient";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) notFound();

  const questions = allQuestions[categoryId];
  if (!questions) notFound();

  return <QuizClient category={category} questions={questions} />;
}
