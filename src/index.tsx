import { connect } from "datocms-plugin-sdk";
import { render } from './utils/render';
import "datocms-react-ui/styles.css";
import App from './components/App/App'
import EditModal from './components/EditModal/EditModal';

connect({
  manualFieldExtensions() {
    return [
      {
        id: "extendedSeo",
        name: "extended seo",
        type: "editor",
        fieldTypes: ["seo"],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    return render(<App ctx={ctx} />);
  },
  renderModal(modalId, ctx) {
    switch (modalId) {
      case 'customModal':
        return render(<EditModal ctx={ctx} />);
    }
  }
});