import { TemplateEditor } from '../../components/library/TemplateEditor'
import { useParams } from '@tanstack/react-router'

export const LibraryTemplatePage = () => {
	const { templateId } = useParams({ from: '/library/templates/$templateId' })
	return (
		<div className="pb-16 p-4">
			<TemplateEditor templateId={templateId} />
		</div>
	)
}