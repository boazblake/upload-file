const m = require('mithril');

const CardContainer = {
  view: ({ children }) => (
    <div id="cards-container" class="section hero">
      {children}
    </div>
  )
};

export default CardContainer;
