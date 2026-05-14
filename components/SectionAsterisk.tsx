// Shared decorative asterisk used in section headers across all pages
export default function SectionAsterisk() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5 text-terracotta flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M8 1V15M1 8H15M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
