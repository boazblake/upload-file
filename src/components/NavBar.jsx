const m = require('mithril');

import NavButton from './ui/NavButton.jsx';
import { createAction } from './NavBarModel.js'


const createNavBarComponent = (navigator, update) => {
  const payload = {}
  const action = createAction(navigator)

  const load = payload => ({ attrs: { model } }) => {
    const page = model.pageId
    switch (page) {
      case "LoginView":
        payload = {}
        action(payload)
        break;
      case "presentations":
        payload = {
          params: { name: model.user.name },
          dest: "presentations"
        }
        action(payload)
        break;
      case "slidesSelection":
        payload = {
          params: {
            id: model.currentPresentationId,
            name: model.user.name
          },
          dest: "slidesSelection",
        }
        action(payload)
        break;
      case "SlideShow":
        payload = {
          params: {
            id: model.currentPresentationId,
            name: model.user.name
          },
          dest: "SlideShow",
        }
        action(payload)
        break;
      default:
        payload = {}
        action(payload)
    }
  }

  return {
    oncreate: load(payload),
    view: ({ attrs: { model } }) => {
      return (
        <div class="nav-bar">
          <NavButton action={action} icon={<i class="fa fa-add" />} />
          <NavButton action={action} icon={<i class="fa fa-sitemap" />} />
          <NavButton action={action} icon={<i class="fab fa-slideshare" />} />
        </div>
      )
    }
  }
};

export default createNavBarComponent;
