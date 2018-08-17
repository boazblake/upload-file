const m = require('mithril');

const CardContainer = {
  view: ({ children }) => (
    <div id="cards-container" class="hero">
      {children}
    </div>
  )
};

export default CardContainer;
