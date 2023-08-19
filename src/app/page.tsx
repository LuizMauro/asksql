"use client";

import { useCompletion } from "ai/react";
import { useState } from "react";
import Logo from "../assets/LogoComponentSVG";
import { Trash2, Stars } from "lucide-react";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";

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
          Cole seu código SQL aqui:
        </label>

        <div className="h-40 overflow-y-scroll overflow-x-hidden rounded-md focus-within:ring-2 focus-within:ring-lime-200">
          <Editor
            name="schema"
            textareaId="schema"
            value={schema}
            onValueChange={(code) => setSchema(code)}
            highlight={(code) => highlight(code, languages.sql, "sql")}
            padding={16}
            textareaClassName="outline-none"
            className="my-4 font-mono min-h-full bg-blueberry-600 border border-blueberry-300 "
          />
        </div>

        <label htmlFor="question" className="text-lg font-light mt-2">
          Faça uma pergunta sobre o código
        </label>
        <textarea
          className="my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-200"
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2"
        >
          <Stars className="h-6 w-6 " /> Perguntar à inteligencia artificial
        </button>
      </form>

      <div className="mt-6">
        <span className="text-lg font-light text-foam">Resposta</span>

        <textarea
          readOnly
          className="my-4 bg-blueberry-600 h-40 text-foam w-full font-mono border border-blueberry-300 rounded-md px-4 py-3 outline-none"
          value={result}
        />
      </div>
    </div>
  );
}
