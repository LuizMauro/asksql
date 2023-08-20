"use client";

import { useCompletion } from "ai/react";
import { useState } from "react";
import Logo from "../assets/LogoComponentSVG";
import { Trash2, Stars } from "lucide-react";
import Editor from "react-simple-code-editor";

import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  const [schema, setSchema] = useState("");

  const { completion, handleSubmit, input, handleInputChange, error } =
    useCompletion({
      api: "/api/generate-sql",
      body: {
        schema,
      },
    });

  const result = completion;

  return (
    <div className="max-w-[430px] mx-auto rounded-sm shadow-lg px-4 pt-12 pb-4">
      <header className="flex items-center justify-between">
        <Logo />
        <button type="button">
          <Trash2 className="h-8 w-8 text-snow" strokeWidth={0.8} />
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="py-8 w-full flex flex-col text-foam"
      >
        <label htmlFor="schema" className="text-lg font-light">
          Cole sua schema SQL aqui:
        </label>

        <div style={{ height: 200, overflow: "auto", margin: 10 }}>
          <CodeEditor
            value={schema}
            language="sql"
            placeholder="Entre com a schema de seu banco SQL aqui"
            onChange={(evn) => setSchema(evn.target.value)}
            className="font-mono min-h-full bg-blueberry-600 border border-blueberry-300 overflow-auto rounded-md"
          />
        </div>

        <div className="w-full mt-5 mb-5">
          <label htmlFor="question" className="text-lg font-light mt-2">
            Dê instruções de como quer a query
          </label>
          <textarea
            className="w-full bg-blueberry-600 border border-blueberry-300 mt-2 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-200"
            name="question"
            id="question"
            value={input}
            onChange={handleInputChange}
            placeholder="Exemplo: liste usuários com no minimo 5 posts"
          />

          <button
            type="submit"
            className="mt-4 w-full text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-4"
          >
            Gerar Query
            <Stars className="h-6 w-6 " />
          </button>
        </div>
      </form>

      {result.length > 0 && (
        <div className="mt-6">
          <span className="text-lg font-light text-foam">Resposta</span>

          <div style={{ height: 200, overflow: "auto" }}>
            <CodeEditor
              readOnly
              value={result}
              language="js"
              className="min-h-full bg-blueberry-600  text-foam w-full font-mono border border-blueberry-300 rounded-md px-4 py-3 outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
