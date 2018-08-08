const SLIDES = [{
    position:'',
    uuid:'1234abcd',
    title: "auth0 conf",
    isSelected: true,
    isEditing: true,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`
  },
  { position:'',
    uuid:'564jhg',
    title: "Mithril conf",
    isSelected: true,
    isEditing: false,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`,
  },
  { position:'',
    uuid:'897tr',
    title: "ngSurf",
    isSelected: true,
    isEditing: true,
    text: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
    nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
     quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
      Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
      arcu eget nulla. </p>`,
  },
  { position:'',
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
