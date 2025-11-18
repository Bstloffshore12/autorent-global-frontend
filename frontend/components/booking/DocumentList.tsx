import { FiFileText } from 'react-icons/fi'
import { getTranslations } from 'next-intl/server'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

import {
  type BookingDetailData,
  type BookingDetailDcoumentData,
} from '@/model/UserModel'
import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { classnames } from '@/futils'
import Card from '@/components/common/Card'

interface DocumentListProps {
  className?: string
  documents: BookingDetailData['documents']
  order_id: BookingDetailData['order']['order_id']
  isInvoiceAvailable: BookingDetailData['order']['is_invoice']
}

const DocumentList = async ({
  order_id,
  className,
  documents,
  isInvoiceAvailable,
}: DocumentListProps) => {
  if (!documents) return null

  const t = await getTranslations()

  const documentsList: BookingDetailDcoumentData[] = []

  Object.values(documents).forEach((docs) =>
    docs.forEach((doc) => {
      documentsList.push(doc)
    })
  )

  return (
    <Card className={classnames(className)}>
      <p className="mb-2 flex items-center gap-2 text-lg font-medium text-primary">
        <HiOutlineClipboardDocumentList /> <span>{t('Documents')}</span>
      </p>

      {!!isInvoiceAvailable && (
        <div
          className={classnames(
            'flex items-center justify-between border-dashed py-1'
          )}
        >
          <p className="capitalize">
            {t('Invoice')}
            <span className="lowercase">.pdf</span>
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={routes.user.invoices(order_id)}
          >
            <FiFileText className="size-8 rounded-lg bg-primary-light px-2 py-1 text-primary" />
          </Link>
        </div>
      )}

      {!!documentsList.length &&
        documentsList.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-t border-dashed py-1"
          >
            <p className="capitalize">
              {doc.title}
              <span className="lowercase">.{doc.path.split('.').pop()}</span>
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={routes.bucketUrl + doc.path}
            >
              <FiFileText className="size-8 rounded-lg bg-primary-light px-2 py-1 text-primary" />
            </a>
          </div>
        ))}
    </Card>
  )
}

export default DocumentList
