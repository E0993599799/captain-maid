import Link from 'next/link'

function text(node: any): string {
  return typeof node?.text === 'string' ? node.text : ''
}

function children(nodes: any[] | undefined): React.ReactNode {
  return (nodes || []).map((node, index) => <RichNode key={node?.id || index} node={node} />)
}

function RichNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null
  if (node.type === 'text') {
    let value: React.ReactNode = text(node)
    if (node.format & 1) value = <strong>{value}</strong>
    if (node.format & 2) value = <em>{value}</em>
    if (node.format & 8) value = <u>{value}</u>
    if (node.format & 16) value = <code>{value}</code>
    return value
  }
  const content = children(node.children)
  switch (node.type) {
    case 'heading': return <h2 className="text-3xl font-serif font-bold mt-xl mb-md text-captain-text">{content}</h2>
    case 'paragraph': return <p className="mb-md">{content}</p>
    case 'list': return node.tag === 'ol' ? <ol className="list-decimal list-inside mb-md">{content}</ol> : <ul className="list-disc list-inside mb-md">{content}</ul>
    case 'listitem': return <li>{content}</li>
    case 'quote': return <blockquote className="border-l-4 border-captain-yellow pl-md italic mb-md">{content}</blockquote>
    case 'link': return <Link href={typeof node.fields?.url === 'string' ? node.fields.url : '#'}>{content}</Link>
    case 'upload': return null
    default: return <div>{content}</div>
  }
}

export function CmsRichText({ value }: { value: unknown }) {
  const root = (value as any)?.root
  if (!root?.children) return null
  return <div className="text-lg text-captain-neutral leading-relaxed">{children(root.children)}</div>
}
