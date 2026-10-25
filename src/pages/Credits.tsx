import { imageCredits } from '../content/credits'
import { usePageMeta } from '../lib/usePageMeta'
import { PageHeader } from '../components/ui/PageHeader'

export default function Credits() {
  usePageMeta('Image credits', 'Attribution and licences for the reference photographs used on the PULSE Hub website.')
  return (
    <>
      <PageHeader
        title="Image credits"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Image credits' }]}
        lede={
          <p>
            Reference photographs on this site come from Wikimedia Commons under the licences below. They were resized
            and converted to WebP, and they do not show PULSE facilities, people or events.
          </p>
        }
      />
      <section aria-label="Credits" className="shell py-12 md:py-16">
        <div className="relative overflow-x-auto rounded-sm border border-line">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Subject</th>
                <th scope="col" className="px-4 py-3 font-medium">Author</th>
                <th scope="col" className="px-4 py-3 font-medium">Licence</th>
                <th scope="col" className="px-4 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {imageCredits.map((c) => (
                <tr key={c.source}>
                  <td className="px-4 py-3 text-ink">{c.subject}</td>
                  <td className="px-4 py-3 text-muted">{c.author}</td>
                  <td className="px-4 py-3">
                    <a href={c.licenseUrl} className="link" target="_blank" rel="noreferrer">
                      {c.license}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a href={c.source} className="link" target="_blank" rel="noreferrer">
                      Wikimedia Commons<span className="sr-only">: {c.subject} (opens in a new tab)</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
