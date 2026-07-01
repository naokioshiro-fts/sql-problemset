export interface Question {
  id: number;
  question: string;
  sql: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "select-basics",
    name: "SELECT基礎",
    description: "SELECT文の基本的な使い方",
    color: "blue",
    icon: "🔍",
  },
  {
    id: "where-clause",
    name: "WHERE句",
    description: "条件を指定してデータを絞り込む",
    color: "green",
    icon: "🎯",
  },
  {
    id: "order-group-by",
    name: "ORDER BY / GROUP BY",
    description: "並び替えとグループ化",
    color: "purple",
    icon: "📊",
  },
  {
    id: "join",
    name: "JOIN",
    description: "テーブルを結合する",
    color: "orange",
    icon: "🔗",
  },
  {
    id: "aggregate-functions",
    name: "集計関数",
    description: "COUNT, SUM, AVG, MAX, MIN",
    color: "red",
    icon: "🧮",
  },
  {
    id: "subqueries",
    name: "サブクエリ",
    description: "クエリの中のクエリ",
    color: "yellow",
    icon: "🪆",
  },
  {
    id: "dml",
    name: "DML",
    description: "INSERT, UPDATE, DELETE",
    color: "teal",
    icon: "✏️",
  },
  {
    id: "ddl",
    name: "DDL",
    description: "CREATE, ALTER, DROP",
    color: "indigo",
    icon: "🏗️",
  },
];
