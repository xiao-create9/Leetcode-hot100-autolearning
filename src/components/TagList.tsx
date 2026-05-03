interface TagListProps {
  tags: string[]
  blurred?: boolean
}

export default function TagList({ tags, blurred = false }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-light dark:bg-accent/10 text-accent dark:text-indigo-300 border border-accent/10 dark:border-accent/20 transition-all duration-300 ${
            blurred ? 'blur-md select-none' : ''
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
