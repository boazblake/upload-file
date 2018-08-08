const SLIDES = [{
    position:0,
    uuid:'1234abcd',
    title: "auth0 conf",
    isSelected: false,
    isEditing: false,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`
  },
  { position:1,
    uuid:'564jhg',
    title: "Mithril conf",
    isSelected: false,
    isEditing: false,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`,
  },
  { position:2,
    uuid:'897tr',
    title: "ngSurf",
    isSelected: false,
    isEditing: false,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`,
  },
  { position:3,
    uuid:'hjk876f',
    title: "MySQL Conf",
    isSelected: false,
    isEditing: false,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`,
  }
];

exports.getMockData = () => SLIDES;

exports.setMockData = c => SLIDES.push(c)
