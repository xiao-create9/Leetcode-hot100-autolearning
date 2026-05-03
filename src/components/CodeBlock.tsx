import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-go'
import 'prismjs/themes/prism-tomorrow.css'

interface CodeBlockProps {
  code: string
  language: 'python' | 'java' | 'cpp' | 'go'
}

const langMap = {
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  go: 'go',
} as const

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e2030] border-b border-gray-700/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider ml-1">{language}</span>
      </div>
      <pre className="!m-0 !rounded-t-none !bg-[#1a1b2e] !p-4">
        <code ref={codeRef} className={`language-${langMap[language]} !text-[13px] !leading-relaxed`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
