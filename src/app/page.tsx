import Link from "next/link";
import { CATEGORIES } from "@/types";

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400",
  green: "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-400",
  purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-400",
  orange: "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-400",
  red: "bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-400",
  yellow: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-400",
  teal: "bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-400",
  indigo: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400",
};

const textColorMap: Record<string, string> = {
  blue: "text-blue-700",
  green: "text-green-700",
  purple: "text-purple-700",
  orange: "text-orange-700",
  red: "text-red-700",
  yellow: "text-yellow-700",
  teal: "text-teal-700",
  indigo: "text-indigo-700",
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">SQL 穴埋め問題集</h1>
        <p className="text-gray-500 text-lg">
          全8カテゴリ × 各50問｜選択肢から正解を選ぼう
        </p>
        <div className="mt-2 flex justify-center gap-3 text-sm text-gray-400">
          <span>📝 全400問</span>
          <span>·</span>
          <span>🖨️ PDF印刷対応</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/quiz/${cat.id}`}
            className={`block border-2 rounded-xl p-5 transition-all duration-150 cursor-pointer ${colorMap[cat.color]}`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <h2 className={`text-lg font-bold mb-1 ${textColorMap[cat.color]}`}>
              {cat.name}
            </h2>
            <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">50問</span>
              <span className={`text-xs font-bold ${textColorMap[cat.color]}`}>
                挑戦する →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-700 mb-3 text-lg">📖 使い方</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
          <li>カテゴリを選んで問題ページへ進む</li>
          <li>SQLの空欄（___）に入る正しい選択肢をA〜Dから選ぶ</li>
          <li>「採点する」ボタンで正解・不正解と解説を確認する</li>
          <li>「PDF印刷」ボタンで問題用紙をA4で印刷できる</li>
        </ol>
      </div>
    </main>
  );
}
