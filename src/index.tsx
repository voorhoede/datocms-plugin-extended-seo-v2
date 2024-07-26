import { connect } from 'datocms-plugin-sdk'

import ConfigScreen from './entrypoints/ConfigScreen/ConfigScreen'
import EditModal from './entrypoints/SeoSettings/SeoSettings'
import FieldExtension from './entrypoints/FieldExtension/FieldExtension'

import { render } from './utils/render'

import './styles/index.css'

connect({
  manualFieldExtensions() {
    return [
      {
        id: 'extendedSeo',
        name: 'extended seo',
        type: 'editor',
        fieldTypes: ['seo'],
      },
    ]
  },
  renderFieldExtension(_, ctx) {
    return render(<FieldExtension ctx={ctx} />)
  },
  renderModal(modalId, ctx) {
    switch (modalId) {
      case 'seoSettings':
        return render(<EditModal ctx={ctx} />)
    }
  },
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
})
